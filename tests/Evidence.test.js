const { Entity } = require("../src/contracts/Entity");
const { Relation } = require("../src/contracts/Relation");
const { KnowledgeFragment } = require("../src/contracts/KnowledgeFragment");
const { Evidence } = require("../src/evidence/Evidence");

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

const relation = new Relation({
  id: "REL-001",
  source: aliYata,
  target: pps,
  type: "secretary_general_of"
});

const fragment = new KnowledgeFragment({
  id: "FRAG-001",
  documentId: "DOC-001",
  text: "Ali Yata est secrétaire général du PPS."
});

const evidence = new Evidence({
  question: "Qui est Ali Yata ?",
  entities: [aliYata, pps],
  relations: [relation],
  fragments: [fragment],
  documents: ["DOC-001"]
});

console.log(evidence);

if (evidence.entityCount() !== 2) {
  throw new Error("Nombre d'entités incorrect.");
}

if (evidence.relationCount() !== 1) {
  throw new Error("Nombre de relations incorrect.");
}

if (evidence.fragmentCount() !== 1) {
  throw new Error("Nombre de fragments incorrect.");
}

console.log("✅ KB-021 validé");