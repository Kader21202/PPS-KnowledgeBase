const { TextLoader } = require("../src/loaders/TextLoader");
const { MetadataParser } = require("../src/parsers/MetadataParser");

const loader = new TextLoader();
const parser = new MetadataParser();

const file = loader.load(
  "./knowledge/reference/01_presentation_du_parti/01_HISTOIRE_GENERALE_DU_PPS.txt"
);

const metadata = parser.parse(file.content);

console.log(metadata);

if (!metadata.category || !metadata.type) {
  throw new Error("Métadonnées principales non détectées.");
}

console.log("✅ MetadataParser test passed");