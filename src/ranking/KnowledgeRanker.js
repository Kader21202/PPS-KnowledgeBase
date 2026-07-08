class KnowledgeRanker {
  rank({ question, fragments = [], strategy = "definition" }) {
    const normalizedQuestion = String(question || "").toLowerCase();

    return fragments
      .map(fragment => {
        let score = fragment.score || 0;

        const text = String(fragment.text || "").toLowerCase();

        if (strategy === "definition") {
          if (text.includes("fondateur")) score += 0.4;
          if (text.includes("fondé")) score += 0.3;
          if (text.includes("créé")) score += 0.25;
          if (text.includes("est le")) score += 0.15;
        }

        if (strategy === "chronology") {
          if (fragment.year) score += 0.5;
        }

        if (strategy === "comparison") {
          if (text.includes("ali yata")) score += 0.2;
          if (text.includes("ismaïl alaoui")) score += 0.2;
          if (text.includes("ismail alaoui")) score += 0.2;
        }

        if (
          normalizedQuestion.includes("fondé") &&
          text.includes("fondateur")
        ) {
          score += 0.5;
        }

        return {
          ...fragment,
          ranking: {
            baseScore: fragment.score || 0,
            finalScore: score,
            strategy
          }
        };
      })
      .sort((a, b) => b.ranking.finalScore - a.ranking.finalScore);
  }
}

module.exports = { KnowledgeRanker };