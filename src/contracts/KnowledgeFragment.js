class KnowledgeFragment {
  constructor({
    id,
    documentId,
    sectionTitle,
    text,
    metadata = {},
    sources = [],
    entities = [],
    relations = [],
    confidence = null
  }) {
    this.id = id;
    this.documentId = documentId;
    this.sectionTitle = sectionTitle;
    this.text = text;
    this.metadata = metadata;
    this.sources = sources;
    this.entities = entities;
    this.relations = relations;
    this.confidence = confidence;
  }
}

module.exports = { KnowledgeFragment };