const { Entity } = require("../src/contracts/Entity");
const { KnowledgeFragment } = require("../src/contracts/KnowledgeFragment");
const { EntityDictionary } = require("../src/dictionaries/EntityDictionary");
const { EntityExtractor } = require("../src/extractors/EntityExtractor");

const dictionary = new EntityDictionary();

dictionary.addMany([
  new Entity({
    id: "ENTITY-ALI-YATA",
    name: "Ali Yata",
    type: "Person",
    aliases: ["Feu Ali Yata"]
  }),
  new Entity({
    id: "ENTITY-PPS",
    name: "Parti du Progrès et du Socialisme",
    type: "Organization",
    aliases: ["PPS"]
  })
]);

const fragment = new KnowledgeFragment({
  id: "FRAG-001",
  documentId: "DOC-001",
  sectionTitle: "Dirigeants historiques",
  text: "Ali Yata est secrétaire général du PPS de 1974 à 1997."
});

const extractor = new EntityExtractor({ dictionary });

const entities = extractor.extract(fragment);

console.log(entities);

if (entities.length !== 2) {
  throw new Error("EntityExtractor n'a pas détecté les deux entités attendues.");
}

console.log("✅ KB-013 validé");