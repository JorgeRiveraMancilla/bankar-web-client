/**
 * Capitalizes the first letter of a text and converts the rest to lowercase
 * @param text - Text to convert
 * @returns Text with first letter capitalized
 */
export const capitalizeFirst = (text: string): string => {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

/**
 * Capitalizes the first letter of each word and converts the rest to lowercase
 * @param text - Text to convert
 * @param excludedWords - (Optional) Array of words that should remain in lowercase
 * @returns Text with the first letter of each word capitalized, except for excluded words if specified
 */
export const capitalizeWords = (
  text: string,
  excludedWords?: string[]
): string => {
  if (!text) return text;

  if (!excludedWords || excludedWords.length === 0) {
    return text
      .split(" ")
      .map((word) => capitalizeFirst(word))
      .join(" ");
  }

  const excludedSet = new Set(excludedWords.map((word) => word.toLowerCase()));

  return text
    .split(" ")
    .map((word) => {
      if (excludedSet.has(word.toLowerCase())) {
        return word.toLowerCase();
      }
      return capitalizeFirst(word);
    })
    .join(" ");
};
