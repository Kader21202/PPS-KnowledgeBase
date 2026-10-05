const { FragmentIndex } = require("../src/indexes/FragmentIndex");
const { KnowledgeRetriever } = require("../src/retrievers/KnowledgeRetriever");
const { KnowledgePackageBuilder } = require("../src/builders/KnowledgePackageBuilder");

const fragments = [
  {
    id: "STRONG",
    text: "alpha moteur contrôle signal delta"
  },
  {
    id: "MEDIUM",
    text: "alpha moteur contrôle archive"
  },
  {
    id: "WEAK-ALPHA",
    text: "alpha historique secondaire"
  },
  {
    id: "WEAK-MOTEUR",
    text: "moteur documentation ancienne"
  },
  {
    id: "NOISE",
    text: "omega registre stockage externe"
  }
];

const index = new FragmentIndex();
index.build(fragments);

const retriever = new KnowledgeRetriever({ index });

const builder = new KnowledgePackageBuilder({
  retriever
});

const pkg = builder.build(
  "alpha moteur contrôle signal delta",
  {
    strategy: "generic",
    limit: 30
  }
);

console.log(
  pkg.fragments.map(fragment => ({
    id: fragment.id,
    retrievalScore: fragment.retrievalScore,
    finalScore: fragment.ranking?.finalScore
  }))
);

if (!pkg.fragments.some(fragment => fragment.id === "STRONG")) {
  throw new Error("Le fragment fortement pertinent a été perdu.");
}

if (!pkg.fragments.some(fragment => fragment.id === "MEDIUM")) {
  throw new Error("Le fragment complémentaire pertinent a été perdu.");
}

if (
  pkg.fragments.some(
    fragment =>
      fragment.id === "WEAK-ALPHA" ||
      fragment.id === "WEAK-MOTEUR"
  )
) {
  throw new Error(
    "KnowledgePackageBuilder conserve des fragments faiblement pertinents uniquement pour remplir la limite."
  );
}

console.log(
  "✅ Sélection adaptative de pertinence validée."
);
