const { Entity } = require("../src/contracts/Entity");
const { KnowledgeFragment } = require("../src/contracts/KnowledgeFragment");
const { RelationVocabulary } = require("../src/vocabularies/RelationVocabulary");
const { RelationExtractor } = require("../src/extractors/RelationExtractor");

const vocabulary = new RelationVocabulary();
const extractor = new RelationExtractor({ vocabulary });

const aliYata = new Entity({
  id: "ENTITY-ALI-YATA",
  name: "Ali Yata",
  type: "Person"
});

const pps = new Entity({
  id: "ENTITY-PPS",
  name: "PPS",
  type: "Organization"
});

const fragment = new KnowledgeFragment({
  id: "FRAG-001",
  documentId: "DOC-001",
  sectionTitle: "Dirigeants historiques",
  text: "Ali Yata est secrétaire général du PPS de 1974 à 1997."
});

const relations = extractor.extract({
  fragment,
  entities: [aliYata, pps]
});

console.log(relations);

if (relations.length !== 1) {
  throw new Error("Relation non détectée.");
}

if (relations[0].type !== "secretary_general_of") {
  throw new Error("Mauvais type de relation.");
}

console.log("✅ KB-018 validé");