const fs = require("fs");
const crypto = require("crypto");

const {
  DocumentMetadata
} = require(
  "../contracts/DocumentMetadata"
);

class DocumentMetadataExtractor {
  extract({
    document,
    encoding = "utf8"
  } = {}) {
    if (
      !document ||
      typeof document !==
        "object"
    ) {
      throw new Error(
        "DocumentMetadataExtractor requires document."
      );
    }

    if (
      !document.path ||
      typeof document.path !==
        "string"
    ) {
      throw new Error(
        "DocumentMetadataExtractor requires document.path."
      );
    }

    if (
      !fs.existsSync(
        document.path
      )
    ) {
      throw new Error(
        "Document file not found."
      );
    }

    const content =
      fs.readFileSync(
        document.path,
        {
          encoding
        }
      );

    const normalizedContent =
      String(content || "")
        .replace(
          /\r\n/g,
          "\n"
        )
        .replace(
          /\r/g,
          "\n"
        );

    const characterCount =
      normalizedContent.length;

    const words =
      normalizedContent
        .trim()
        .split(/\s+/)
        .filter(Boolean);

    const lines =
      normalizedContent.length
        ? normalizedContent.split(
            "\n"
          )
        : [];

    const paragraphs =
      normalizedContent
        .split(/\n\s*\n/)
        .map(
          paragraph =>
            paragraph.trim()
        )
        .filter(Boolean);

    const urls =
      this.extractUrls(
        normalizedContent
      );

    const declaredTitle =
      this.extractDeclaredField({
        content:
          normalizedContent,

        labels: [
          "titre",
          "title"
        ]
      });

    const declaredAuthor =
      this.extractDeclaredField({
        content:
          normalizedContent,

        labels: [
          "auteur",
          "author"
        ]
      });

    const declaredOrganization =
      this.extractDeclaredField({
        content:
          normalizedContent,

        labels: [
          "organisation",
          "organization",
          "organisme"
        ]
      });

    const declaredDate =
      this.extractDeclaredField({
        content:
          normalizedContent,

        labels: [
          "date",
          "date de publication",
          "publication date"
        ]
      });

    const checksum =
      crypto
        .createHash(
          "sha256"
        )
        .update(
          normalizedContent,
          "utf8"
        )
        .digest(
          "hex"
        );

    return new DocumentMetadata({
      documentId:
        document.id || "",

      characterCount,

      wordCount:
        words.length,

      lineCount:
        lines.length,

      paragraphCount:
        paragraphs.length,

      urls,

      declaredTitle,

      declaredAuthor,

      declaredOrganization,

      declaredDate,

      encoding,

      checksum,

      metadata: {
        extractor:
          "DocumentMetadataExtractor",

        sourcePath:
          document.path
      }
    });
  }

  extractAll({
    documents = [],
    encoding = "utf8"
  } = {}) {
    const normalizedDocuments =
      Array.isArray(documents)
        ? documents
        : [];

    return normalizedDocuments.map(
      document =>
        this.extract({
          document,
          encoding
        })
    );
  }

  extractUrls(
    content
  ) {
    const matches =
      String(content || "")
        .match(
          /https?:\/\/[^\s<>"')\]]+/gi
        );

    return matches
      ? [...new Set(matches)]
      : [];
  }

  extractDeclaredField({
    content,
    labels = []
  } = {}) {
    const lines =
      String(content || "")
        .split("\n");

    for (const line of lines) {
      const trimmedLine =
        line.trim();

      for (const label of labels) {
        const pattern =
          new RegExp(
            `^${this.escapeRegExp(
              label
            )}\\s*[:=-]\\s*(.+)$`,
            "i"
          );

        const match =
          trimmedLine.match(
            pattern
          );

        if (
          match?.[1]
        ) {
          return match[1].trim();
        }
      }
    }

    return null;
  }

  escapeRegExp(
    value
  ) {
    return String(value || "")
      .replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      );
  }
}

module.exports = {
  DocumentMetadataExtractor
};