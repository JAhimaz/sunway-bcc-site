export const ExpToLevel = (exp: number) => {
  let level = 0;
  let remainingExp = exp;
  let expRequired = 0;

  // Calculate the level and the required experience for the next level
  while (remainingExp >= expRequired) {
    level++;
    expRequired += 100 * level;
  }

  // Calculate the remaining experience needed to reach the next level
  const nextLevelExp = expRequired;
  const currentLevelExp = expRequired - 100 * level;
  const expToNextLevel = nextLevelExp - exp;
  
  // Calculate the progress percentage within the current level and round it
  const remainingExpScaled = Math.round(((exp - currentLevelExp) / (nextLevelExp - currentLevelExp)) * 100);

  return { 
    level, 
    remainingExp: expToNextLevel, 
    nextLevelExp, 
    remainingExpScaled 
  };
};
