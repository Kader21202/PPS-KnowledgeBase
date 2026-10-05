const { KnowledgePackageBuilder } = require("../src/builders/KnowledgePackageBuilder");

const fragments = [
  { id: "STRONG", text: "alpha beta moteur controle" },
  { id: "COMPLEMENT", text: "gamma information" },
  { id: "REDUNDANT", text: "alpha archive ancienne" }
];

const retriever = {
  retrieve() {
    return fragments.map(fragment => {
      const queryTerms = ["alpha", "beta", "gamma", "moteur", "controle"];
      const terms = [...new Set(
        fragment.text.toLowerCase().split(/\s+/)
          .filter(word => queryTerms.includes(word))
      )];

      return {
        ...fragment,
        retrievalScore: terms.length,
        retrievalMatchedTerms: terms
      };
    });
  }
};

const ranker = {
  rank({ fragments }) {
    return fragments
      .map(fragment => ({
        ...fragment,
        ranking: {
          baseScore: fragment.retrievalScore,
          finalScore: fragment.retrievalScore
        }
      }))
      .sort((a, b) => b.ranking.finalScore - a.ranking.finalScore);
  }
};

const builder = new KnowledgePackageBuilder({ retriever, ranker });

(async () => {
  const result = await builder.build(
    "alpha beta gamma moteur controle",
    { strategy: "generic", limit: 30 }
  );

  const ids = result.fragments.map(f => f.id);

  console.log(
    result.fragments.map(f => ({
      id: f.id,
      retrievalScore: f.retrievalScore,
      matchedTerms: f.retrievalMatchedTerms
    }))
  );

  if (!ids.includes("STRONG")) {
    throw new Error("Le fragment principal a été perdu.");
  }

  if (!ids.includes("COMPLEMENT")) {
    throw new Error(
      "Le fragment faible complémentaire a été perdu alors qu'il apporte gamma."
    );
  }

  if (ids.includes("REDUNDANT")) {
    throw new Error(
      "Le fragment faible redondant est conservé alors qu'il n'apporte aucune couverture nouvelle."
    );
  }

  console.log("✅ Sélection adaptative par contribution validée.");
})().catch(error => {
  console.error(error);
  process.exit(1);
});


