class DocumentMetadataNormalizer {
  normalize(metadata = {}) {
    if (
      metadata === null ||
      typeof metadata !== "object" ||
      Array.isArray(metadata)
    ) {
      throw new Error(
        "DocumentMetadataNormalizer requires a metadata object."
      );
    }

    return {
      ...metadata,

      title: this.normalizeText(metadata.title),
      author: this.normalizeText(metadata.author),
      organization: this.normalizeOrganization(
        metadata.organization
      ),

      date: this.normalizeDate(metadata.date),

      language: this.normalizeLanguage(metadata.language),
      extension: this.normalizeExtension(metadata.extension),

      sourceUrl: this.normalizeUrl(metadata.sourceUrl),
      sourceDomain: this.normalizeDomain(
        metadata.sourceDomain ||
        metadata.sourceUrl
      ),

      category: this.normalizeIdentifier(metadata.category),

      tags: this.normalizeStringArray(metadata.tags),
      keywords: this.normalizeStringArray(metadata.keywords)
    };
  }

  normalizeText(value) {
    if (typeof value !== "string") {
      return null;
    }

    const normalized = value
      .replace(/\s+/g, " ")
      .trim();

    return normalized || null;
  }

  normalizeIdentifier(value) {
    const text = this.normalizeText(value);

    if (!text) {
      return null;
    }

    return text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || null;
  }

  normalizeOrganization(value) {
    const text = this.normalizeText(value);

    if (!text) {
      return null;
    }

    const comparableValue = text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[.\s-]+/g, "");

    const ppsAliases = new Set([
      "pps",
      "partiduprogresetdusocialisme"
    ]);

    if (ppsAliases.has(comparableValue)) {
      return "Parti du Progrès et du Socialisme";
    }

    return text;
  }

  normalizeDate(value) {
    if (
      value === null ||
      value === undefined ||
      value === ""
    ) {
      return null;
    }

    if (value instanceof Date) {
      if (Number.isNaN(value.getTime())) {
        return null;
      }

      return value.toISOString().slice(0, 10);
    }

    if (typeof value !== "string") {
      return null;
    }

    const text = value.trim();

    if (!text) {
      return null;
    }

    const isoMatch = text.match(
      /^(\d{4})-(\d{2})-(\d{2})$/
    );

    if (isoMatch) {
      const [, year, month, day] = isoMatch;

      return this.isValidDate(year, month, day)
        ? `${year}-${month}-${day}`
        : null;
    }

    const frenchMatch = text.match(
      /^(\d{1,2})[\/.-](\d{1,2})[\/.-](\d{4})$/
    );

    if (frenchMatch) {
      const [, rawDay, rawMonth, year] = frenchMatch;

      const day = rawDay.padStart(2, "0");
      const month = rawMonth.padStart(2, "0");

      return this.isValidDate(year, month, day)
        ? `${year}-${month}-${day}`
        : null;
    }

    return null;
  }

  isValidDate(year, month, day) {
    const normalizedYear = Number(year);
    const normalizedMonth = Number(month);
    const normalizedDay = Number(day);

    const date = new Date(
      Date.UTC(
        normalizedYear,
        normalizedMonth - 1,
        normalizedDay
      )
    );

    return (
      date.getUTCFullYear() === normalizedYear &&
      date.getUTCMonth() === normalizedMonth - 1 &&
      date.getUTCDate() === normalizedDay
    );
  }

  normalizeLanguage(value) {
    const text = this.normalizeText(value);

    if (!text) {
      return null;
    }

    const normalized = text.toLowerCase();

    const languages = {
      fr: "fr",
      fra: "fr",
      french: "fr",
      francais: "fr",
      français: "fr",

      ar: "ar",
      ara: "ar",
      arabe: "ar",
      arabic: "ar",

      en: "en",
      eng: "en",
      english: "en",
      anglais: "en"
    };

    return languages[normalized] || normalized;
  }

  normalizeExtension(value) {
    const text = this.normalizeText(value);

    if (!text) {
      return null;
    }

    const extension = text
      .toLowerCase()
      .replace(/^\.+/, "");

    return extension ? `.${extension}` : null;
  }

  normalizeUrl(value) {
    const text = this.normalizeText(value);

    if (!text) {
      return null;
    }

    try {
      const url = new URL(text);

      url.hash = "";

      return url.toString();
    } catch {
      return null;
    }
  }

  normalizeDomain(value) {
    const text = this.normalizeText(value);

    if (!text) {
      return null;
    }

    try {
      const url = text.includes("://")
        ? new URL(text)
        : new URL(`https://${text}`);

      return url.hostname
        .toLowerCase()
        .replace(/^www\./, "");
    } catch {
      return null;
    }
  }

  normalizeStringArray(values) {
    if (!Array.isArray(values)) {
      return [];
    }

    const normalizedValues = values
      .map(value => this.normalizeText(value))
      .filter(Boolean);

    return [...new Set(normalizedValues)];
  }
}

module.exports = {
  DocumentMetadataNormalizer
};