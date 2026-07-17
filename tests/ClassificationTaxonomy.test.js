const {
  ClassificationTaxonomy
} = require("../src/contracts/ClassificationTaxonomy");

const {
  ClassificationCategory
} = require("../src/contracts/ClassificationCategory");

const {
  classificationTaxonomy
} = require("../src/config/classification-taxonomy");

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }

  console.log(true);
}

assert(
  classificationTaxonomy instanceof ClassificationTaxonomy,
  "The taxonomy must be a ClassificationTaxonomy."
);

assert(
  classificationTaxonomy.id === "PPS-DOCUMENT-TAXONOMY",
  "Invalid taxonomy id."
);

assert(
  classificationTaxonomy.version === "1.0",
  "Invalid taxonomy version."
);

assert(
  Array.isArray(classificationTaxonomy.categories),
  "Taxonomy categories must be an array."
);

assert(
  classificationTaxonomy.categories.length === 20,
  "The taxonomy must contain 20 categories."
);

assert(
  classificationTaxonomy.categories.every(
    category => category instanceof ClassificationCategory
  ),
  "Every category must be a ClassificationCategory."
);

const categoryIds = classificationTaxonomy.categories.map(
  category => category.id
);

assert(
  new Set(categoryIds).size === categoryIds.length,
  "Category ids must be unique."
);

const referenceCategory = classificationTaxonomy.categories.find(
  category => category.id === "reference"
);

assert(
  Boolean(referenceCategory),
  "The reference root category must exist."
);

const operationalCategory = classificationTaxonomy.categories.find(
  category => category.id === "operational"
);

assert(
  Boolean(operationalCategory),
  "The operational root category must exist."
);

const childCategories = classificationTaxonomy.categories.filter(
  category => category.parentId !== null
);

assert(
  childCategories.every(category =>
    categoryIds.includes(category.parentId)
  ),
  "Every parentId must reference an existing category."
);

assert(
  classificationTaxonomy.categories.every(category =>
    Array.isArray(category.aliases)
  ),
  "Every category aliases property must be an array."
);

assert(
  classificationTaxonomy.categories.every(category =>
    Array.isArray(category.keywords)
  ),
  "Every category keywords property must be an array."
);

assert(
  classificationTaxonomy.categories.every(category =>
    category.active === true
  ),
  "Every configured category must be active."
);

assert(
  classificationTaxonomy.metadata.domain === "PPS",
  "Invalid taxonomy domain."
);

assert(
  classificationTaxonomy.metadata.language === "fr",
  "Invalid taxonomy language."
);

console.log("ClassificationTaxonomy.test.js validated.");