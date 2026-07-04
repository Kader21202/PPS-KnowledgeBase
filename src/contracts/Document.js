class Document {
    constructor({
        id,
        title,
        category,
        type,
        language = "fr",
        content,
        path = null,
        metadata = {}
    }) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.type = type;
        this.language = language;
        this.content = content;
        this.path = path;
        this.metadata = metadata;
    }
}

module.exports = { Document };