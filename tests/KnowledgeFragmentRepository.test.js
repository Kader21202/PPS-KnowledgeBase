const { RepositoryService } = require("../src/services/RepositoryService");
const { KnowledgeFragmentFactory } = require("../src/factories/KnowledgeFragmentFactory");
const { KnowledgeFragmentRepository } = require("../src/repositories/KnowledgeFragmentRepository");

const service = new RepositoryService();
const factory = new KnowledgeFragmentFactory();
const repository = new KnowledgeFragmentRepository();

const document = service.load(
  "./knowledge/reference/01_presentation_du_parti/01_HISTOIRE_GENERALE_DU_PPS.txt"
);

const fragments = factory.createFromDocument(document);

repository.addMany(fragments);

console.log("Fragments créés :", fragments.length);
console.log("Fragments stockés :", repository.count());
console.log("Premier fragment :", repository.getById(fragments[0].id));

if (repository.count() !== fragments.length) {
  throw new Error("Tous les fragments n'ont pas été stockés.");
}

console.log("✅ KB-008 validé");