const path = require("path");

const {
  CorpusFileAnalysis
} = require(
  "../contracts/CorpusFileAnalysis"
);

class CorpusFileAnalyzer {
  analyze({
    rootDirectory,
    file,
    veryShortThreshold = 100
  } = {}) {
    if (!rootDirectory) {
      throw new Error(
        "CorpusFileAnalyzer requires rootDirectory."
      );
    }

    if (
      !file ||
      typeof file !== "object"
    ) {
      throw new Error(
        "CorpusFileAnalyzer requires file."
      );
    }

    if (
      typeof file.path !==
        "string"
    ) {
      throw new Error(
        "CorpusFileAnalyzer requires file.path."
      );
    }

    const relativePath =
      path.relative(
        rootDirectory,
        file.path
      );

    const parts =
      relativePath
        .split(path.sep)
        .filter(Boolean);

    const isRootFile =
      parts.length === 1;

    const category =
      isRootFile
        ? null
        : parts[0];

    const subcategories =
      isRootFile
        ? []
        : parts.slice(
            1,
            -1
          );

    const size =
      typeof file.size ===
        "number"
        ? file.size
        : 0;

    const extension =
      typeof file.extension ===
        "string"
        ? file.extension
        : path.extname(
            file.name || ""
          );

    return new CorpusFileAnalysis({
      path:
        file.path,

      relativePath,

      name:
        file.name || "",

      extension,

      size,

      category,

      subcategories,

      isEmpty:
        size === 0,

      isVeryShort:
        size > 0 &&
        size <
          veryShortThreshold,

      hasExtension:
        extension.length > 0,

      isRootFile,

      metadata: {
        analyzer:
          "CorpusFileAnalyzer",

        veryShortThreshold
      }
    });
  }

  analyzeAll({
    rootDirectory,
    files = [],
    veryShortThreshold = 100
  } = {}) {
    const normalizedFiles =
      Array.isArray(files)
        ? files
        : [];

    return normalizedFiles.map(
      file =>
        this.analyze({
          rootDirectory,
          file,
          veryShortThreshold
        })
    );
  }
}

module.exports = {
  CorpusFileAnalyzer
};