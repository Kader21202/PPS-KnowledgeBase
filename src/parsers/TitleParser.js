class TitleParser {
  parse(content) {
    if (!content || typeof content !== "string") {
      return null;
    }

    const lines = content
      .split(/\r?\n/)
      .map(line => line.trim())
      .filter(Boolean);

    return lines[0] || null;
  }
}

module.exports = { TitleParser };