const { TextLoader } = require("../src/loaders/TextLoader");
const { SectionParser } = require("../src/parsers/SectionParser");

const loader = new TextLoader();
const parser = new SectionParser();

const file = loader.load(
  "./knowledge/reference/01_presentation_du_parti/01_HISTOIRE_GENERALE_DU_PPS.txt"
);

const sections = parser.parse(file.content);

console.log("Sections :", sections.length);
console.log(sections.map(s => s.title));

if (sections.length < 5) {
  throw new Error("Sections insuffisantes.");
}

console.log("✅ SectionParser test passed");