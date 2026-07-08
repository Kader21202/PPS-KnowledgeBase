const { KnowledgeRanker } = require("../ranking/KnowledgeRanker");

class KnowledgePackageBuilder {
  constructor({ retriever, ranker = new KnowledgeRanker() }) {
    if (!retriever) {
      throw new Error("KnowledgePackageBuilder requires KnowledgeRetriever.");
    }

    this.retriever = retriever;
    this.ranker = ranker;
  }

  build(question, options = {}) {
    const limit = options.limit || 5;
    const strategy = options.strategy || "definition";

    const fragments = this.retriever.retrieve(question, { limit });

    const rankedFragments = this.ranker.rank({
      question,
      fragments,
      strategy
    });

    return {
      question,
      fragments: rankedFragments,
      evidence: rankedFragments,
      sources: ["PPS-KnowledgeBase"],
      metadata: {
        builder: "KnowledgePackageBuilder",
        ranking: "KnowledgeRanker",
        strategy
      }
    };
  }
}

module.exports = { KnowledgePackageBuilder };