class KnowledgePackageBuilder {
  constructor({ retriever }) {
    if (!retriever) {
      throw new Error("KnowledgePackageBuilder requires KnowledgeRetriever.");
    }

    this.retriever = retriever;
  }

  build(question, options = {}) {
    const limit = options.limit || 5;

    const fragments = this.retriever.retrieve(question, { limit });

    return {
      question,
      fragments,
      evidence: fragments,
      sources: ["PPS-KnowledgeBase"],
      metadata: {
        builder: "KnowledgePackageBuilder"
      }
    };
  }
}

module.exports = { KnowledgePackageBuilder };