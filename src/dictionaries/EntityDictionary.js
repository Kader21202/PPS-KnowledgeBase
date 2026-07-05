const { Entity } = require("../contracts/Entity");

class EntityDictionary {
  constructor() {
    this.entities = [];
  }

  add(entity) {
    this.entities.push(entity);
  }

  addMany(entities) {
    entities.forEach(entity => this.add(entity));
  }

  list() {
    return this.entities;
  }

  count() {
    return this.entities.length;
  }

  findByName(name) {
    const normalizedName = this.normalize(name);

    return this.entities.find(entity => {
      if (this.normalize(entity.name) === normalizedName) return true;

      return entity.aliases.some(alias =>
        this.normalize(alias) === normalizedName
      );
    }) || null;
  }

  normalize(value) {
    return String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
  }
}

module.exports = { EntityDictionary };