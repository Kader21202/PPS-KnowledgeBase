const { TextLoader } = require("../src/loaders/TextLoader");
const { TitleParser } = require("../src/parsers/TitleParser");

const loader = new TextLoader();
const parser = new TitleParser();

const file = loader.load(
  "./knowledge/reference/01_presentation_du_parti/01_HISTOIRE_GENERALE_DU_PPS.txt"
);

const title = parser.parse(file.content);

console.log("Titre :", title);

if (!title) {
  throw new Error("Titre non détecté.");
}

console.log("✅ TitleParser test passed");