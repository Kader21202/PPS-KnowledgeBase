const { Entity } = require("../src/contracts/Entity");

const entity = new Entity({
  id: "ENTITY-ALI-YATA",
  name: "Ali Yata",
  type: "Person",
  aliases: ["Feu Ali Yata"],
  metadata: {
    role: "Secrétaire général du PPS",
    period: "1974-1997"
  }
});

console.log(entity);

if (!entity.id || !entity.name || !entity.type) {
  throw new Error("Entity invalide.");
}

console.log("✅ KB-011 validé");