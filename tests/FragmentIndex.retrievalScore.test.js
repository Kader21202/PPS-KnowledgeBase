const { FragmentIndex } = require("../src/indexes/FragmentIndex");
const { KnowledgeRetriever } = require("../src/retrievers/KnowledgeRetriever");
const { KnowledgeRanker } = require("../src/ranking/KnowledgeRanker");

const fragments = [
  {
    id: "ALPHA-STRONG",
    text: "Le module alpha utilise le moteur pour contrôler le canal delta."
  },
  {
    id: "ALPHA-WEAK",
    text: "Le module alpha archive les données historiques."
  },
  {
    id: "NOISE",
    text: "Le registre omega conserve les paramètres du système."
  }
];

const index = new FragmentIndex();
index.build(fragments);

const retriever = new KnowledgeRetriever({ index });

const retrieved = retriever.retrieve("alpha moteur contrôler delta", {
  limit: 10
});

const ranker = new KnowledgeRanker();

const ranked = ranker.rank({
  question: "alpha moteur contrôler delta",
  fragments: retrieved,
  strategy: "generic"
});

console.log(
  ranked.map(fragment => ({
    id: fragment.id,
    retrievalScore: fragment.retrievalScore,
    baseScore: fragment.ranking?.baseScore,
    finalScore: fragment.ranking?.finalScore
  }))
);

const strong = ranked.find(
  fragment => fragment.id === "ALPHA-STRONG"
);

const weak = ranked.find(
  fragment => fragment.id === "ALPHA-WEAK"
);

if (
  !Number.isFinite(strong?.retrievalScore) ||
  !Number.isFinite(weak?.retrievalScore)
) {
  throw new Error(
    "Le score de retrieval calculé par FragmentIndex est perdu."
  );
}

if (strong.retrievalScore <= weak.retrievalScore) {
  throw new Error(
    "Le score de retrieval ne reflète pas la force de correspondance."
  );
}

console.log(
  "✅ Score de pertinence conservé jusqu'au KnowledgeRanker."
);

