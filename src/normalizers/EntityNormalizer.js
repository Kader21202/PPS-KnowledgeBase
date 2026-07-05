class EntityNormalizer {
  normalizeName(value) {
    return String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\b(feu|mr|m\.|monsieur|mme|madame)\b/g, "")
      .replace(/[^\w\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  isSameEntity(entityA, entityB) {
    if (!entityA || !entityB) return false;

    const namesA = [entityA.name, ...(entityA.aliases || [])].map(value =>
      this.normalizeName(value)
    );

    const namesB = [entityB.name, ...(entityB.aliases || [])].map(value =>
      this.normalizeName(value)
    );

    return namesA.some(nameA => namesB.includes(nameA));
  }
}

module.exports = { EntityNormalizer };