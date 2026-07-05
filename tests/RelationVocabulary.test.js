const { RelationVocabulary } = require("../src/vocabularies/RelationVocabulary");

const vocabulary = new RelationVocabulary();

console.log(vocabulary.list());

console.log("Nombre :", vocabulary.count());

console.log(vocabulary.get("secretary_general_of"));

if (!vocabulary.has("secretary_general_of")) {
  throw new Error("Relation officielle absente.");
}

if (!vocabulary.has("member_of")) {
  throw new Error("Relation officielle absente.");
}

console.log("✅ KB-017 validé");