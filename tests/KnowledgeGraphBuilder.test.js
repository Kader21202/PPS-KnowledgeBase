const { Entity } = require("../src/contracts/Entity");
const { Relation } = require("../src/contracts/Relation");
const { EntityRepository } = require("../src/repositories/EntityRepository");
const { RelationRepository } = require("../src/repositories/RelationRepository");
const { KnowledgeGraphBuilder } = require("../src/graph/KnowledgeGraphBuilder");

const entityRepository = new EntityRepository();
const relationRepository = new RelationRepository();

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

entityRepository.add(aliYata);
entityRepository.add(pps);

const relation = new Relation({
  id: "REL-001",
  source: aliYata,
  target: pps,
  type: "secretary_general_of"
});

relationRepository.add(relation);

const builder = new KnowledgeGraphBuilder();

const graph = builder.build({
  entityRepository,
  relationRepository
});

console.log(graph);

if (graph.entityCount() !== 2) {
  throw new Error("Le graphe doit contenir 2 entités.");
}

if (graph.relationCount() !== 1) {
  throw new Error("Le graphe doit contenir 1 relation.");
}

console.log("✅ KB-020.2 validé");