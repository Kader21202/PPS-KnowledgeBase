const { Entity } = require("../src/contracts/Entity");
const { KnowledgeFragment } = require("../src/contracts/KnowledgeFragment");
const { EntityRepository } = require("../src/repositories/EntityRepository");

const repository = new EntityRepository();

const entity = new Entity({
  id: "ENTITY-ALI-YATA",
  name: "Ali Yata",
  type: "Person"
});

const fragment1 = new KnowledgeFragment({
  id: "FRAG-001",
  documentId: "DOC-001",
  text: "Ali Yata est secrétaire général."
});

const fragment2 = new KnowledgeFragment({
  id: "FRAG-002",
  documentId: "DOC-001",
  text: "Ali Yata dirige le PPS."
});

repository.add(entity, fragment1);
repository.add(entity, fragment2);

const record = repository.get(entity.id);

console.log(record);

if (!record) {
  throw new Error("Record introuvable.");
}

if (record.occurrences !== 2) {
  throw new Error("Nombre d'occurrences incorrect.");
}

if (record.fragments.size !== 2) {
  throw new Error("Fragments incorrects.");
}

if (record.documents.size !== 1) {
  throw new Error("Documents incorrects.");
}

console.log("✅ KB-015 validé");