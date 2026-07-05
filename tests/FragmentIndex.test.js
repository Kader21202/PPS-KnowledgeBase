const { RepositoryService } = require("../src/services/RepositoryService");
const { KnowledgeFragmentFactory } = require("../src/factories/KnowledgeFragmentFactory");
const { FragmentIndex } = require("../src/indexes/FragmentIndex");

const service = new RepositoryService();
const factory = new KnowledgeFragmentFactory();
const index = new FragmentIndex();

const document = service.load(
  "./knowledge/reference/01_presentation_du_parti/01_HISTOIRE_GENERALE_DU_PPS.txt"
);

const fragments = factory.createFromDocument(document);

index.build(fragments);

const results = index.search("Ali Yata secrétaire général");

console.log("Résultats :", results.length);
console.log(results.map(fragment => ({
  id: fragment.id,
  sectionTitle: fragment.sectionTitle,
  text: fragment.text.substring(0, 120)
})));

if (results.length < 1) {
  throw new Error("Aucun fragment trouvé.");
}

console.log("✅ KB-009 validé");