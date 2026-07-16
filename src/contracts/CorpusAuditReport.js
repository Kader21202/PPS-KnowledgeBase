class CorpusAuditReport {
  constructor({
    totalFiles = 0,
    totalCategories = 0,
    rootFiles = 0,
    filesWithoutExtension = 0,
    emptyFiles = 0,
    veryShortFiles = 0,
    filesByExtension = {},
    filesByCategory = {},
    alerts = [],
    auditedAt = null,
    metadata = {}
  } = {}) {
    this.totalFiles =
      totalFiles;

    this.totalCategories =
      totalCategories;

    this.rootFiles =
      rootFiles;

    this.filesWithoutExtension =
      filesWithoutExtension;

    this.emptyFiles =
      emptyFiles;

    this.veryShortFiles =
      veryShortFiles;

    this.filesByExtension =
      filesByExtension &&
      typeof filesByExtension ===
        "object"
        ? {
            ...filesByExtension
          }
        : {};

    this.filesByCategory =
      filesByCategory &&
      typeof filesByCategory ===
        "object"
        ? {
            ...filesByCategory
          }
        : {};

    this.alerts =
      Array.isArray(alerts)
        ? [...alerts]
        : [];

    this.auditedAt =
      auditedAt ||
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

  alertCount() {
    return this.alerts.length;
  }

  hasAlerts() {
    return this.alerts.length > 0;
  }
}

module.exports = {
  CorpusAuditReport
};