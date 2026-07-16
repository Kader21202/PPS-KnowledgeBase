const {
  ExactDuplicateGroup
} = require(
  "../contracts/ExactDuplicateGroup"
);

class ExactDuplicateDetector {
  detect({
    metadataList = []
  } = {}) {
    const normalizedMetadata =
      Array.isArray(
        metadataList
      )
        ? metadataList
        : [];

    const groupsByChecksum =
      new Map();

    for (const metadata of normalizedMetadata) {
      if (
        !metadata ||
        typeof metadata !==
          "object"
      ) {
        continue;
      }

      const checksum =
        typeof metadata.checksum ===
          "string"
          ? metadata.checksum.trim()
          : "";

      const documentId =
        typeof metadata.documentId ===
          "string"
          ? metadata.documentId.trim()
          : "";

      if (
        !checksum ||
        !documentId
      ) {
        continue;
      }

      if (
        !groupsByChecksum.has(
          checksum
        )
      ) {
        groupsByChecksum.set(
          checksum,
          []
        );
      }

      groupsByChecksum
        .get(checksum)
        .push(documentId);
    }

    const duplicateGroups = [];

    for (
      const [
        checksum,
        documentIds
      ] of groupsByChecksum.entries()
    ) {
      const uniqueDocumentIds =
        [...new Set(documentIds)];

      if (
        uniqueDocumentIds.length <
        2
      ) {
        continue;
      }

      duplicateGroups.push(
        new ExactDuplicateGroup({
          checksum,

          documentIds:
            uniqueDocumentIds,

          count:
            uniqueDocumentIds.length,

          metadata: {
            detector:
              "ExactDuplicateDetector"
          }
        })
      );
    }

    return duplicateGroups.sort(
      (left, right) =>
        right.count -
        left.count
    );
  }

  hasDuplicates({
    metadataList = []
  } = {}) {
    return (
      this.detect({
        metadataList
      }).length > 0
    );
  }
}

module.exports = {
  ExactDuplicateDetector
};