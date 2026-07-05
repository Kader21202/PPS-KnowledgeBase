const { Entity } = require("../src/contracts/Entity");
const { EntityNormalizer } = require("../src/normalizers/EntityNormalizer");

const normalizer = new EntityNormalizer();

const ali1 = new Entity({
  id: "ENTITY-ALI-YATA",
  name: "Ali Yata",
  type: "Person",
  aliases: ["Feu Ali Yata"]
});

const ali2 = new Entity({
  id: "ENTITY-ALI-YATA-ALT",
  name: "ALI YATA",
  type: "Person",
  aliases: []
});

console.log("Nom normalisé :", normalizer.normalizeName("Feu Ali YATA"));
console.log("Même entité :", normalizer.isSameEntity(ali1, ali2));

if (!normalizer.isSameEntity(ali1, ali2)) {
  throw new Error("EntityNormalizer n'a pas reconnu la même entité.");
}

console.log("✅ KB-014 validé");