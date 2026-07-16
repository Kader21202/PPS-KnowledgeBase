const {
  DocumentMetadata
} = require(
  "../src/contracts/DocumentMetadata"
);

const {
  ExactDuplicateGroup
} = require(
  "../src/contracts/ExactDuplicateGroup"
);

const {
  ExactDuplicateDetector
} = require(
  "../src/analyzers/ExactDuplicateDetector"
);

const metadataList = [
  new DocumentMetadata({
    documentId:
      "CDOC-000001",

    checksum:
      "checksum-a"
  }),

  new DocumentMetadata({
    documentId:
      "CDOC-000002",

    checksum:
      "checksum-a"
  }),

  new DocumentMetadata({
    documentId:
      "CDOC-000003",

    checksum:
      "checksum-b"
  }),

  new DocumentMetadata({
    documentId:
      "CDOC-000004",

    checksum:
      "checksum-c"
  }),

  new DocumentMetadata({
    documentId:
      "CDOC-000005",

    checksum:
      "checksum-c"
  }),

  new DocumentMetadata({
    documentId:
      "CDOC-000006",

    checksum:
      "checksum-c"
  }),

  new DocumentMetadata({
    documentId:
      "CDOC-000007",

    checksum:
      "checksum-unique"
  }),

  new DocumentMetadata({
    documentId:
      "",

    checksum:
      "checksum-invalid"
  }),

  new DocumentMetadata({
    documentId:
      "CDOC-INVALID",

    checksum:
      ""
  }),

  null
];

const detector =
  new ExactDuplicateDetector();

const groups =
  detector.detect({
    metadataList
  });

console.log(
  Array.isArray(
    groups
  )
);

console.log(
  groups.length ===
    2
);

console.log(
  groups.every(
    group =>
      group instanceof
        ExactDuplicateGroup
  )
);

console.log(
  groups[0].checksum ===
    "checksum-c"
);

console.log(
  groups[0].count ===
    3
);

console.log(
  groups[0].documentCount() ===
    3
);

console.log(
  groups[0].isDuplicateGroup()
);

console.log(
  groups[0].containsDocument(
    "CDOC-000004"
  )
);

console.log(
  groups[0].containsDocument(
    "CDOC-000005"
  )
);

console.log(
  groups[0].containsDocument(
    "CDOC-000006"
  )
);

console.log(
  groups[1].checksum ===
    "checksum-a"
);

console.log(
  groups[1].count ===
    2
);

console.log(
  groups[1].documentCount() ===
    2
);

console.log(
  groups[1].containsDocument(
    "CDOC-000001"
  )
);

console.log(
  groups[1].containsDocument(
    "CDOC-000002"
  )
);

console.log(
  groups.every(
    group =>
      group.metadata.detector ===
        "ExactDuplicateDetector"
  )
);

console.log(
  detector.hasDuplicates({
    metadataList
  })
);

console.log(
  detector.hasDuplicates({
    metadataList: [
      new DocumentMetadata({
        documentId:
          "CDOC-UNIQUE-1",

        checksum:
          "unique-1"
      }),

      new DocumentMetadata({
        documentId:
          "CDOC-UNIQUE-2",

        checksum:
          "unique-2"
      })
    ]
  }) === false
);

const repeatedDocumentIdGroups =
  detector.detect({
    metadataList: [
      new DocumentMetadata({
        documentId:
          "CDOC-REPEATED",

        checksum:
          "same-checksum"
      }),

      new DocumentMetadata({
        documentId:
          "CDOC-REPEATED",

        checksum:
          "same-checksum"
      })
    ]
  });

console.log(
  repeatedDocumentIdGroups.length ===
    0
);

console.log(
  detector.detect({
    metadataList:
      null
  }).length ===
    0
);

console.log(
  "✅ V1-007 ExactDuplicateDetector validé"
);