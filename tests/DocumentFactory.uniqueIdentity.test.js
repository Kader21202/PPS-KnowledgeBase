const { DocumentFactory } = require("../src/factories/DocumentFactory");

const factory = new DocumentFactory();

const content = `
# Document de test

Contenu générique.
`;

const first = factory.create({
  path: "C:\\corpus\\dossier-a\\document.txt",
  content
});

const second = factory.create({
  path: "C:\\corpus\\dossier-b\\document.txt",
  content
});

if (first.id === second.id) {
  throw new Error(
    `Collision d'identité documentaire : deux chemins distincts produisent le même id "${first.id}".`
  );
}

const repeated = factory.create({
  path: "C:\\corpus\\dossier-a\\document.txt",
  content
});

if (first.id !== repeated.id) {
  throw new Error(
    "L'identité documentaire n'est pas déterministe pour un même chemin."
  );
}

console.log({
  firstId: first.id,
  secondId: second.id,
  repeatedId: repeated.id
});

console.log("✅ Identité documentaire générique validée.");
