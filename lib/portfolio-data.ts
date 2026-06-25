import fs from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data", "portfolio.json");

export function readPortfolioData() {
  const raw = fs.readFileSync(DATA_PATH, "utf-8");
  return JSON.parse(raw);
}

export function writePortfolioData(data: Record<string, unknown>) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export function updateSection(section: string, value: unknown) {
  const data = readPortfolioData();
  data[section] = value;
  writePortfolioData(data);
  return data;
}
