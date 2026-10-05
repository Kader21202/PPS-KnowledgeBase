const { KnowledgeRanker } = require("../src/ranking/KnowledgeRanker");

const ranker = new KnowledgeRanker();

const [fragment] = ranker.rank({
  question: "alpha beta gamma delta",
  strategy: "generic",
  fragments: [{
    id: "F1",
    text: "alpha beta gamma delta",
    retrievalScore: 4,
    retrievalMatchedTerms: ["alpha", "beta", "gamma", "delta"],
    retrievalTitleMatchedTerms: ["alpha", "beta", "gamma"]
  }]
});

if (fragment.ranking.titleCentrality !== 0.75) {
  throw new Error(
    `titleCentrality attendu: 0.75 ; obtenu: ${fragment.ranking.titleCentrality}`
  );
}

if (fragment.ranking.finalScore !== 4) {
  throw new Error(
    `titleCentrality ne doit pas encore modifier finalScore : ${fragment.ranking.finalScore}`
  );
}

console.log("✅ Centralité thématique du titre mesurée séparément.");
