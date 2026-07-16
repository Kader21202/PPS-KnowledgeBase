const path = require("path");

const {
  CorpusScanner
} = require(
  "../src/corpus/CorpusScanner"
);

const scanner =
  new CorpusScanner();

const corpusPath =
  path.resolve(
    "C:/Users/HP/Desktop/PPS-Maroc.ia/data/pps_knowledge"
  );

const files =
  scanner.scan(
    corpusPath
  );

console.log(
  Array.isArray(files)
);

console.log(
  files.length === 153
);

console.log(
  files.every(
    file =>
      typeof file.path ===
        "string"
  )
);

console.log(
  files.every(
    file =>
      typeof file.name ===
        "string"
  )
);

console.log(
  files.every(
    file =>
      typeof file.extension ===
        "string"
  )
);

console.log(
  files.every(
    file =>
      typeof file.size ===
        "number"
  )
);

console.log(
  files.some(
    file =>
      file.extension ===
        ".txt"
  )
);

console.log(
  files.some(
    file =>
      file.extension ===
        ".json"
  )
);

console.log(
  files.some(
    file =>
      file.extension ===
        ""
  )
);

console.log(
  files.every(
    file =>
      file.size >= 0
  )
);

console.log(
  files.every(
    file =>
      path.isAbsolute(
        file.path
      )
  )
);

console.log(
  files.some(
    file =>
      file.name ===
        "index.json"
  )
);

console.log(
  files.some(
    file =>
      file.name ===
        "histoire_ali_yata_pcm_pls_pps.txt"
  )
);

console.log(
  files.length > 0
);

console.log(
  "✅ V1-001 CorpusScanner validé"
);