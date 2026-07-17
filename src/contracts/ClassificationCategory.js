class ClassificationCategory {
  constructor({
    id,
    label,
    family,
    parentId = null,
    aliases = [],
    keywords = [],
    description = "",
    active = true,
    metadata = {}
  } = {}) {
    if (!id || typeof id !== "string") {
      throw new Error(
        "ClassificationCategory requires a valid id."
      );
    }

    if (!label || typeof label !== "string") {
      throw new Error(
        "ClassificationCategory requires a valid label."
      );
    }

    if (!family || typeof family !== "string") {
      throw new Error(
        "ClassificationCategory requires a valid family."
      );
    }

    if (!Array.isArray(aliases)) {
      throw new Error(
        "ClassificationCategory aliases must be an array."
      );
    }

    if (!Array.isArray(keywords)) {
      throw new Error(
        "ClassificationCategory keywords must be an array."
      );
    }

    this.id = id;
    this.label = label;
    this.family = family;
    this.parentId = parentId;
    this.aliases = aliases;
    this.keywords = keywords;
    this.description = description;
    this.active = active;
    this.metadata = metadata;
  }
}

module.exports = {
  ClassificationCategory
};