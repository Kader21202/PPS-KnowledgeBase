const { KnowledgeFragment } = require("../src/contracts/KnowledgeFragment");
const fragment = new KnowledgeFragment({
  id: "FRAG-001",
  documentId: "DOC-001",
  sectionTitle: "9. DIRIGEANTS HISTORIQUES DU PPS",
  text: "Ali Yata : Secrétaire général de 1974 à 1997.",
  metadata: { category: "Identité historique du PPS" },
  sources: []
});

console.log(fragment);

if (!fragment.id || !fragment.documentId || !fragment.text) {
  throw new Error("KnowledgeFragment invalide.");
}

console.log("✅ KnowledgeFragment test passed");