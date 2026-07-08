const { KnowledgeRanker } = require("../src/ranking/KnowledgeRanker");

const ranker = new KnowledgeRanker();

const fragments = [
  {
    id: "PPS-CONGRES-1975",
    score: 0.89,
    text: "Le premier congrès du PPS s'est tenu en 1975."
  },
  {
    id: "BIO-ALI-YATA-001",
    score: 0.85,
    text: "Ali Yata est le fondateur du Parti du Progrès et du Socialisme."
  }
];

const ranked = ranker.rank({
  question: "Qui a fondé le PPS ?",
  fragments,
  strategy: "definition"
});

console.log(ranked);

if (ranked[0].id !== "BIO-ALI-YATA-001") {
  throw new Error("KnowledgeRanker n'a pas remonté le bon fragment.");
}

console.log("✅ KB-002A KnowledgeRanker validé");