const { RepositoryService } = require("../src/services/RepositoryService");

const service = new RepositoryService();

const documents = service.loadKnowledgeBase("./knowledge");

console.log("Documents chargés :", documents.length);
console.log("Total repository :", service.count());

if (documents.length < 1) {
  throw new Error("Aucun document chargé depuis knowledge.");
}

console.log("✅ KB-004 validé");