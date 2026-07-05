class Relation {
  constructor({
    id,
    source,
    target,
    type,
    metadata = {}
  }) {
    this.id = id;
    this.source = source;
    this.target = target;
    this.type = type;
    this.metadata = metadata;
  }
}

module.exports = { Relation };