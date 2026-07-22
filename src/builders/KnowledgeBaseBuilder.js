const {
  FragmentIndex
} = require(
  "../indexes/FragmentIndex"
);

const {
  KnowledgeRetriever
} = require(
  "../retrievers/KnowledgeRetriever"
);

const {
  KnowledgePackageBuilder
} = require(
  "./KnowledgePackageBuilder"
);

const {
  KnowledgeRanker
} = require(
  "../ranking/KnowledgeRanker"
);

class KnowledgeBaseBuilder {
  build({
    fragments = [],
    index = new FragmentIndex(),
    retriever = null,
    ranker = new KnowledgeRanker(),
    knowledgePackageBuilder = null
  } = {}) {
    if (!Array.isArray(fragments)) {
      throw new Error(
        "KnowledgeBaseBuilder requires fragments to be an array."
      );
    }

    index.build(fragments);

    const resolvedRetriever =
      retriever ||
      new KnowledgeRetriever({
        index
      });

    const resolvedKnowledgePackageBuilder =
      knowledgePackageBuilder ||
      new KnowledgePackageBuilder({
        retriever: resolvedRetriever,
        ranker
      });

    return {
      index,
      retriever: resolvedRetriever,
      knowledgePackageBuilder:
        resolvedKnowledgePackageBuilder
    };
  }
}

module.exports = {
  KnowledgeBaseBuilder
};
