class KnowledgeRetriever {
  constructor({ index }) {
    if (!index) {
      throw new Error("KnowledgeRetriever requires an index.");
    }

    this.index = index;
  }

  retrieve(query, options = {}) {
    const limit = options.limit || 30;

    return this.index.search(query).slice(0, limit);
  }
}

module.exports = { KnowledgeRetriever };