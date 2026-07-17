const {
  DocumentMetadataNormalizer
} = require("../src/normalizers/DocumentMetadataNormalizer");

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }

  console.log(true);
}

const normalizer = new DocumentMetadataNormalizer();

const input = {
  title: "  Communiqué   du Bureau politique  ",
  author: "  PPS Maroc  ",
  organization: "P.P.S.",
  date: "7/5/2025",
  language: "Français",
  extension: "TXT",
  sourceUrl: "https://www.pps.ma/document#section",
  category: "Positions officielles",
  tags: [
    " élections ",
    "PPS",
    "élections"
  ],
  keywords: [
    " scrutin ",
    "campagne",
    "scrutin"
  ],
  customField: "preserved"
};

const result = normalizer.normalize(input);

assert(
  result !== input,
  "normalize() must return a new object."
);

assert(
  result.title === "Communiqué du Bureau politique",
  "The title must be normalized."
);

assert(
  result.author === "PPS Maroc",
  "The author must be normalized."
);

assert(
  result.organization ===
    "Parti du Progrès et du Socialisme",
  "The PPS organization alias must be normalized."
);

assert(
  result.date === "2025-05-07",
  "The French date must be converted to ISO format."
);

assert(
  result.language === "fr",
  "The language must be normalized."
);

assert(
  result.extension === ".txt",
  "The extension must be normalized."
);

assert(
  result.sourceUrl === "https://www.pps.ma/document",
  "The URL fragment must be removed."
);

assert(
  result.sourceDomain === "pps.ma",
  "The source domain must be normalized."
);

assert(
  result.category === "positions-officielles",
  "The category must become a normalized identifier."
);

assert(
  Array.isArray(result.tags),
  "Tags must be an array."
);

assert(
  result.tags.length === 2,
  "Duplicate tags must be removed."
);

assert(
  result.tags[0] === "élections",
  "Tag spaces must be removed."
);

assert(
  result.tags[1] === "PPS",
  "Tag order must be preserved."
);

assert(
  result.keywords.length === 2,
  "Duplicate keywords must be removed."
);

assert(
  result.customField === "preserved",
  "Unknown metadata properties must be preserved."
);

assert(
  input.title ===
    "  Communiqué   du Bureau politique  ",
  "The original metadata object must not be modified."
);

assert(
  normalizer.normalizeDate("2025-02-29") === null,
  "An invalid ISO date must return null."
);

assert(
  normalizer.normalizeDate("29/02/2024") ===
    "2024-02-29",
  "A valid leap-year date must be accepted."
);

assert(
  normalizer.normalizeDate("31/04/2025") === null,
  "An impossible date must return null."
);

assert(
  normalizer.normalizeLanguage("ARABE") === "ar",
  "Arabic must be normalized to ar."
);

assert(
  normalizer.normalizeLanguage("English") === "en",
  "English must be normalized to en."
);

assert(
  normalizer.normalizeExtension(".PDF") === ".pdf",
  "An existing dot must not be duplicated."
);

assert(
  normalizer.normalizeIdentifier(
    "  Organisations parallèles "
  ) === "organisations-paralleles",
  "Identifiers must be lowercase, unaccented and hyphenated."
);

assert(
  normalizer.normalizeUrl("not a url") === null,
  "An invalid URL must return null."
);

assert(
  normalizer.normalizeDomain("www.pps.ma") === "pps.ma",
  "www must be removed from domains."
);

assert(
  normalizer.normalizeStringArray(null).length === 0,
  "A non-array value must produce an empty array."
);

let invalidMetadataRejected = false;

try {
  normalizer.normalize(null);
} catch (error) {
  invalidMetadataRejected =
    error.message ===
    "DocumentMetadataNormalizer requires a metadata object.";
}

assert(
  invalidMetadataRejected,
  "Null metadata must be rejected."
);

console.log(
  "DocumentMetadataNormalizer.test.js validated."
);