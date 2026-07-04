const { TextLoader } = require("../src/loaders/TextLoader");

const loader = new TextLoader();

const file = loader.load(
    "./knowledge/reference/01_presentation_du_parti/01_HISTOIRE_GENERALE_DU_PPS.txt"
);

console.log("Chemin :", file.path);
console.log("Taille :", file.content.length);
console.log("Début du document :");
console.log(file.content.substring(0, 200));