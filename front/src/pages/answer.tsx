import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import '../answer.css';
import { convertToNinja } from "./convertToNinja";

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
      const page: Page = await res.json();

      // 処理を同期的に行うため、全ての行の変換をPromise.allを使用して待機
      const processedLinesPromises = page.lines
        .slice(1) // exclude the first line because it's the page title.
        .filter(line => !line.text.startsWith("? ")) // exclude lines that start with "? " because they are texts for questions.
        .map(line => convertToNinja(line.text).then(processedText => ({ id: line.id, text: processedText })));

      const processedLines = await Promise.all(processedLinesPromises);

      setLines(processedLines);
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