const { Relation } = require("../contracts/Relation");

class RelationExtractor {
  constructor({ vocabulary }) {
    if (!vocabulary) {
      throw new Error("RelationExtractor requires a RelationVocabulary.");
    }

    this.vocabulary = vocabulary;
  }

  extract({ fragment, entities }) {
    if (!fragment || !fragment.text || !entities || entities.length < 2) {
      return [];
    }

    const text = fragment.text.toLowerCase();
    const relations = [];

    this.vocabulary.list().forEach(definition => {
      const patterns = definition.patterns || [];

      const match = patterns.some(pattern =>
        text.includes(pattern.toLowerCase())
      );

      if (!match) return;

      const source = entities.find(e => e.type === definition.domain);
      const target = entities.find(e => e.type === definition.range);

      if (!source || !target) return;

      relations.push(
        new Relation({
          id: `REL-${relations.length + 1}`,
          source,
          target,
          type: definition.type,
          metadata: {}
        })
      );
    });

    return relations;
  }
}

module.exports = { RelationExtractor };