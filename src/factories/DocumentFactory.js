const pathModule = require("path");
const crypto = require("crypto");
const { Document } = require("../contracts/Document");
const { DocumentParser } = require("../parsers/DocumentParser");

class DocumentFactory {
  constructor() {
    this.parser = new DocumentParser();
  }

  create(file) {
    const filePath = pathModule.resolve(file.path);
    const content = file.content;

    const fileName = pathModule.basename(filePath);
    const fallbackTitle = fileName.replace(
      pathModule.extname(fileName),
      ""
    );

    const normalizedPath = filePath
      .replace(/\\/g, "/")
      .toLowerCase();

    const pathFingerprint = crypto
      .createHash("sha256")
      .update(normalizedPath)
      .digest("hex")
      .slice(0, 12);

    const documentId =
      `${fallbackTitle}-${pathFingerprint}`;

    const parsed = this.parser.parse(content);

    return new Document({
      id: documentId,
      title: parsed.title || fallbackTitle,
      category: parsed.metadata.category || "unknown",
      type: parsed.metadata.type || "text",
      language: "fr",
      content,
      sections: parsed.sections,
      metadata: parsed.metadata,
      sources: parsed.sources,
      relations: [],
      path: filePath
    });
  }
}

module.exports = { DocumentFactory };
