const { Entity } = require("../src/contracts/Entity");
const { Relation } = require("../src/contracts/Relation");
const { KnowledgeFragment } = require("../src/contracts/KnowledgeFragment");
const { KnowledgeGraph } = require("../src/graph/KnowledgeGraph");
const { EvidenceBuilder } = require("../src/evidence/EvidenceBuilder");

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

const graph = new KnowledgeGraph({
  entities: [aliYata, pps],
  relations: [relation]
});

const fragment = new KnowledgeFragment({
  id: "FRAG-001",
  documentId: "DOC-001",
  text: "Ali Yata est secrétaire général du PPS."
});

const builder = new EvidenceBuilder();

const evidence = builder.build({
  question: "Qui est Ali Yata ?",
  graph,
  fragments: [fragment]
});

console.log(evidence);

if (evidence.entityCount() !== 2) {
  throw new Error("Evidence doit contenir 2 entités.");
}

if (evidence.relationCount() !== 1) {
  throw new Error("Evidence doit contenir 1 relation.");
}

if (evidence.fragmentCount() !== 1) {
  throw new Error("Evidence doit contenir 1 fragment.");
}

if (evidence.documentCount() !== 1) {
  throw new Error("Evidence doit contenir 1 document.");
}

console.log("✅ KB-022 validé");