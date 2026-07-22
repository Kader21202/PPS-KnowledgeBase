const {
  TextLoader
} = require("../src/loaders/TextLoader");

const {
  SectionParser
} = require("../src/parsers/SectionParser");

const loader = new TextLoader();
const parser = new SectionParser();

const file = loader.load(
  "./knowledge/reference/01_presentation_du_parti/01_HISTOIRE_GENERALE_DU_PPS.txt"
);

const sections = parser.parse(file.content);

console.log("Sections :", sections.length);
console.log(sections.map(section => section.title));

if (sections.length !== 10) {
  throw new Error(
    `Nombre de sections incorrect : ${sections.length}. Attendu : 10.`
  );
}

const lastSection = sections[sections.length - 1];

if (!lastSection) {
  throw new Error(
    "La dernière section est introuvable."
  );
}

if (
  lastSection.content.includes(
    "METADONNEES DOCUMENT"
  )
) {
  throw new Error(
    "La dernière section contient les métadonnées documentaires."
  );
}

if (
  lastSection.content.includes(
    "SOURCES ET REFERENCES"
  )
) {
  throw new Error(
    "La dernière section contient le bloc des sources."
  );
}

if (
  lastSection.content.includes(
    "URL_SOURCE"
  )
) {
  throw new Error(
    "La dernière section contient une donnée technique de source."
  );
}

console.log(
  "Dernière section :",
  lastSection.title
);

console.log(
  "✅ SectionParser test passed"
);