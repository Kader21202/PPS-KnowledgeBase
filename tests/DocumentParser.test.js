const { TextLoader } = require("../src/loaders/TextLoader");
const { DocumentParser } = require("../src/parsers/DocumentParser");

const loader = new TextLoader();
const parser = new DocumentParser();

const file = loader.load(
  "./knowledge/reference/01_presentation_du_parti/01_HISTOIRE_GENERALE_DU_PPS.txt"
);

const parsed = parser.parse(file.content);

console.log(parsed);

if (!parsed.title || !parsed.metadata.category || !parsed.sources.length || !parsed.sections.length) {
  throw new Error("Parsing incomplet.");
}

console.log("✅ KB-005 validé");