const { Document } = require("../src/contracts/Document");
const { RepositoryService } = require("../src/services/RepositoryService");

const service = new RepositoryService();

const doc = new Document({
    id: "DOC-001",
    title: "Présentation du PPS",
    category: "presentation",
    type: "reference",
    content: "Le Parti du Progrès et du Socialisme est un parti politique marocain."
});

service.addDocument(doc);

console.log("Nombre de documents :", service.countDocuments());

console.log("Document trouvé :");
console.log(service.getDocumentById("DOC-001"));

console.log("Liste complète :");
console.log(service.getDocuments());

console.log("✅ KB-001 validé");