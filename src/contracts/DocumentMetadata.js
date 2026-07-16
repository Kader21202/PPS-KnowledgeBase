class DocumentMetadata {
  constructor({
    documentId = "",
    characterCount = 0,
    wordCount = 0,
    lineCount = 0,
    paragraphCount = 0,
    urls = [],
    declaredTitle = null,
    declaredAuthor = null,
    declaredOrganization = null,
    declaredDate = null,
    encoding = "utf8",
    checksum = "",
    extractedAt = null,
    metadata = {}
  } = {}) {
    this.documentId =
      documentId;

    this.characterCount =
      characterCount;

    this.wordCount =
      wordCount;

    this.lineCount =
      lineCount;

    this.paragraphCount =
      paragraphCount;

    this.urls =
      Array.isArray(urls)
        ? [...urls]
        : [];

    this.declaredTitle =
      declaredTitle;

    this.declaredAuthor =
      declaredAuthor;

    this.declaredOrganization =
      declaredOrganization;

    this.declaredDate =
      declaredDate;

    this.encoding =
      encoding;

    this.checksum =
      checksum;

    this.extractedAt =
      extractedAt ||
      new Date().toISOString();

    this.metadata =
      metadata &&
      typeof metadata ===
        "object"
        ? {
            ...metadata
          }
        : {};
  }

  hasUrls() {
    return this.urls.length > 0;
  }

  hasDeclaredTitle() {
    return Boolean(
      this.declaredTitle
    );
  }

  hasDeclaredAuthor() {
    return Boolean(
      this.declaredAuthor
    );
  }

  hasDeclaredDate() {
    return Boolean(
      this.declaredDate
    );
  }

  isEmpty() {
    return (
      this.characterCount === 0
    );
  }
}

module.exports = {
  DocumentMetadata
};