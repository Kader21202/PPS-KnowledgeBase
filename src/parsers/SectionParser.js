class SectionParser {
  parse(content) {
    if (!content || typeof content !== "string") return [];

    const sections = [];
    const lines = content.split(/\r?\n/);

    let current = null;

    for (const line of lines) {
      const trimmed = line.trim();

      if (/^\d+\.\s+/.test(trimmed)) {
        if (current) sections.push(current);

        current = {
          title: trimmed,
          content: ""
        };
      } else if (current) {
        current.content += line + "\n";
      }
    }

    if (current) sections.push(current);

    return sections.map(section => ({
      title: section.title,
      content: section.content.trim()
    }));
  }
}

module.exports = { SectionParser };