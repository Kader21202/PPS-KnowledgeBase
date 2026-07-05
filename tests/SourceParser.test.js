const { TextLoader } = require("../src/loaders/TextLoader");
const { SourceParser } = require("../src/parsers/SourceParser");

const loader = new TextLoader();
const parser = new SourceParser();

const file = loader.load(
  "./knowledge/reference/01_presentation_du_parti/01_HISTOIRE_GENERALE_DU_PPS.txt"
);

const sources = parser.parse(file.content);

console.log(sources);

if (!sources.length || !sources[0].title) {
  throw new Error("Source non détectée.");
}

console.log("✅ SourceParser test passed");