const {
  KnowledgeBaseBuilder
} = require(
  "../src/builders/KnowledgeBaseBuilder"
);

const fragments = [
  {
    id: "F001",
    text:
      "Ali Yata est le fondateur du Parti du Progrès et du Socialisme."
  },
  {
    id: "F002",
    text:
      "Le premier congrès du PPS s'est tenu en 1975."
  }
];

const builder =
  new KnowledgeBaseBuilder();

const knowledgeBase =
  builder.build({
    fragments
  });

if (!knowledgeBase) {
  throw new Error(
    "KnowledgeBaseBuilder returned nothing."
  );
}

if (!knowledgeBase.index) {
  throw new Error(
    "Missing FragmentIndex."
  );
}

if (!knowledgeBase.retriever) {
  throw new Error(
    "Missing KnowledgeRetriever."
  );
}

if (!knowledgeBase.knowledgePackageBuilder) {
  throw new Error(
    "Missing KnowledgePackageBuilder."
  );
}

const knowledgePackage =
  knowledgeBase
    .knowledgePackageBuilder
    .build("Ali Yata");

if (
  !Array.isArray(
    knowledgePackage.fragments
  )
) {
  throw new Error(
    "KnowledgePackage fragments must be an array."
  );
}

if (
  knowledgePackage.fragments.length !== 1
) {
  throw new Error(
    "KnowledgePackage should contain one matching fragment."
  );
}

if (
  knowledgePackage.fragments[0].id !==
  "F001"
) {
  throw new Error(
    "KnowledgeBaseBuilder returned the wrong fragment."
  );
}

console.log(
  "✅ KnowledgeBaseBuilder validé"
);
