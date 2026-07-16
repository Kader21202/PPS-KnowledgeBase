class ExactDuplicateGroup {
  constructor({
    checksum = "",
    documentIds = [],
    count = 0,
    metadata = {}
  } = {}) {
    this.checksum =
      checksum;

    this.documentIds =
      Array.isArray(
        documentIds
      )
        ? [...documentIds]
        : [];

    this.count =
      count ||
      this.documentIds.length;

    this.metadata =
      metadata &&
      typeof metadata ===
        "object"
        ? {
            ...metadata
          }
        : {};
  }

  documentCount() {
    return this.documentIds.length;
  }

  isDuplicateGroup() {
    return (
      this.documentIds.length >
      1
    );
  }

  containsDocument(
    documentId
  ) {
    return this.documentIds.includes(
      documentId
    );
  }
}

module.exports = {
  ExactDuplicateGroup
};