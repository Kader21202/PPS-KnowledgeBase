const fs = require("fs");
const path = require("path");

class KnowledgeScanner {
  scan(directoryPath) {
    const absoluteDir = path.resolve(directoryPath);
    const results = [];

    this.walk(absoluteDir, results);

    return results;
  }

  walk(currentPath, results) {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentPath, entry.name);

      if (entry.isDirectory()) {
        this.walk(fullPath, results);
      }

      if (entry.isFile() && entry.name.toLowerCase().endsWith(".txt")) {
        results.push(fullPath);
      }
    }
  }
}

module.exports = { KnowledgeScanner };