const { DocumentRepository } = require("../repositories/DocumentRepository");
const { DocumentFactory } = require("../factories/DocumentFactory");
const { TextLoader } = require("../loaders/TextLoader");

class RepositoryService {

    constructor() {
        this.repository = new DocumentRepository();
        this.factory = new DocumentFactory();
        this.loader = new TextLoader();
    }

    load(filePath) {

        const file = this.loader.load(filePath);

        const document = this.factory.create(file);

        this.repository.add(document);

        return document;

    }

    list() {
        return this.repository.list();
    }

    getById(id) {
        return this.repository.getById(id);
    }

    count() {
        return this.repository.count();
    }

}

module.exports = { RepositoryService };