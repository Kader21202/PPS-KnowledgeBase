const path = require("path");

const {
  CorpusScanner
} = require(
  "../src/corpus/CorpusScanner"
);

const {
  CorpusInventoryBuilder
} = require(
  "../src/builders/CorpusInventoryBuilder"
);

const {
  CorpusInventory
} = require(
  "../src/contracts/CorpusInventory"
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

const builder =
  new CorpusInventoryBuilder();

const inventory =
  builder.build({
    rootDirectory:
      corpusPath,

    files
  });

console.log(
  inventory instanceof
    CorpusInventory
);

console.log(
  inventory.rootDirectory ===
    corpusPath
);

console.log(
  inventory.totalFiles ===
    153
);

console.log(
  inventory.fileCount() ===
    153
);

console.log(
  Array.isArray(
    inventory.categories
  )
);

console.log(
  inventory.categories.length >
    0
);

console.log(
  inventory.categoryCount() ===
    inventory.categories.length
);

console.log(
  inventory.categories.includes(
    "01_IDENTITE_DU_PPS"
  )
);

console.log(
  inventory.categories.includes(
    "02_CONGRES_PPS"
  )
);

console.log(
  inventory.categories.includes(
    "27_CONGRES_PPS"
  )
);

console.log(
  inventory.categories.includes(
    "index.json"
  )
);

console.log(
  inventory.categories.includes(
    "histoire_ali_yata_pcm_pls_pps.txt"
  )
);

console.log(
  inventory.metadata.builder ===
    "CorpusInventoryBuilder"
);

console.log(
  typeof inventory.scannedAt ===
    "string"
);

console.log(
  inventory.files !==
    files
);
console.log(
  inventory.files.length ===
    files.length
);