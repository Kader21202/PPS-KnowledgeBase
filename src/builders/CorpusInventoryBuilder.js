const {
  CorpusInventory
} = require(
  "../contracts/CorpusInventory"
);

class CorpusInventoryBuilder {

  build({

    rootDirectory,

    files = []

  } = {}) {

    if (!rootDirectory) {
      throw new Error(
        "CorpusInventoryBuilder requires rootDirectory."
      );
    }

    const categories =
      this.extractCategories(
        files
      );

    return new CorpusInventory({

      rootDirectory,

      totalFiles:
        files.length,

      totalDirectories:
        categories.length,

      categories,

      files,

      metadata: {

        builder:
          "CorpusInventoryBuilder"

      }

    });

  }

  extractCategories(
    files
  ) {

    const categories =
      new Set();

    for (const file of files) {

      const relative =
        file.path.replace(
          /\\/g,
          "/"
        );

      const parts =
        relative.split("/");

      const index =
        parts.findIndex(
          part =>
            part ===
            "pps_knowledge"
        );

      if (
        index >= 0 &&
        parts[index + 1]
      ) {
        categories.add(
          parts[index + 1]
        );
      }

    }

    return [
      ...categories
    ].sort();

  }

}

module.exports = {
  CorpusInventoryBuilder
};