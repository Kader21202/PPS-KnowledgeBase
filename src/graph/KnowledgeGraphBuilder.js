const { KnowledgeGraph } = require("./KnowledgeGraph");

class KnowledgeGraphBuilder {
  build({ entityRepository, relationRepository }) {
    if (!entityRepository || !relationRepository) {
      throw new Error("KnowledgeGraphBuilder requires both repositories.");
    }

    const entities = entityRepository
      .list()
      .map(record => record.entity);

    const relations = relationRepository
      .list()
      .map(record => record.relation);

    return new KnowledgeGraph({
      entities,
      relations
    });
  }
}

module.exports = { KnowledgeGraphBuilder };