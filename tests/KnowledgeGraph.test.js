const { Entity } = require("../src/contracts/Entity");
const { Relation } = require("../src/contracts/Relation");
const { KnowledgeGraph } = require("../src/graph/KnowledgeGraph");

const aliYata = new Entity({
  id: "ENTITY-ALI-YATA",
  name: "Ali Yata",
  type: "Person"
});

const pps = new Entity({
  id: "ENTITY-PPS",
  name: "PPS",
  type: "Organization"
});

const relation = new Relation({
  id: "REL-001",
  source: aliYata,
  target: pps,
  type: "secretary_general_of"
});

const graph = new KnowledgeGraph({
  entities: [aliYata, pps],
  relations: [relation]
});

console.log(graph);
console.log("Entités :", graph.entityCount());
console.log("Relations :", graph.relationCount());

if (graph.entityCount() !== 2) {
  throw new Error("Nombre d'entités incorrect.");
}

if (graph.relationCount() !== 1) {
  throw new Error("Nombre de relations incorrect.");
}

console.log("✅ KB-020.1 validé");