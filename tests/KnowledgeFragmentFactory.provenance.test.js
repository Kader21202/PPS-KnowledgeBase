const path = require("path");
const { RepositoryService } = require("../src/services/RepositoryService");
const { KnowledgeFragmentFactory } = require("../src/factories/KnowledgeFragmentFactory");

const service = new RepositoryService();
const factory = new KnowledgeFragmentFactory();

const knowledgeRoot = path.resolve(__dirname, "../knowledge");

const documents = service.loadKnowledgeBase(knowledgeRoot);

if (documents.length === 0) {
  throw new Error("Aucun document chargé.");
}

const document = documents[0];
const fragments = factory.createFromDocument(document);
const fragment = fragments[0];

console.log("DOCUMENT PATH :", document.path);
console.log("FRAGMENT METADATA :", fragment.metadata);

if (!document.path) {
  throw new Error("Le document source ne possède pas de path.");
}

if (fragment.metadata?.sourcePath !== document.path) {
  throw new Error(
    "La provenance documentaire est perdue entre Document et KnowledgeFragment."
  );
}

console.log("✅ KnowledgeFragment conserve la provenance documentaire");
