class SourceParser {
  parse(content) {
    const block = this.extractBlock(content, "SOURCES ET REFERENCES");
    if (!block) return [];

    const source = {
      title: this.extractValue(block, "Titre"),
      publication: this.extractValue(block, "Publication"),
      mainSpeaker: this.extractValue(block, "Intervenant principal"),
      type: this.extractValue(block, "Type"),
      url: this.extractValue(block, "URL_SOURCE"),
      usage: this.extractValue(block, "Utilisation")
    };

    return [source];
  }

  extractBlock(content, title) {
    const start = content.indexOf(title);
    if (start === -1) return null;
    return content.slice(start);
  }

  extractValue(block, label) {
  const lines = block.split(/\r?\n/).map(line => line.trim());
  const index = lines.findIndex(line => line === `${label} :`);

  if (index === -1) return null;

  for (let i = index + 1; i < lines.length; i++) {
    if (lines[i]) {
      return lines[i];
    }
  }

  return null;
}
}

module.exports = { SourceParser };