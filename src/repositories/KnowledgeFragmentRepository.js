class KnowledgeFragmentRepository {
  constructor() {
    this.fragments = [];
  }

  add(fragment) {
    this.fragments.push(fragment);
  }

  addMany(fragments) {
    fragments.forEach(fragment => this.add(fragment));
  }

  list() {
    return this.fragments;
  }

  getById(id) {
    return this.fragments.find(fragment => fragment.id === id) || null;
  }

  count() {
    return this.fragments.length;
  }

  clear() {
    this.fragments = [];
  }
}

module.exports = { KnowledgeFragmentRepository };