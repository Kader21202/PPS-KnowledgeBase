class EntityRepository {
  constructor() {
    this.records = new Map();
  }

  add(entity, fragment) {
    if (!entity) return;

    let record = this.records.get(entity.id);

    if (!record) {
      record = {
        entity,
        fragments: new Set(),
        documents: new Set(),
        occurrences: 0
      };

      this.records.set(entity.id, record);
    }

    if (fragment) {
      record.fragments.add(fragment.id);

      if (fragment.documentId) {
        record.documents.add(fragment.documentId);
      }
    }

    record.occurrences++;
  }

  get(entityId) {
    return this.records.get(entityId) || null;
  }

  list() {
    return Array.from(this.records.values());
  }

  count() {
    return this.records.size;
  }

  clear() {
    this.records.clear();
  }
}

module.exports = { EntityRepository };