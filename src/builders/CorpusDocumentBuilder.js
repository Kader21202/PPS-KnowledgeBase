const {
  CorpusDocument
} = require(
  "../contracts/CorpusDocument"
);

class CorpusDocumentBuilder {
  build({
    analysis,
    id = "",
    source = null
  } = {}) {
    if (
      !analysis ||
      typeof analysis !==
        "object"
    ) {
      throw new Error(
        "CorpusDocumentBuilder requires analysis."
      );
    }

    if (
      typeof analysis.path !==
        "string"
    ) {
      throw new Error(
        "CorpusDocumentBuilder requires analysis.path."
      );
    }

    return new CorpusDocument({
      id,

      name:
        analysis.name || "",

      path:
        analysis.path,

      relativePath:
        analysis.relativePath || "",

      extension:
        analysis.extension || "",

      category:
        analysis.category ?? null,

      subcategories:
        analysis.subcategories,

      size:
        typeof analysis.size ===
          "number"
          ? analysis.size
          : 0,

      source,

      metadata: {
        builder:
          "CorpusDocumentBuilder",

        technicalAnalysis:
          analysis
      }
    });
  }

  buildAll({
    analyses = [],
    idPrefix = "CDOC",
    source = null
  } = {}) {
    const normalizedAnalyses =
      Array.isArray(analyses)
        ? analyses
        : [];

    return normalizedAnalyses.map(
      (analysis, index) =>
        this.build({
          analysis,

          id:
            `${idPrefix}-${String(
              index + 1
            ).padStart(
              6,
              "0"
            )}`,

          source
        })
    );
  }
}

module.exports = {
  CorpusDocumentBuilder
};