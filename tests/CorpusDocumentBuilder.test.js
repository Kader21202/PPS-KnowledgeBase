const path = require("path");

const {
  CorpusScanner
} = require(
  "../src/corpus/CorpusScanner"
);

const {
  CorpusFileAnalyzer
} = require(
  "../src/analyzers/CorpusFileAnalyzer"
);

const {
  CorpusDocumentBuilder
} = require(
  "../src/builders/CorpusDocumentBuilder"
);

const {
  CorpusDocument
} = require(
  "../src/contracts/CorpusDocument"
);

const corpusPath =
  path.resolve(
    "C:/Users/HP/Desktop/PPS-Maroc.ia/data/pps_knowledge"
  );

const scanner =
  new CorpusScanner();

const files =
  scanner.scan(
    corpusPath
  );

const analyzer =
  new CorpusFileAnalyzer();

const analyses =
  analyzer.analyzeAll({
    rootDirectory:
      corpusPath,

    files
  });

const builder =
  new CorpusDocumentBuilder();

const documents =
  builder.buildAll({
    analyses,

    idPrefix:
      "CDOC",

    source:
      "PPS-Maroc.ia"
  });

console.log(
  Array.isArray(
    documents
  )
);

console.log(
  documents.length ===
    153
);

console.log(
  documents.every(
    document =>
      document instanceof
        CorpusDocument
  )
);

console.log(
  documents[0].id ===
    "CDOC-000001"
);

console.log(
  documents[
    documents.length - 1
  ].id ===
    "CDOC-000153"
);

console.log(
  new Set(
    documents.map(
      document =>
        document.id
    )
  ).size ===
    documents.length
);

console.log(
  documents.every(
    document =>
      document.source ===
        "PPS-Maroc.ia"
  )
);

console.log(
  documents.every(
    document =>
      document.metadata.builder ===
        "CorpusDocumentBuilder"
  )
);

console.log(
  documents.every(
    document =>
      document.metadata
        .technicalAnalysis
  )
);

console.log(
  documents.some(
    document =>
      document.name ===
        "index.json"
  )
);

console.log(
  documents.some(
    document =>
      document.name ===
        "histoire_ali_yata_pcm_pls_pps.txt"
  )
);

console.log(
  documents.some(
    document =>
      document.category ===
        "01_IDENTITE_DU_PPS"
  )
);

console.log(
  documents.some(
    document =>
      document.category ===
        "27_CONGRES_PPS"
  )
);

console.log(
  documents.every(
    document =>
      typeof document.importedAt ===
        "string"
  )
);

console.log(
  documents.every(
    document =>
      typeof document.hasCategory() ===
        "boolean"
  )
);

console.log(
  documents.every(
    document =>
      typeof document.hasExtension() ===
        "boolean"
  )
);

console.log(
  documents.every(
    document =>
      typeof document.isRootDocument() ===
        "boolean"
  )
);

console.log(
  documents.filter(
    document =>
      document.isRootDocument()
  ).length ===
    2
);

console.log(
  "✅ V1-005 CorpusDocumentBuilder validé"
);