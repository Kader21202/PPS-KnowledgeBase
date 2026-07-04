const pathModule = require("path");
const { Document } = require("../contracts/Document");

class DocumentFactory {
  create(file) {
    const filePath = file.path;
    const content = file.content;

    const fileName = pathModule.basename(filePath);
    const title = fileName.replace(pathModule.extname(fileName), "");

    return new Document({
      id: title,
      title,
      category: "unknown",
      type: "text",
      language: "fr",
      content,
      path: filePath,
      metadata: {}
    });
  }
}

module.exports = { DocumentFactory };