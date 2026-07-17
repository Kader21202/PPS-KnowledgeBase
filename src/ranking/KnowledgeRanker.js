class KnowledgeRanker {
  rank({
    question,
    fragments = [],
    strategy = "definition"
  }) {
    const normalizedQuestion =
      this.normalize(question);

    const biographySubject =
      strategy === "biography"
        ? this.extractBiographySubject(question)
        : "";

    const rankedFragments = fragments.map(fragment => {
      const text = this.normalize(
        fragment.text || ""
      );

      const title = this.normalize(
        fragment.title || ""
      );

      const source = this.normalize(
        fragment.source ||
        fragment.id ||
        ""
      );

      let score = Number(
        fragment.retrievalScore ??
        fragment.score ??
        fragment.ranking?.baseScore ??
        0
      );

      if (strategy === "biography") {
        score += this.scoreBiographyFragment({
          subject: biographySubject,
          text,
          title,
          source
        });
      }

      if (strategy === "definition") {
        if (text.includes("fondateur")) {
          score += 0.4;
        }

        if (text.includes("fonde")) {
          score += 0.3;
        }

        if (text.includes("cree")) {
          score += 0.25;
        }

        if (text.includes("est le")) {
          score += 0.15;
        }
      }

      if (strategy === "chronology") {
        if (fragment.year) {
          score += 0.5;
        }

        if (/\b(19|20)\d{2}\b/.test(text)) {
          score += 0.25;
        }
      }

      if (strategy === "comparison") {
        const comparedSubjects =
          this.extractComparisonSubjects(question);

        for (const subject of comparedSubjects) {
          if (
            text.includes(subject) ||
            title.includes(subject) ||
            source.includes(subject)
          ) {
            score += 0.5;
          }
        }
      }

      if (
        normalizedQuestion.includes("fonde") &&
        text.includes("fondateur")
      ) {
        score += 0.5;
      }

      return {
        ...fragment,

        ranking: {
          ...(fragment.ranking || {}),

          baseScore: Number(
            fragment.retrievalScore ??
            fragment.score ??
            fragment.ranking?.baseScore ??
            0
          ),

          finalScore: score,

          strategy,

          subject:
            biographySubject || null
        }
      };
    });

    return rankedFragments.sort(
      (a, b) =>
        b.ranking.finalScore -
        a.ranking.finalScore
    );
  }

  scoreBiographyFragment({
    subject,
    text,
    title,
    source
  }) {
    if (!subject) {
      return 0;
    }

    let score = 0;

    /*
     * Un fichier dédié à la personne est prioritaire.
     */
    if (title === subject) {
      score += 15;
    } else if (title.includes(subject)) {
      score += 12;
    }

    if (source.includes(subject)) {
      score += 10;
    }

    /*
     * Un document rangé dans un dossier biographique
     * ou consacré aux dirigeants est favorisé.
     */
    if (
      source.includes("biographie") ||
      source.includes("biographies")
    ) {
      score += 5;
    }

    if (
      source.includes("dirigeant") ||
      source.includes("dirigeants")
    ) {
      score += 4;
    }

    /*
     * Présence de la personne dans le contenu.
     */
    if (text.includes(subject)) {
      score += 5;
    }

    /*
     * Indices biographiques.
     */
    const biographyIndicators = [
      "est un homme politique",
      "est une femme politique",
      "est une personnalite politique",
      "membre du bureau politique",
      "secretaire general",
      "premier secretaire",
      "ministre",
      "depute",
      "medecin",
      "universitaire",
      "ne le",
      "nee le",
      "parcours",
      "biographie"
    ];

    for (const indicator of biographyIndicators) {
      if (text.includes(indicator)) {
        score += 0.5;
      }
    }

    return score;
  }

  extractBiographySubject(question) {
    const normalized = this.normalize(question);

    const prefixes = [
      "qui est ",
      "qui etait ",
      "biographie de ",
      "biographie d ",
      "presente moi ",
      "presentez moi "
    ];

    let subject = normalized;

    for (const prefix of prefixes) {
      if (subject.startsWith(prefix)) {
        subject = subject.slice(prefix.length);
        break;
      }
    }

    return subject
      .replace(/\b(le|la|les|un|une)\b/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  extractComparisonSubjects(question) {
    const normalized = this.normalize(question)
      .replace(
        /\b(comparer|compare|comparaison|entre|avec|et)\b/g,
        "|"
      );

    return normalized
      .split("|")
      .map(value => value.trim())
      .filter(value => value.length >= 2);
  }

  normalize(value) {
    return String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[’']/g, " ")
      .replace(/[_-]/g, " ")
      .replace(/[^\w\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }
}

module.exports = {
  KnowledgeRanker
};