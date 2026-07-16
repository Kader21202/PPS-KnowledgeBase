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
  CorpusFileAnalysis
} = require(
  "../src/contracts/CorpusFileAnalysis"
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

    files,

    veryShortThreshold:
      100
  });

console.log(
  Array.isArray(
    analyses
  )
);

console.log(
  analyses.length ===
    153
);

console.log(
  analyses.every(
    analysis =>
      analysis instanceof
        CorpusFileAnalysis
  )
);

console.log(
  analyses.every(
    analysis =>
      typeof analysis.relativePath ===
        "string"
  )
);

console.log(
  analyses.every(
    analysis =>
      typeof analysis.isEmpty ===
        "boolean"
  )
);

console.log(
  analyses.every(
    analysis =>
      typeof analysis.isVeryShort ===
        "boolean"
  )
);

console.log(
  analyses.every(
    analysis =>
      typeof analysis.hasExtension ===
        "boolean"
  )
);

console.log(
  analyses.every(
    analysis =>
      typeof analysis.isRootFile ===
        "boolean"
  )
);

console.log(
  analyses.filter(
    analysis =>
      analysis.isRootFile
  ).length ===
    2
);

console.log(
  analyses.filter(
    analysis =>
      !analysis.hasExtension
  ).length ===
    2
);

console.log(
  analyses.some(
    analysis =>
      analysis.name ===
        "index.json" &&
      analysis.isRootFile
  )
);

console.log(
  analyses.some(
    analysis =>
      analysis.name ===
        "histoire_ali_yata_pcm_pls_pps.txt" &&
      analysis.isRootFile
  )
);

console.log(
  analyses.some(
    analysis =>
      analysis.category ===
        "01_IDENTITE_DU_PPS"
  )
);

console.log(
  analyses.some(
    analysis =>
      analysis.category ===
        "02_CONGRES_PPS"
  )
);

console.log(
  analyses.some(
    analysis =>
      analysis.category ===
        "27_CONGRES_PPS"
  )
);

console.log(
  analyses.every(
    analysis =>
      analysis.metadata.analyzer ===
        "CorpusFileAnalyzer"
  )
);

console.log(
  analyses.every(
    analysis =>
      analysis.metadata
        .veryShortThreshold ===
        100
  )
);

console.log(
  analyses.some(
    analysis =>
      analysis.subcategories
        .length > 0
  )
);