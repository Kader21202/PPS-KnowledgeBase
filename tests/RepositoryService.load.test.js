const { RepositoryService } = require("../src/services/RepositoryService");

const service = new RepositoryService();

const document = service.load(
  "./knowledge/reference/01_presentation_du_parti/01_HISTOIRE_GENERALE_DU_PPS.txt"
);

console.log(document);
console.log("Nombre de documents :", service.count());

if (!document.id || !document.title || !document.content) {
  throw new Error("Document incomplet");
}

console.log("✅ KB-002 validé");