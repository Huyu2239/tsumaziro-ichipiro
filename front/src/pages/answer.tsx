import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";

type Page = {
  lines: Array<{id: string; text: string}>;
};

export function AnswerPage(): JSX.Element {
  const {pageTitle} = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [lines, setLines] = useState<Array<{id: string; text: string}>>([]);
  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/pages/${pageTitle}`);
      const page = (await res.json()) as Page;
      const lines = page.lines
        // exclude the first line because it's the page title.
        .slice(1)
        // exclude lines that start with "? " because they are texts for questions.
        .filter(line => !line.text.startsWith("? "));
      setLines(lines);
      setIsLoading(false);
    })();
  }, [pageTitle]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="bg-white lg:max-w-[760px] px-8 py-6 shadow">
        <h1
          className="border-l-4 border-[#30C8D6] pl-2 text-3xl text-[#2B546A]"
          data-test="answer-title"
        >
          {pageTitle}
        </h1>
        <div className="mt-4">
          {lines.map(line => (
            <div key={line.id} className="text-lg text-[#2B546A] leading-9">
              {line.text}
            </div>
          ))}
        </div>
      </div>
      <div className="lg:max-w-[760px] mt-8 md:mt-14 flex justify-center">
        <button className="px-10 py-5 bg-[#57D5C1]">
          <Link to="/" className="text-white">
            &lt; Return to Top Page
          </Link>
        </button>
      </div>
    </>
  );
}
