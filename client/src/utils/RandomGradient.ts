import seedrandom from 'seedrandom';

// Utility to generate a random number from the seed
const getRandomFromSeed = (seed: string, min = 0, max = 1): number => {
  const rng = seedrandom(seed);
  return rng() * (max - min) + min;
};

// Function to generate a harmonious color from HSL based on a seed
const generateHSLColorFromSeed = (seed: string, offsetHue: number = 0): string => {
  const baseHue = Math.floor(getRandomFromSeed(seed + 'hue', 0, 360)); // Hue value between 0 and 360
  const hue = (baseHue + offsetHue) % 360; // Offset hue for color harmony (complementary/analogous)
  const saturation = Math.floor(getRandomFromSeed(seed + 'saturation', 60, 90)); // Saturation between 60% and 90%
  const lightness = Math.floor(getRandomFromSeed(seed + 'lightness', 40, 60)); // Lightness between 40% and 60%
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

// Function to generate a gradient from a seed
export const GenGradient = (seed: string): string => {
  const color1 = generateHSLColorFromSeed(seed); // Base color
  const color2 = generateHSLColorFromSeed(seed, 30); // Analogous color by offsetting hue by 30 degrees
  const angle = Math.floor(getRandomFromSeed(seed + 'angle', 0, 360));
  return `linear-gradient(${angle}deg, ${color1}, ${color2})`;
};