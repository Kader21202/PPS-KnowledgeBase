const { Evidence } = require("./Evidence");

class EvidenceBuilder {
  build({
    question,
    graph,
    fragments = []
  }) {
    if (!graph) {
      throw new Error("EvidenceBuilder requires a KnowledgeGraph.");
    }

    return new Evidence({
      question,
      entities: graph.entities,
      relations: graph.relations,
      fragments,
      documents: [
        ...new Set(
          fragments
            .map(fragment => fragment.documentId)
            .filter(Boolean)
        )
      ]
    });
  }
}

module.exports = { EvidenceBuilder };