export const ExpToLevel = (exp: number) => {
  // scaling level, require total exp of 100 to level up to 1, total exp of 300 to level up to 2, total of 500 to level up to 3, etc.
  let level = 0;
  let remainingExp = exp;
  let expRequired = 0;

  while (remainingExp >= expRequired) {
    level++;
    expRequired += 100 * level;
  }

  remainingExp -= expRequired - 100 * level;
  // remainingExpScaled from range of 0 to 1
  const remainingExpScaled = remainingExp / (100 * level);

  return { level, remainingExp, expRequired, remainingExpScaled };
  

  // return level, remaining exp, exp required to level up, current exp on level
}