class RelationVocabulary {
  constructor() {
    this.relations = new Map();

    this.register({
      type: "member_of",
      domain: "Person",
      range: "Organization",
      description: "Person is a member of an organization"
    });

    this.register({
  type: "secretary_general_of",
  domain: "Person",
  range: "Organization",
  description: "Person is secretary general of an organization",
  patterns: [
    "secrétaire général",
    "secretaire general"
  ]
});
    this.register({
      type: "president_of",
      domain: "Person",
      range: "Organization",
      description: "Person is president of an organization"
    });

    this.register({
      type: "participated_in",
      domain: "Person",
      range: "Event",
      description: "Person participated in an event"
    });

    this.register({
      type: "held_in",
      domain: "Event",
      range: "Place",
      description: "Event held in a place"
    });
  }

  register(relationType) {
    this.relations.set(relationType.type, relationType);
  }

  get(type) {
    return this.relations.get(type) || null;
  }

  has(type) {
    return this.relations.has(type);
  }

  list() {
    return Array.from(this.relations.values());
  }

  count() {
    return this.relations.size;
  }
}

module.exports = { RelationVocabulary };