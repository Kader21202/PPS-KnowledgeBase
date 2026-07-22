const { TextLoader } = require("../src/loaders/TextLoader");
const { SourceParser } = require("../src/parsers/SourceParser");

const loader = new TextLoader();
const parser = new SourceParser();

const file = loader.load(
  "./knowledge/reference/01_presentation_du_parti/01_HISTOIRE_GENERALE_DU_PPS.txt"
);

const sources = parser.parse(file.content);

console.log(sources);

if (sources.length !== 1) {
  throw new Error("Une seule source est attendue.");
}

const source = sources[0];

if (!source.title) {
  throw new Error("Titre de la source non détecté.");
}

if (!source.url) {
  throw new Error("URL_SOURCE non détectée.");
}

console.log("Titre :", source.title);
console.log("URL :", source.url);

console.log("✅ SourceParser test passed");