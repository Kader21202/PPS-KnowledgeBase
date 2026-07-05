class MetadataParser {
  parse(content) {
    const metadata = {};

    const block = this.extractBlock(content, "METADONNEES DOCUMENT");
    if (!block) return metadata;

    metadata.category = this.extractValue(block, "Categorie");
    metadata.type = this.extractValue(block, "Type");
    metadata.period = this.extractValue(block, "Periode couverte");
    metadata.priority = this.extractValue(block, "Priorité RAG");

    return metadata;
  }

  extractBlock(content, title) {
    const start = content.indexOf(title);
    if (start === -1) return null;

    const nextSection = content.indexOf("SOURCES ET REFERENCES", start);
    return nextSection === -1
      ? content.slice(start)
      : content.slice(start, nextSection);
  }

  extractValue(block, label) {
    const lines = block.split(/\r?\n/).map(line => line.trim());
    const index = lines.findIndex(line => line === `${label} :`);

    if (index === -1) return null;

    return lines[index + 1] || null;
  }
}

module.exports = { MetadataParser };