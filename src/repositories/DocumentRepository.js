class DocumentRepository {
    constructor() {
        this.documents = [];
    }

    add(document) {
        this.documents.push(document);
    }

    list() {
        return this.documents;
    }

    getById(id) {
        return this.documents.find(doc => doc.id === id) || null;
    }

    count() {
        return this.documents.length;
    }
}

module.exports = { DocumentRepository };