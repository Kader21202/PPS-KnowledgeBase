const { KnowledgePackageBuilder } = require("../src/builders/KnowledgePackageBuilder");

const fragments = [
  {
    id: "FACT-A",
    text: "alpha moteur atteint 98 unités dans le module A",
    retrievalScore: 2,
    retrievalMatchedTerms: ["alpha", "moteur"]
  },
  {
    id: "FACT-B",
    text: "alpha moteur atteint 120 unités dans le module B",
    retrievalScore: 2,
    retrievalMatchedTerms: ["alpha", "moteur"]
  }
];

const retriever = {
  retrieve() {
    return fragments;
  }
};

const ranker = {
  rank({ fragments }) {
    return fragments.map(fragment => ({
      ...fragment,
      ranking: {
        baseScore: fragment.retrievalScore,
        finalScore: fragment.retrievalScore
      }
    }));
  }
};

const builder = new KnowledgePackageBuilder({
  retriever,
  ranker
});

const result = builder.build(
  "alpha moteur",
  {
    strategy: "generic",
    limit: 30
  }
);

const ids = result.fragments.map(f => f.id);

console.log(
  result.fragments.map(f => ({
    id: f.id,
    matchedTerms: f.retrievalMatchedTerms,
    text: f.text
  }))
);

if (!ids.includes("FACT-A") || !ids.includes("FACT-B")) {
  throw new Error(
    "Deux faits distincts partageant la même couverture lexicale ne sont pas tous conservés."
  );
}

console.log("✅ Complémentarité factuelle à couverture lexicale identique préservée.");
