const { TitleParser } = require("./TitleParser");
const { MetadataParser } = require("./MetadataParser");
const { SourceParser } = require("./SourceParser");
const { SectionParser } = require("./SectionParser");

class DocumentParser {
  constructor() {
    this.titleParser = new TitleParser();
    this.metadataParser = new MetadataParser();
    this.sourceParser = new SourceParser();
    this.sectionParser = new SectionParser();
  }

  parse(content) {
    return {
      title: this.titleParser.parse(content),
      metadata: this.metadataParser.parse(content),
      sources: this.sourceParser.parse(content),
      sections: this.sectionParser.parse(content)
    };
  }
}

module.exports = { DocumentParser };