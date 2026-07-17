const {
  KnowledgeRanker
} = require("../ranking/KnowledgeRanker");

class KnowledgePackageBuilder {
  constructor({
    retriever,
    ranker = new KnowledgeRanker()
  }) {
    if (!retriever) {
      throw new Error(
        "KnowledgePackageBuilder requires KnowledgeRetriever."
      );
    }

    this.retriever = retriever;
    this.ranker = ranker;
  }

  build(question, options = {}) {
    const limit = options.limit || 30;

    const candidateLimit =
      options.candidateLimit ||
      Math.max(limit * 5, 100);

    const normalizedQuestion = String(
      question || ""
    ).toLowerCase();

    const strategy =
      options.strategy ||
      (
        normalizedQuestion.startsWith("qui est") ||
        normalizedQuestion.startsWith("qui était") ||
        normalizedQuestion.includes("biographie")
          ? "biography"
          : "definition"
      );

    const candidateFragments =
      this.retriever.retrieve(question, {
        limit: candidateLimit
      });

    const rankedFragments = this.ranker
      .rank({
        question,
        fragments: candidateFragments,
        strategy
      })
      .slice(0, limit);

    return {
      question,

      fragments: rankedFragments,

      evidence: rankedFragments,

      sources: ["PPS-KnowledgeBase"],

      metadata: {
        builder: "KnowledgePackageBuilder",
        ranking: "KnowledgeRanker",
        strategy,
        candidateLimit,
        finalLimit: limit,
        candidateCount:
          candidateFragments.length,
        selectedCount:
          rankedFragments.length
      }
    };
  }
}

module.exports = {
  KnowledgePackageBuilder
};