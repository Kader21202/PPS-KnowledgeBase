class CorpusDocument {
  constructor({
    id = "",

    name = "",

    path = "",

    relativePath = "",

    extension = "",

    category = null,

    subcategories = [],

    size = 0,

    source = null,

    importedAt = null,

    metadata = {}

  } = {}) {

    this.id =
      id;

    this.name =
      name;

    this.path =
      path;

    this.relativePath =
      relativePath;

    this.extension =
      extension;

    this.category =
      category;

    this.subcategories =
      Array.isArray(subcategories)
        ? [...subcategories]
        : [];

    this.size =
      size;

    this.source =
      source;

    this.importedAt =
      importedAt ||
      new Date().toISOString();

    this.metadata =
      metadata &&
      typeof metadata === "object"
        ? { ...metadata }
        : {};
  }

  hasCategory() {
    return Boolean(
      this.category
    );
  }

  hasExtension() {
    return this.extension.length > 0;
  }

  isRootDocument() {
    return (
      this.category === null
    );
  }

}

module.exports = {
  CorpusDocument
};