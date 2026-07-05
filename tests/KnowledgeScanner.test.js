const { KnowledgeScanner } = require("../src/scanners/KnowledgeScanner");

const scanner = new KnowledgeScanner();

const files = scanner.scan("./knowledge");

console.log("Fichiers trouvés :", files.length);
console.log(files);

if (files.length < 1) {
  throw new Error("Aucun fichier .txt trouvé.");
}

console.log("✅ KnowledgeScanner test passed");