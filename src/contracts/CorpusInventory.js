class CorpusInventory {
  constructor({
    rootDirectory = "",
    scannedAt = null,
    totalFiles = 0,
    totalDirectories = 0,
    categories = [],
    files = [],
    metadata = {}
  } = {}) {

    this.rootDirectory =
      rootDirectory;

    this.scannedAt =
      scannedAt ||
      new Date().toISOString();

    this.totalFiles =
      totalFiles;

    this.totalDirectories =
      totalDirectories;

    this.categories =
      Array.isArray(categories)
        ? [...categories]
        : [];

    this.files =
      Array.isArray(files)
        ? [...files]
        : [];

    this.metadata =
      metadata &&
      typeof metadata ===
        "object"
        ? {
            ...metadata
          }
        : {};
  }

  fileCount() {
    return this.files.length;
  }

  categoryCount() {
    return this.categories.length;
  }
}

module.exports = {
  CorpusInventory
};