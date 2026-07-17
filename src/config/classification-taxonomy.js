const {
  ClassificationTaxonomy
} = require("../contracts/ClassificationTaxonomy");

const {
  ClassificationCategory
} = require("../contracts/ClassificationCategory");

const categories = [
  new ClassificationCategory({
    id: "reference",
    label: "Référence",
    family: "reference",
    description: "Documents stables servant de référence durable."
  }),

  new ClassificationCategory({
    id: "operational",
    label: "Opérationnel",
    family: "operational",
    description: "Documents liés à l’activité politique et institutionnelle courante."
  }),

  new ClassificationCategory({
    id: "presentation-du-parti",
    label: "Présentation du parti",
    family: "reference",
    parentId: "reference",
    aliases: ["présentation", "historique du parti"],
    keywords: ["présentation", "histoire", "création", "parti"]
  }),

  new ClassificationCategory({
    id: "institutions-du-parti",
    label: "Institutions du parti",
    family: "reference",
    parentId: "reference",
    aliases: ["organes du parti", "instances du parti"],
    keywords: ["bureau politique", "comité central", "congrès", "instance"]
  }),

  new ClassificationCategory({
    id: "dirigeants",
    label: "Dirigeants",
    family: "reference",
    parentId: "reference",
    aliases: ["direction", "responsables"],
    keywords: ["secrétaire général", "dirigeant", "direction"]
  }),

  new ClassificationCategory({
    id: "personnalites",
    label: "Personnalités",
    family: "reference",
    parentId: "reference",
    aliases: ["figures du parti"],
    keywords: ["personnalité", "militant", "responsable"]
  }),

  new ClassificationCategory({
    id: "ideologie",
    label: "Idéologie",
    family: "reference",
    parentId: "reference",
    aliases: ["doctrine", "orientation idéologique"],
    keywords: ["socialisme", "progressisme", "idéologie", "doctrine"]
  }),

  new ClassificationCategory({
    id: "positions-officielles",
    label: "Positions officielles",
    family: "reference",
    parentId: "reference",
    aliases: ["positions du parti"],
    keywords: ["position officielle", "prise de position", "orientation"]
  }),

  new ClassificationCategory({
    id: "textes-fondateurs",
    label: "Textes fondateurs",
    family: "reference",
    parentId: "reference",
    aliases: ["documents fondateurs"],
    keywords: ["texte fondateur", "création", "fondation"]
  }),

  new ClassificationCategory({
    id: "statuts",
    label: "Statuts",
    family: "reference",
    parentId: "reference",
    aliases: ["statuts du parti"],
    keywords: ["statuts", "règlement", "organisation interne"]
  }),

  new ClassificationCategory({
    id: "referentiels",
    label: "Référentiels",
    family: "reference",
    parentId: "reference",
    aliases: ["références doctrinales"],
    keywords: ["référentiel", "orientation", "principes"]
  }),

  new ClassificationCategory({
    id: "sources-officielles",
    label: "Sources officielles",
    family: "reference",
    parentId: "reference",
    aliases: ["source officielle"],
    keywords: ["site officiel", "document officiel", "source officielle"]
  }),

  new ClassificationCategory({
    id: "actualites",
    label: "Actualités",
    family: "operational",
    parentId: "operational",
    aliases: ["actualité", "nouvelles"],
    keywords: ["actualité", "événement", "information"]
  }),

  new ClassificationCategory({
    id: "communiques",
    label: "Communiqués",
    family: "operational",
    parentId: "operational",
    aliases: ["communiqué", "déclaration officielle"],
    keywords: ["communiqué", "déclaration", "bureau politique"]
  }),

  new ClassificationCategory({
    id: "discours",
    label: "Discours",
    family: "operational",
    parentId: "operational",
    aliases: ["allocution", "intervention"],
    keywords: ["discours", "allocution", "intervention"]
  }),

  new ClassificationCategory({
    id: "elections",
    label: "Élections",
    family: "operational",
    parentId: "operational",
    aliases: ["élection", "scrutin", "campagne électorale"],
    keywords: ["élection", "scrutin", "candidat", "campagne"]
  }),

  new ClassificationCategory({
    id: "gouvernement",
    label: "Gouvernement",
    family: "operational",
    parentId: "operational",
    aliases: ["action gouvernementale"],
    keywords: ["gouvernement", "ministre", "majorité", "exécutif"]
  }),

  new ClassificationCategory({
    id: "organisations-paralleles",
    label: "Organisations parallèles",
    family: "operational",
    parentId: "operational",
    aliases: ["organisations affiliées"],
    keywords: ["jeunesse", "femmes", "syndicat", "organisation parallèle"]
  }),

  new ClassificationCategory({
    id: "parlement",
    label: "Parlement",
    family: "operational",
    parentId: "operational",
    aliases: ["activité parlementaire"],
    keywords: ["parlement", "député", "question orale", "proposition de loi"]
  }),

  new ClassificationCategory({
    id: "programmes",
    label: "Programmes",
    family: "operational",
    parentId: "operational",
    aliases: ["programme politique", "programme électoral"],
    keywords: ["programme", "proposition", "engagement"]
  })
];

const classificationTaxonomy = new ClassificationTaxonomy({
  id: "PPS-DOCUMENT-TAXONOMY",
  version: "1.0",
  categories,
  metadata: {
    domain: "PPS",
    language: "fr",
    purpose: "document-classification"
  }
});

module.exports = {
  classificationTaxonomy
};