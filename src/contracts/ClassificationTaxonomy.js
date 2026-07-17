class ClassificationTaxonomy {
  constructor({
    id = "PPS-DOCUMENT-TAXONOMY",
    version = "1.0",
    categories = [],
    metadata = {}
  } = {}) {
    if (!id || typeof id !== "string") {
      throw new Error(
        "ClassificationTaxonomy requires a valid id."
      );
    }

    if (!version || typeof version !== "string") {
      throw new Error(
        "ClassificationTaxonomy requires a valid version."
      );
    }

    if (!Array.isArray(categories)) {
      throw new Error(
        "ClassificationTaxonomy categories must be an array."
      );
    }

    this.id = id;
    this.version = version;
    this.categories = categories;
    this.metadata = metadata;
  }
}

module.exports = {
  ClassificationTaxonomy
};