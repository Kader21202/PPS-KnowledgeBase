const { FragmentIndex } = require("../src/indexes/FragmentIndex");

const index = new FragmentIndex();

index.build([
  {
    id: "REPEAT",
    text: "alpha alpha alpha alpha"
  },
  {
    id: "SINGLE",
    text: "alpha"
  },
  {
    id: "MULTI",
    text: "alpha moteur signal"
  }
]);

const results = index.search("alpha moteur signal");

console.log(
  results.map(fragment => ({
    id: fragment.id,
    retrievalScore: fragment.retrievalScore
  }))
);

const repeat = results.find(f => f.id === "REPEAT");
const single = results.find(f => f.id === "SINGLE");
const multi = results.find(f => f.id === "MULTI");

if (repeat.retrievalScore !== 1) {
  throw new Error(
    "La répétition d'un même terme gonfle artificiellement retrievalScore."
  );
}

if (single.retrievalScore !== 1) {
  throw new Error(
    "Un terme unique doit contribuer exactement une fois."
  );
}

if (multi.retrievalScore !== 3) {
  throw new Error(
    "retrievalScore doit mesurer la couverture des termes distincts de la requête."
  );
}

console.log(
  "✅ retrievalScore mesure la couverture lexicale distincte."
);
