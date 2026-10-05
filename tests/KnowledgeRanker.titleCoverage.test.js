const { KnowledgeRanker } = require("../src/ranking/KnowledgeRanker");

const ranker = new KnowledgeRanker();

const [fragment] = ranker.rank({
  question: "alpha beta gamma",
  strategy: "generic",
  fragments: [{
    id: "F1",
    text: "alpha beta",
    retrievalScore: 2,
    retrievalMatchedTerms: ["alpha", "beta"],
    retrievalTitleMatchedTerms: ["alpha", "gamma"]
  }]
});

if (fragment.ranking.titleCoverage !== 2) {
  throw new Error(
    `titleCoverage attendu: 2 ; obtenu: ${fragment.ranking.titleCoverage}`
  );
}

if (fragment.ranking.baseScore !== 2) {
  throw new Error(
    `baseScore attendu: 2 ; obtenu: ${fragment.ranking.baseScore}`
  );
}

if (fragment.ranking.finalScore !== 2) {
  throw new Error(
    `Le titre ne doit pas encore modifier finalScore : ${fragment.ranking.finalScore}`
  );
}

console.log("✅ Le Ranker conserve séparément la couverture du titre.");
