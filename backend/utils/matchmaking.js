// Example: simple compatibility scoring
exports.calculateCompatibility = (userA, userB) => {
  let score = 0;
  if (userA.religion === userB.religion) score += 20;
  if (userA.caste === userB.caste) score += 20;
  if (userA.lifestyle?.diet === userB.lifestyle?.diet) score += 10;
  // ...add more rules
  return score;
};
