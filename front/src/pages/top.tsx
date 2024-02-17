import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import wanko from "@/assets/wanko.svg";
import prompt from "@/assets/prompt.svg";

import {convertToHiragana} from "./hiragana";

type FAQ = {
  question: string;
  pageTitle: string;
};

// uniqueFilteredFaqs pagetitleの異なるものをlist化
function uniquePageTitle(faqs: FAQ[]): FAQ[] {
  const uniqueFaqs: FAQ[] = [];
  for (const faq of faqs) {
    if (!uniqueFaqs.some((uFaq) => uFaq.pageTitle === faq.pageTitle)) {
      uniqueFaqs.push(faq);
    }
  }
  return uniqueFaqs;
}

export function TopPage(): JSX.Element {
  const [width, setWidth] = useState<Number>(0);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [defaultFaqs, setDefaultFaqs] = useState<FAQ[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/faqs");
      const faqs = await res.json();
      localStorage.setItem("faqs", JSON.stringify(faqs));
      setDefaultFaqs(uniquePageTitle(faqs).slice(0, 5));
      setIsLoading(false);
    })();
  }, []);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    setInput(e.target.value);
    if (e.target.value === "") {
      setFaqs([]);
      return;
    }

    const faqs = JSON.parse(localStorage.getItem("faqs")!);
    const uniqueFaqs = uniquePageTitle(faqs);
    
    const hiraganaQuestions = await Promise.all(faqs.map((faq: FAQ) => 
      convertToHiragana(faq.question.toLowerCase())));
    const hiraganaFilterValue = await convertToHiragana(e.target.value.toLowerCase());
    const filteredFaqs = faqs.filter((_: string, index: int) =>
      hiraganaQuestions[index].includes(hiraganaFilterValue)
    );
    const uniqueFilteredFaqs = uniquePageTitle(filteredFaqs);
    
    setFaqs(uniqueFilteredFaqs);
    setWidth(Math.round(100*(1-(uniqueFilteredFaqs.length-1)/(uniqueFaqs.length-1))));
    console.log(faqs, filteredFaqs);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="flex flex-col">
        <div className="flex justify-center">
          <div className="relative w-96">
            <img src={wanko} alt="wanko" />
            <img
              src={prompt}
              alt="prompt"
              className="absolute bottom-2 left-[4rem] md:left-[6rem]"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Enter the keyword"
            data-test="search-input"
            className="w-full sm:w-[36rem] h-12 px-4 py-3 shadow outline-0"
          ></input>
        </div>
      </div>
      <div className="mt-6 px-4 py-6 bg-white h-[calc(100%-12rem)] overflow-scroll shadow">
        {input === "" ? (
          <>
            <span className="text-[#2B546A] text-base">
              Frequently Asked Questions
            </span>
            <ul className="pt-4">
              {defaultFaqs.map(faq => (
                <li
                  key={faq.question}
                  className="pl-2 py-2 text-lg text-[#2B546A] list-inside list-square marker:text-[#57D5C1] hover:bg-[#F6F6F7] rounded-md"
                >
                  <Link to={`/pages/${faq.pageTitle}`}>{faq.question}</Link>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <span className="text-[#2B546A] text-base">{`${faqs.length} questions matched`}</span>
            <ul className="pt-4">
              {faqs.map(faq => (
                <li
                  key={faq.question}
                  className="pl-2 py-2 text-lg text-[#2B546A] list-inside list-square marker:text-[#57D5C1] hover:bg-[#F6F6F7] rounded-md"
                >
                  <Link
                    to={`/pages/${faq.pageTitle}`}
                    data-test="question-title"
                  >
                    {faq.question}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      <div className="bg-white shadow-lg shadow-slate-200 w-full ">
        <div className="flex" style={{alignItems: "center", justifyContent: "space-evenly"}}>
          <div className="w-full bg-slate-100 h-1 m-2 md:w-5/6">
          <div className="bg-teal-400 h-1 rounded" style={{width: `${width}%`}}>{}</div>
          </div>
          <div className="p-1 bg-teal-50 rounded-lg text-xs text-teal-400 font-medium text-center">{`${width}%`}</div>
        </div>
      </div>
    </>
  );
}
