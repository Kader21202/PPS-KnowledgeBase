class FragmentIndex {
  constructor() {
    this.index = new Map();
  }

  build(fragments) {
    this.index.clear();

    fragments.forEach(fragment => {
      const words = this.tokenize(fragment.text);

      words.forEach(word => {
        if (!this.index.has(word)) {
          this.index.set(word, []);
        }

        this.index.get(word).push(fragment);
      });
    });
  }

  search(query) {
    const words = this.tokenize(query);
    const results = new Map();

    words.forEach(word => {
      const fragments = this.index.get(word) || [];

      fragments.forEach(fragment => {
        const currentScore = results.get(fragment.id)?.score || 0;

        results.set(fragment.id, {
          fragment,
          score: currentScore + 1
        });
      });
    });

    return Array.from(results.values())
      .sort((a, b) => b.score - a.score)
      .map(result => result.fragment);
  }

  tokenize(text) {
    return String(text || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s]/g, " ")
      .split(/\s+/)
      .filter(word => word.length > 2);
  }
}

module.exports = { FragmentIndex };