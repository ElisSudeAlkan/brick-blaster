const assert = require("assert");

/**
 * Example scoring logic used in the game
 */
function calculateScore(bricksDestroyed, level) {
  return bricksDestroyed * 10 * level;
}

function shouldAdvanceLevel(bricksRemaining) {
  return bricksRemaining === 0;
}

/**
 * TESTS
 */

function testScoreCalculation() {
  const score = calculateScore(5, 1);
  assert.strictEqual(score, 50);
}

function testScoreWithLevelMultiplier() {
  const score = calculateScore(3, 2);
  assert.strictEqual(score, 60);
}

function testLevelAdvance() {
  assert.strictEqual(shouldAdvanceLevel(0), true);
}

function testNoLevelAdvance() {
  assert.strictEqual(shouldAdvanceLevel(5), false);
}

function runTests() {
  testScoreCalculation();
  testScoreWithLevelMultiplier();
  testLevelAdvance();
  testNoLevelAdvance();

  console.log("All tests passed!");
}

runTests();