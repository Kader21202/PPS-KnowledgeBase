const { FragmentIndex } = require("../src/indexes/FragmentIndex");

const index = new FragmentIndex();

index.build([
  { id: "AB", text: "alpha beta archive" },
  { id: "G", text: "gamma registre" },
  { id: "NOISE", text: "omega historique" }
]);

const results = index.search("alpha beta gamma");

console.log(
  results.map(f => ({
    id: f.id,
    retrievalScore: f.retrievalScore,
    matchedTerms: f.retrievalMatchedTerms
  }))
);

const ab = results.find(f => f.id === "AB");
const g = results.find(f => f.id === "G");

if (
  !Array.isArray(ab?.retrievalMatchedTerms) ||
  !ab.retrievalMatchedTerms.includes("alpha") ||
  !ab.retrievalMatchedTerms.includes("beta")
) {
  throw new Error(
    "FragmentIndex ne conserve pas les termes de requête couverts par AB."
  );
}

if (
  !Array.isArray(g?.retrievalMatchedTerms) ||
  g.retrievalMatchedTerms.length !== 1 ||
  g.retrievalMatchedTerms[0] !== "gamma"
) {
  throw new Error(
    "FragmentIndex ne conserve pas la contribution complémentaire de G."
  );
}

console.log("✅ Termes de requête couverts conservés.");
