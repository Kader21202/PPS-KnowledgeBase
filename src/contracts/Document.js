class Document {
    constructor({
        id,
        title,
        category,
        type,
        language = "fr",

        content,
        sections = [],

        metadata = {},
        sources = [],
        relations = [],

        path = null
    }) {

        this.id = id;
        this.title = title;
        this.category = category;
        this.type = type;

        this.language = language;

        this.content = content;
        this.sections = sections;

        this.metadata = metadata;
        this.sources = sources;
        this.relations = relations;

        this.path = path;
    }
}

module.exports = { Document };