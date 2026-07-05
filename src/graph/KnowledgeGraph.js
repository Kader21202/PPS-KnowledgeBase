class KnowledgeGraph {
  constructor({
    entities = [],
    relations = []
  }) {
    this.entities = entities;
    this.relations = relations;
  }

  entityCount() {
    return this.entities.length;
  }

  relationCount() {
    return this.relations.length;
  }
}

module.exports = { KnowledgeGraph };