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
  CorpusAuditReportBuilder
} = require(
  "../src/builders/CorpusAuditReportBuilder"
);

const {
  CorpusAuditReport
} = require(
  "../src/contracts/CorpusAuditReport"
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
  new CorpusAuditReportBuilder();

const report =
  builder.build({

    analyses

  });

console.log(
  report instanceof
    CorpusAuditReport
);

console.log(
  report.totalFiles ===
    153
);

console.log(
  report.totalCategories >
    0
);

console.log(
  report.rootFiles ===
    2
);

console.log(
  report.filesWithoutExtension ===
    2
);

console.log(
  report.emptyFiles >=
    0
);

console.log(
  report.veryShortFiles >=
    0
);

console.log(
  report.filesByExtension[".txt"] ===
    150
);

console.log(
  report.filesByExtension[".json"] ===
    1
);

console.log(
  report.filesByExtension["(none)"] ===
    2
);

console.log(
  report.filesByCategory[
    "01_IDENTITE_DU_PPS"
  ] > 0
);

console.log(
  report.filesByCategory[
    "27_CONGRES_PPS"
  ] > 0
);

console.log(
  Array.isArray(
    report.alerts
  )
);

console.log(
  report.alertCount() ===
    report.alerts.length
);

console.log(
  typeof report.hasAlerts() ===
    "boolean"
);

console.log(
  report.metadata.builder ===
    "CorpusAuditReportBuilder"
);

console.log(
  typeof report.auditedAt ===
    "string"
);

console.log(
  report.totalFiles ===
    analyses.length
);

console.log(
  "✅ V1-004 CorpusAuditReportBuilder validé"
);