class EntityExtractor {
  constructor({ dictionary }) {
    if (!dictionary) {
      throw new Error("EntityExtractor requires an EntityDictionary.");
    }

    this.dictionary = dictionary;
  }

  extract(fragment) {
    if (!fragment || !fragment.text) {
      return [];
    }

    const text = this.normalize(fragment.text);
    const found = new Map();

    this.dictionary.list().forEach(entity => {
      const names = [entity.name, ...entity.aliases];

      names.forEach(name => {
        const normalizedName = this.normalize(name);

        if (normalizedName && text.includes(normalizedName)) {
          found.set(entity.id, entity);
        }
      });
    });

    return Array.from(found.values());
  }

  normalize(value) {
    return String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }
}

module.exports = { EntityExtractor };