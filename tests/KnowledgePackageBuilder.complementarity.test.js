const { FragmentIndex } = require("../src/indexes/FragmentIndex");
const { KnowledgeRetriever } = require("../src/retrievers/KnowledgeRetriever");
const { KnowledgePackageBuilder } = require("../src/builders/KnowledgePackageBuilder");

const fragments = [
  { id: "A", text: "alpha moteur détailA" },
  { id: "B", text: "alpha contrôle détailB" },
  { id: "C", text: "moteur signal détailC" },
  { id: "D", text: "contrôle delta détailD" },
  { id: "NOISE", text: "alpha archive ancienne" }
];

const index = new FragmentIndex();
index.build(fragments);

const retriever = new KnowledgeRetriever({ index });
const builder = new KnowledgePackageBuilder({ retriever });

const pkg = builder.build(
  "alpha moteur contrôle signal delta",
  { strategy: "generic", limit: 30 }
);

console.log(
  pkg.fragments.map(f => ({
    id: f.id,
    retrievalScore: f.retrievalScore
  }))
);

for (const id of ["A", "B", "C", "D"]) {
  if (!pkg.fragments.some(f => f.id === id)) {
    throw new Error(
      `Le fragment complémentaire ${id} a été perdu.`
    );
  }
}

console.log("✅ Complémentarité multi-fragments préservée.");
