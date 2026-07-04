const { DocumentRepository } = require("../repositories/DocumentRepository");

class RepositoryService {
    constructor() {
        this.repository = new DocumentRepository();
    }

    addDocument(document) {
        this.repository.add(document);
    }

    getDocuments() {
        return this.repository.list();
    }

    getDocumentById(id) {
        return this.repository.getById(id);
    }

    countDocuments() {
        return this.repository.count();
    }
}

module.exports = { RepositoryService };