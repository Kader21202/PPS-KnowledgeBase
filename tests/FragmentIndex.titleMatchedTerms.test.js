const { FragmentIndex } = require("../src/indexes/FragmentIndex");

const index = new FragmentIndex();

index.build([
  {
    id: "TITLE",
    sectionTitle: "Alpha Beta",
    text: "Alpha apparaît dans le contenu."
  },
  {
    id: "BODY",
    sectionTitle: "Section générale",
    text: "Alpha Beta apparaissent dans le contenu."
  }
]);

const results = index.search("alpha beta");

const titleFragment =
  results.find(x => x.id === "TITLE");

if (!Array.isArray(titleFragment.retrievalTitleMatchedTerms)) {
  throw new Error(
    "retrievalTitleMatchedTerms absent."
  );
}

if (
  titleFragment.retrievalTitleMatchedTerms.length !== 2 ||
  !titleFragment.retrievalTitleMatchedTerms.includes("alpha") ||
  !titleFragment.retrievalTitleMatchedTerms.includes("beta")
) {
  throw new Error(
    `Couverture du titre incorrecte : ${JSON.stringify(titleFragment.retrievalTitleMatchedTerms)}`
  );
}

if (titleFragment.retrievalScore !== 1) {
  throw new Error(
    `retrievalScore ne doit pas être gonflé par le titre : ${titleFragment.retrievalScore}`
  );
}

console.log("✅ Signal lexical du titre conservé séparément du score du contenu.");
