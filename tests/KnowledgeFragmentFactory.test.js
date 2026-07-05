const { RepositoryService } = require("../src/services/RepositoryService");
const { KnowledgeFragmentFactory } = require("../src/factories/KnowledgeFragmentFactory");

const service = new RepositoryService();
const factory = new KnowledgeFragmentFactory();

const document = service.load(
  "./knowledge/reference/01_presentation_du_parti/01_HISTOIRE_GENERALE_DU_PPS.txt"
);

const fragments = factory.createFromDocument(document);

console.log("Fragments créés :", fragments.length);
console.log(fragments[0]);

if (fragments.length < 1) {
  throw new Error("Aucun fragment créé.");
}

console.log("✅ KB-007 validé");