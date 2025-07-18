export const capitalize = (word) => {
  return `${word[0].toUpperCase()}${word.slice(1)}`;
};

export const calculateCalories = (carbs, protein, fat) => {
  return carbs * 4 + protein * 4 + fat * 9;
};
