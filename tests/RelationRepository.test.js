const { Entity } = require("../src/contracts/Entity");
const { Relation } = require("../src/contracts/Relation");
const { KnowledgeFragment } = require("../src/contracts/KnowledgeFragment");
const { RelationRepository } = require("../src/repositories/RelationRepository");

const repository = new RelationRepository();

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

const fragment1 = new KnowledgeFragment({
  id: "FRAG-001",
  documentId: "DOC-001",
  text: "Ali Yata est secrétaire général du PPS."
});

const fragment2 = new KnowledgeFragment({
  id: "FRAG-002",
  documentId: "DOC-001",
  text: "Ali Yata a dirigé le PPS."
});

repository.add(relation, fragment1);
repository.add(relation, fragment2);

const key = repository.getKey(relation);
const record = repository.get(key);

console.log(record);

if (!record) {
  throw new Error("RelationRecord introuvable.");
}

if (record.occurrences !== 2) {
  throw new Error("Occurrences incorrectes.");
}

if (record.fragments.size !== 2) {
  throw new Error("Fragments incorrects.");
}

if (record.documents.size !== 1) {
  throw new Error("Documents incorrects.");
}

console.log("✅ KB-019 validé");