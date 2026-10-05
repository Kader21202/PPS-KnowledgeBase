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

    const isBiography =
  normalizedQuestion.startsWith("qui est") ||
  normalizedQuestion.startsWith("qui était") ||
  normalizedQuestion.includes("biographie");

const isHistory =
  normalizedQuestion.includes("histoire") ||
  normalizedQuestion.includes("historique") ||
  normalizedQuestion.includes("origine") ||
  normalizedQuestion.includes("naissance") ||
  normalizedQuestion.includes("création") ||
  normalizedQuestion.includes("creation") ||
  normalizedQuestion.includes("évolution") ||
  normalizedQuestion.includes("evolution") ||
  normalizedQuestion.includes("parcours") ||
  normalizedQuestion.includes("chronologie");

const strategy =
  options.strategy ||
  (
    isBiography
      ? "biography"
      : isHistory
        ? "history"
        : "definition"
  );

    const candidateFragments =
      this.retriever.retrieve(question, {
        limit: candidateLimit
      });

    const rankedCandidates = this.ranker
  .rank({
    question,
    fragments: candidateFragments,
    strategy
  });

const bestScore = Number(
  rankedCandidates[0]?.ranking?.finalScore ?? 0
);

const relativeRelevanceThreshold =
  options.relativeRelevanceThreshold ?? 0.5;

const coveredTerms = new Set();

const rankedFragments = [];

for (const fragment of rankedCandidates) {
  if (rankedFragments.length >= limit) {
    break;
  }

  const finalScore = Number(
    fragment.ranking?.finalScore ?? 0
  );

  const relativeScore =
    bestScore > 0
      ? finalScore / bestScore
      : 0;

  const matchedTerms = [
    ...new Set(
      fragment.retrievalMatchedTerms || []
    )
  ];

  const newTerms = matchedTerms.filter(
    term => !coveredTerms.has(term)
  );

  const sufficientlyRelevant =
    relativeScore >=
    relativeRelevanceThreshold;

  const contributesNewCoverage =
    newTerms.length > 0;

  if (
    sufficientlyRelevant ||
    contributesNewCoverage
  ) {
    rankedFragments.push(fragment);

    for (const term of matchedTerms) {
      coveredTerms.add(term);
    }
  }
}
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
