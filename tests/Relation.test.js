const { Entity } = require("../src/contracts/Entity");
const { Relation } = require("../src/contracts/Relation");

const aliYata = new Entity({
  id: "ENTITY-ALI-YATA",
  name: "Ali Yata",
  type: "Person"
});

const pps = new Entity({
  id: "ENTITY-PPS",
  name: "Parti du Progrès et du Socialisme",
  type: "Organization",
  aliases: ["PPS"]
});

const relation = new Relation({
  id: "REL-001",
  source: aliYata,
  target: pps,
  type: "secretary_general_of",
  metadata: {
    period: "1974-1997"
  }
});

console.log(relation);

if (!relation.id || !relation.source || !relation.target || !relation.type) {
  throw new Error("Relation invalide.");
}

console.log("✅ KB-016 validé");