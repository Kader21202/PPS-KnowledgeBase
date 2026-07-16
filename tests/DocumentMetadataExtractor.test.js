const fs = require("fs");
const os = require("os");
const path = require("path");

const {
  CorpusDocument
} = require(
  "../src/contracts/CorpusDocument"
);

const {
  DocumentMetadata
} = require(
  "../src/contracts/DocumentMetadata"
);

const {
  DocumentMetadataExtractor
} = require(
  "../src/extractors/DocumentMetadataExtractor"
);

const temporaryDirectory =
  fs.mkdtempSync(
    path.join(
      os.tmpdir(),
      "pps-document-metadata-"
    )
  );

const temporaryFilePath =
  path.join(
    temporaryDirectory,
    "document-test.txt"
  );

const content = [
  "Titre : Histoire générale du PPS",
  "Auteur : Équipe documentaire",
  "Organisation : PPS",
  "Date : 16 juillet 2026",
  "",
  "Ce document présente un exemple de contenu.",
  "Il contient une URL officielle : https://example.org/document",
  "",
  "Deuxième paragraphe.",
  "Même URL : https://example.org/document"
].join("\n");

fs.writeFileSync(
  temporaryFilePath,
  content,
  {
    encoding: "utf8"
  }
);

const document =
  new CorpusDocument({
    id:
      "CDOC-TEST-000001",

    name:
      "document-test.txt",

    path:
      temporaryFilePath,

    relativePath:
      "tests/document-test.txt",

    extension:
      ".txt",

    category:
      "TEST",

    size:
      Buffer.byteLength(
        content,
        "utf8"
      ),

    source:
      "TEST"
  });

const extractor =
  new DocumentMetadataExtractor();

const metadata =
  extractor.extract({
    document
  });

console.log(
  metadata instanceof
    DocumentMetadata
);

console.log(
  metadata.documentId ===
    "CDOC-TEST-000001"
);

console.log(
  metadata.characterCount ===
    content.length
);

console.log(
  metadata.wordCount >
    0
);

console.log(
  metadata.lineCount ===
    10
);

console.log(
  metadata.paragraphCount ===
    3
);

console.log(
  metadata.urls.length ===
    1
);

console.log(
  metadata.urls[0] ===
    "https://example.org/document"
);

console.log(
  metadata.declaredTitle ===
    "Histoire générale du PPS"
);

console.log(
  metadata.declaredAuthor ===
    "Équipe documentaire"
);

console.log(
  metadata.declaredOrganization ===
    "PPS"
);

console.log(
  metadata.declaredDate ===
    "16 juillet 2026"
);

console.log(
  metadata.encoding ===
    "utf8"
);

console.log(
  typeof metadata.checksum ===
    "string" &&
  metadata.checksum.length ===
    64
);

console.log(
  metadata.metadata.extractor ===
    "DocumentMetadataExtractor"
);

console.log(
  metadata.metadata.sourcePath ===
    temporaryFilePath
);

console.log(
  metadata.hasUrls()
);

console.log(
  metadata.hasDeclaredTitle()
);

console.log(
  metadata.hasDeclaredAuthor()
);

console.log(
  metadata.hasDeclaredDate()
);

console.log(
  metadata.isEmpty() ===
    false
);

const secondMetadata =
  extractor.extract({
    document
  });

console.log(
  secondMetadata.checksum ===
    metadata.checksum
);

const emptyFilePath =
  path.join(
    temporaryDirectory,
    "empty.txt"
  );

fs.writeFileSync(
  emptyFilePath,
  "",
  {
    encoding: "utf8"
  }
);

const emptyDocument =
  new CorpusDocument({
    id:
      "CDOC-TEST-EMPTY",

    name:
      "empty.txt",

    path:
      emptyFilePath,

    extension:
      ".txt",

    size:
      0
  });

const emptyMetadata =
  extractor.extract({
    document:
      emptyDocument
  });

console.log(
  emptyMetadata.isEmpty()
);

console.log(
  emptyMetadata.wordCount ===
    0
);

console.log(
  emptyMetadata.lineCount ===
    0
);

console.log(
  emptyMetadata.paragraphCount ===
    0
);

fs.rmSync(
  temporaryDirectory,
  {
    recursive: true,
    force: true
  }
);

console.log(
  !fs.existsSync(
    temporaryDirectory
  )
);

console.log(
  "✅ V1-006 DocumentMetadataExtractor validé"
);