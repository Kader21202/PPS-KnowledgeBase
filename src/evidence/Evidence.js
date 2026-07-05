class Evidence {
  constructor({
    question = "",
    entities = [],
    relations = [],
    fragments = [],
    documents = []
  }) {
    this.question = question;
    this.entities = entities;
    this.relations = relations;
    this.fragments = fragments;
    this.documents = documents;
  }

  entityCount() {
    return this.entities.length;
  }

  relationCount() {
    return this.relations.length;
  }

  fragmentCount() {
    return this.fragments.length;
  }

  documentCount() {
    return this.documents.length;
  }
}

module.exports = { Evidence };