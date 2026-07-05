const { Entity } = require("../src/contracts/Entity");
const { EntityDictionary } = require("../src/dictionaries/EntityDictionary");

const dictionary = new EntityDictionary();

dictionary.addMany([
  new Entity({
    id: "ENTITY-ALI-YATA",
    name: "Ali Yata",
    type: "Person",
    aliases: ["Feu Ali Yata", "Ali YATA"]
  }),
  new Entity({
    id: "ENTITY-PPS",
    name: "Parti du Progrès et du Socialisme",
    type: "Organization",
    aliases: ["PPS"]
  })
]);

console.log("Total :", dictionary.count());
console.log("Ali :", dictionary.findByName("ali yata"));
console.log("PPS :", dictionary.findByName("PPS"));

if (!dictionary.findByName("Feu Ali Yata")) {
  throw new Error("Alias non reconnu.");
}

if (!dictionary.findByName("PPS")) {
  throw new Error("Organisation non reconnue.");
}

console.log("✅ KB-012 validé");