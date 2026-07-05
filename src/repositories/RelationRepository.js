class RelationRepository {
  constructor() {
    this.records = new Map();
  }

  add(relation, fragment = null) {
    if (!relation) return;

    const key = this.getKey(relation);

    let record = this.records.get(key);

    if (!record) {
      record = {
        relation,
        fragments: new Set(),
        documents: new Set(),
        occurrences: 0
      };

      this.records.set(key, record);
    }

    if (fragment) {
      record.fragments.add(fragment.id);

      if (fragment.documentId) {
        record.documents.add(fragment.documentId);
      }
    }

    record.occurrences++;
  }

  get(key) {
    return this.records.get(key) || null;
  }

  getKey(relation) {
    return `${relation.source.id}::${relation.type}::${relation.target.id}`;
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

module.exports = { RelationRepository };