const fs = require("fs");
const path = require("path");

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

  loadDirectory(directoryPath) {
    const absoluteDir = path.resolve(directoryPath);

    const files = fs
      .readdirSync(absoluteDir)
      .filter(file => file.toLowerCase().endsWith(".txt"));

    return files.map(file => {
      const filePath = path.join(absoluteDir, file);
      return this.load(filePath);
    });
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