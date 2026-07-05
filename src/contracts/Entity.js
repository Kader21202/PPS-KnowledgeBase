class Entity {
  constructor({
    id,
    name,
    type,
    aliases = [],
    metadata = {}
  }) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.aliases = aliases;
    this.metadata = metadata;
  }
}

module.exports = { Entity };