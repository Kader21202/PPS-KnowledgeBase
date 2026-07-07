const { FragmentIndex } = require("../src/indexes/FragmentIndex");
const { KnowledgeRetriever } = require("../src/retrievers/KnowledgeRetriever");
const { KnowledgePackageBuilder } = require("../src/builders/KnowledgePackageBuilder");

const fragments = [
  {
    id: "F001",
    text: "Ali Yata est le fondateur du Parti du Progrès et du Socialisme."
  },
  {
    id: "F002",
    text: "Le premier congrès du PPS s'est tenu en 1975."
  }
];

const index = new FragmentIndex();
index.build(fragments);

const retriever = new KnowledgeRetriever({ index });

const builder = new KnowledgePackageBuilder({ retriever });

const pkg = builder.build("Ali Yata");

console.log(pkg);

if (!pkg.fragments || pkg.fragments.length !== 1) {
  throw new Error("KnowledgePackage incorrect.");
}

if (pkg.fragments[0].id !== "F001") {
  throw new Error("Mauvais fragment.");
}

console.log("✅ KB-001 validé");