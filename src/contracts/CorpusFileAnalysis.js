class CorpusFileAnalysis {
  constructor({
    path = "",
    relativePath = "",
    name = "",
    extension = "",
    size = 0,
    category = null,
    subcategories = [],
    isEmpty = false,
    isVeryShort = false,
    hasExtension = false,
    isRootFile = false,
    metadata = {}
  } = {}) {
    this.path =
      path;

    this.relativePath =
      relativePath;

    this.name =
      name;

    this.extension =
      extension;

    this.size =
      size;

    this.category =
      category;

    this.subcategories =
      Array.isArray(
        subcategories
      )
        ? [...subcategories]
        : [];

    this.isEmpty =
      Boolean(isEmpty);

    this.isVeryShort =
      Boolean(isVeryShort);

    this.hasExtension =
      Boolean(hasExtension);

    this.isRootFile =
      Boolean(isRootFile);

    this.metadata =
      metadata &&
      typeof metadata ===
        "object"
        ? {
            ...metadata
          }
        : {};
  }
}

module.exports = {
  CorpusFileAnalysis
};