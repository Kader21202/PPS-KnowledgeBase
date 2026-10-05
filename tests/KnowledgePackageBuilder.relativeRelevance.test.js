const {
  KnowledgePackageBuilder
} = require("../src/builders/KnowledgePackageBuilder");

function createRanker() {
  return {
    rank({ fragments }) {
      return fragments
        .map(fragment => ({
          ...fragment,
          ranking: {
            baseScore: fragment.retrievalScore,
            finalScore: fragment.retrievalScore
          }
        }))
        .sort(
          (a, b) =>
            b.ranking.finalScore -
            a.ranking.finalScore
        );
    }
  };
}

function buildPackage(fragments, question) {
  const retriever = {
    retrieve() {
      return fragments;
    }
  };

  const builder =
    new KnowledgePackageBuilder({
      retriever,
      ranker: createRanker()
    });

  return builder.build(question, {
    strategy: "generic",
    limit: 30
  });
}

/*
 * Cas 1 :
 * score 2 est fort lorsque le meilleur score vaut 2.
 * Les deux fragments doivent survivre même s'ils
 * couvrent les mêmes termes.
 */
const balanced = buildPackage(
  [
    {
      id: "BALANCED-A",
      text: "alpha moteur information A",
      retrievalScore: 2,
      retrievalMatchedTerms: [
        "alpha",
        "moteur"
      ]
    },
    {
      id: "BALANCED-B",
      text: "alpha moteur information B",
      retrievalScore: 2,
      retrievalMatchedTerms: [
        "alpha",
        "moteur"
      ]
    }
  ],
  "alpha moteur"
);

const balancedIds =
  balanced.fragments.map(fragment => fragment.id);

if (
  !balancedIds.includes("BALANCED-A") ||
  !balancedIds.includes("BALANCED-B")
) {
  throw new Error(
    "La pertinence relative élimine un fragment " +
    "fort lorsque le meilleur score vaut également 2."
  );
}

/*
 * Cas 2 :
 * le même score absolu 2 devient relativement faible
 * face à un meilleur candidat de score 5.
 *
 * Il ne doit pas être conservé uniquement parce que
 * son score absolu vaut 2 lorsqu'il n'apporte aucune
 * couverture nouvelle.
 */
const contrasted = buildPackage(
  [
    {
      id: "STRONG",
      text: "alpha moteur controle signal delta",
      retrievalScore: 5,
      retrievalMatchedTerms: [
        "alpha",
        "moteur",
        "controle",
        "signal",
        "delta"
      ]
    },
    {
      id: "RELATIVE-WEAK",
      text: "alpha moteur archive secondaire",
      retrievalScore: 2,
      retrievalMatchedTerms: [
        "alpha",
        "moteur"
      ]
    }
  ],
  "alpha moteur controle signal delta"
);

const contrastedIds =
  contrasted.fragments.map(fragment => fragment.id);

if (!contrastedIds.includes("STRONG")) {
  throw new Error(
    "Le fragment principal a été perdu."
  );
}

if (contrastedIds.includes("RELATIVE-WEAK")) {
  throw new Error(
    "Un score absolu 2 est conservé alors qu'il est " +
    "faible relativement au meilleur candidat et " +
    "n'apporte aucune couverture nouvelle."
  );
}

console.log(
  "✅ Pertinence relative indépendante du score absolu validée."
);