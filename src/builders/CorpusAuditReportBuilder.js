const {
  CorpusAuditReport
} = require(
  "../contracts/CorpusAuditReport"
);

class CorpusAuditReportBuilder {

  build({
    analyses = []
  } = {}) {

    const normalizedAnalyses =
      Array.isArray(analyses)
        ? analyses
        : [];

    const filesByExtension = {};
    const filesByCategory = {};

    let rootFiles = 0;
    let filesWithoutExtension = 0;
    let emptyFiles = 0;
    let veryShortFiles = 0;

    for (const analysis of normalizedAnalyses) {

      const extension =
        analysis.extension || "(none)";

      filesByExtension[extension] =
        (filesByExtension[extension] || 0) + 1;

      const category =
        analysis.category || "(root)";

      filesByCategory[category] =
        (filesByCategory[category] || 0) + 1;

      if (analysis.isRootFile) {
        rootFiles++;
      }

      if (!analysis.hasExtension) {
        filesWithoutExtension++;
      }

      if (analysis.isEmpty) {
        emptyFiles++;
      }

      if (analysis.isVeryShort) {
        veryShortFiles++;
      }

    }

    const alerts = [];

    if (rootFiles > 0) {
      alerts.push(
        `${rootFiles} root file(s)`
      );
    }

    if (filesWithoutExtension > 0) {
      alerts.push(
        `${filesWithoutExtension} file(s) without extension`
      );
    }

    if (emptyFiles > 0) {
      alerts.push(
        `${emptyFiles} empty file(s)`
      );
    }

    if (veryShortFiles > 0) {
      alerts.push(
        `${veryShortFiles} very short file(s)`
      );
    }

    return new CorpusAuditReport({

      totalFiles:
        normalizedAnalyses.length,

      totalCategories:
        Object.keys(
          filesByCategory
        ).filter(
          key =>
            key !== "(root)"
        ).length,

      rootFiles,

      filesWithoutExtension,

      emptyFiles,

      veryShortFiles,

      filesByExtension,

      filesByCategory,

      alerts,

      metadata: {

        builder:
          "CorpusAuditReportBuilder"

      }

    });

  }

}

module.exports = {
  CorpusAuditReportBuilder
};