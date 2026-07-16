const fs = require("fs");
const path = require("path");

class CorpusScanner {
  scan(directoryPath) {
    if (!directoryPath) {
      throw new Error(
        "CorpusScanner.scan requires directoryPath."
      );
    }

    if (
      !fs.existsSync(directoryPath)
    ) {
      throw new Error(
        "Corpus directory not found."
      );
    }

    return this.scanDirectory(
      directoryPath
    );
  }

  scanDirectory(directoryPath) {
    const entries =
      fs.readdirSync(
        directoryPath,
        {
          withFileTypes: true
        }
      );

    let files = [];

    for (const entry of entries) {
      const fullPath =
        path.join(
          directoryPath,
          entry.name
        );

      if (entry.isDirectory()) {
        files.push(
          ...this.scanDirectory(
            fullPath
          )
        );

        continue;
      }

      const stats =
        fs.statSync(fullPath);

      files.push({
        path: fullPath,
        name: entry.name,
        extension:
          path.extname(
            entry.name
          ),
        size:
          stats.size
      });
    }

    return files;
  }
}

module.exports = {
  CorpusScanner
};