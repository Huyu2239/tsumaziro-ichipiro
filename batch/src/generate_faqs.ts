import fs from "fs/promises";
import path from "path";

type Project = {
  projectName: string;
  pages: Page[];
};
type Page = {
  title: string;
  lines: Array<{
    text: string;
  }>;
};
type FAQ = {
  question: string;
  pageTitle: string;
};

const QUESTION_TEXT_PREFIX = "? ";
const DATA_DIR_PATH = path.resolve(__dirname, "..", "..", "data");
const FAQS_FILE_PATH = path.resolve(
  DATA_DIR_PATH,
  process.env.FAQS_FILE_NAME as string,
);

/**
 * Generate FAQs data.
 */
const main = async (): Promise<void> => {
  const projectName = process.env.SCRAPBOX_PROJECT_NAME as string;
  const titles = await getPageTitles(projectName);
  const faqs: FAQ[] = [];
  // do not run in parallel to avoid overloading the Scrapbox API.
  for (const title of titles) {
    faqs.push(...(await convertPageToFaqs(projectName, title)));
  }
  await storageFaqs(faqs);
  console.log("generate faqs successfully!");
};

/**
 * Returns the page titles of the specified project.
 * @param projectName
 * @return page titles
 */
const getPageTitles = async (projectName: string): Promise<string[]> => {
  const res = await fetch(`https://scrapbox.io/api/pages/${projectName}`);
  const project = (await res.json()) as Project;
  const pages = project.pages;
  return pages.map(page => page.title);
};

/**
 * Convert from text contained on a specific page to FAQs
 * @param projectName
 * @param pageTitle
 * @return faqs
 */
const convertPageToFaqs = async (
  projectName: string,
  pageTitle: string,
): Promise<FAQ[]> => {
  const res = await fetch(
    `https://scrapbox.io/api/pages/${projectName}/${pageTitle}`,
  );
  const page = (await res.json()) as Page;
  const faqs = page.lines
    // exclude first line because it is page title.
    .slice(1)
    // exclude lines that are not the target of questions.
    .filter(line => line.text.trim().startsWith(QUESTION_TEXT_PREFIX))
    // remove prefix of question text.
    .map(line => line.text.replace(QUESTION_TEXT_PREFIX, ""))
    // convert to FAQ.
    .map(question => {
      return {question, pageTitle};
    });
  return faqs;
};

/**
 * Store FAQs in a file.
 * @param faqs
 */
const storageFaqs = async (faqs: FAQ[]): Promise<void> => {
  await fs.mkdir(DATA_DIR_PATH, {recursive: true});
  await fs.writeFile(FAQS_FILE_PATH, JSON.stringify(faqs));
};

main();
