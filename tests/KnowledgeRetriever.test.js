const { RepositoryService } = require("../src/services/RepositoryService");
const { KnowledgeFragmentFactory } = require("../src/factories/KnowledgeFragmentFactory");
const { FragmentIndex } = require("../src/indexes/FragmentIndex");
const { KnowledgeRetriever } = require("../src/retrievers/KnowledgeRetriever");

const service = new RepositoryService();
const factory = new KnowledgeFragmentFactory();
const index = new FragmentIndex();

const documents = service.loadKnowledgeBase("./knowledge");

const fragments = documents.flatMap(document =>
  factory.createFromDocument(document)
);

index.build(fragments);

const retriever = new KnowledgeRetriever({ index });

const results = retriever.retrieve("Ali Yata secrétaire général", { limit: 3 });

console.log("Résultats :", results.length);
console.log(results.map(fragment => ({
  id: fragment.id,
  sectionTitle: fragment.sectionTitle,
  text: fragment.text.substring(0, 150)
})));

if (results.length < 1) {
  throw new Error("Aucun fragment pertinent trouvé.");
}

console.log("✅ KB-010 validé");