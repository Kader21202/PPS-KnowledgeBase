const { KnowledgeFragmentFactory } = require("../src/factories/KnowledgeFragmentFactory");

const factory = new KnowledgeFragmentFactory();

const document = {
  id: "DOC-GENERIC",
  path: "C:\\corpus\\generic.txt",
  metadata: {},
  sources: [],
  sections: [
    {
      title: "TITRE STRUCTUREL",
      content: ""
    },
    {
      title: "CONTENU A",
      content: "Premier contenu documentaire."
    },
    {
      title: "ESPACES UNIQUEMENT",
      content: "   \r\n\t   "
    },
    {
      title: "CONTENU B",
      content: "Deuxième contenu documentaire."
    }
  ]
};

const fragments =
  factory.createFromDocument(document);

if (fragments.length !== 2) {
  throw new Error(
    `Fragments attendus: 2 ; obtenus: ${fragments.length}.`
  );
}

if (
  fragments.some(
    fragment =>
      !String(fragment.text || "").trim()
  )
) {
  throw new Error(
    "Un fragment documentaire vide a été créé."
  );
}

console.log(
  fragments.map(fragment => ({
    id: fragment.id,
    section: fragment.sectionTitle,
    text: fragment.text
  }))
);

console.log(
  "✅ Les sections structurelles vides ne deviennent pas des fragments indexables."
);

