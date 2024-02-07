import fs from "fs/promises";
import path from "path";
import cors from "cors";
import express from "express";

export const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/healthcheck", async (req, res) => {
  res.status(200).json({message: "ok"});
});

app.get("/api/faqs", async (req, res) => {
  const faqsPath = path.resolve(
    __dirname,
    "..",
    "..",
    "data",
    process.env.FAQS_FILE_NAME as string,
  );
  const faqs = await fs.readFile(faqsPath, "utf-8");
  res.status(200).json(JSON.parse(faqs));
});

app.get("/api/pages/:pageTitle", async (req, res) => {
  const pageTitle = req.params.pageTitle;
  const response = await fetch(
    `https://scrapbox.io/api/pages/${process.env.SCRAPBOX_PROJECT_NAME}/${pageTitle}`,
  );
  if (!response.ok) {
    res.status(404).json({message: "not found"});
    return;
  }
  const page = await response.json();

  res.status(200).json(page);
});
