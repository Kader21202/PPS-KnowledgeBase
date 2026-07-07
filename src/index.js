const { Document } = require("./contracts/Document");
const { Entity } = require("./contracts/Entity");
const { KnowledgeFragment } = require("./contracts/KnowledgeFragment");
const { Relation } = require("./contracts/Relation");

const { TextLoader } = require("./loaders/TextLoader");

const { DocumentParser } = require("./parsers/DocumentParser");

const { DocumentFactory } = require("./factories/DocumentFactory");
const { KnowledgeFragmentFactory } = require("./factories/KnowledgeFragmentFactory");

const { DocumentRepository } = require("./repositories/DocumentRepository");
const { KnowledgeFragmentRepository } = require("./repositories/KnowledgeFragmentRepository");
const { EntityRepository } = require("./repositories/EntityRepository");
const { RelationRepository } = require("./repositories/RelationRepository");

const { FragmentIndex } = require("./indexes/FragmentIndex");
const { KnowledgeRetriever } = require("./retrievers/KnowledgeRetriever");

const { EntityDictionary } = require("./dictionaries/EntityDictionary");
const { RelationVocabulary } = require("./vocabularies/RelationVocabulary");

const { EntityExtractor } = require("./extractors/EntityExtractor");
const { RelationExtractor } = require("./extractors/RelationExtractor");

const { EntityNormalizer } = require("./normalizers/EntityNormalizer");

const { KnowledgeScanner } = require("./scanners/KnowledgeScanner");
const { RepositoryService } = require("./services/RepositoryService");

const { KnowledgeGraph } = require("./graph/KnowledgeGraph");
const { KnowledgeGraphBuilder } = require("./graph/KnowledgeGraphBuilder");

const { Evidence } = require("./evidence/Evidence");
const { EvidenceBuilder } = require("./evidence/EvidenceBuilder");
const { KnowledgePackageBuilder } = require("./builders/KnowledgePackageBuilder");

module.exports = {
  Document,
  Entity,
  KnowledgeFragment,
  Relation,

  TextLoader,
  DocumentParser,
  DocumentFactory,
  KnowledgeFragmentFactory,

  DocumentRepository,
  KnowledgeFragmentRepository,
  EntityRepository,
  RelationRepository,

  FragmentIndex,
  KnowledgeRetriever,

  EntityDictionary,
  RelationVocabulary,
  EntityExtractor,
  RelationExtractor,
  EntityNormalizer,

  KnowledgeScanner,
  RepositoryService,

  KnowledgeGraph,
  KnowledgeGraphBuilder,

  Evidence,
  EvidenceBuilder,
  KnowledgePackageBuilder
};