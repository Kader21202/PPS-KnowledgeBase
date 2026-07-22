class RuleResult {
  constructor({
    category = null,
    confidence = 0,
    matched = false,
    reason = null
  } = {}) {
    this.category = category;
    this.confidence = confidence;
    this.matched = matched;
    this.reason = reason;

    Object.freeze(this);
  }
}

module.exports = {
  RuleResult
};