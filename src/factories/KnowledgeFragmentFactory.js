const { KnowledgeFragment } = require("../contracts/KnowledgeFragment");

class KnowledgeFragmentFactory {
  createFromDocument(document) {
    if (!document || !Array.isArray(document.sections)) {
      return [];
    }

    return document.sections
      .map((section, index) => {
        if (!String(section.content || "").trim()) {
          return null;
        }

        return new KnowledgeFragment({
          id: `${document.id}-FRAG-${String(index + 1).padStart(3, "0")}`,
          documentId: document.id,
          sectionTitle: section.title,
          text: section.content,
          metadata: {
            ...document.metadata,
            sourcePath: document.path || null
          },
          sources: document.sources,
          entities: [],
          relations: [],
          confidence: null
        });
      })
      .filter(Boolean);
  }
}

module.exports = { KnowledgeFragmentFactory };
