/**
 * Format a number to show abbreviated format (e.g., 1K, 1M)
 * @param number - Number to format
 * @returns Formatted number string
 */
export const formatNumber = (number: number): string => {
  try {
    if (number < 1000) {
      return number.toString();
    } else if (number < 1000000) {
      const thousands = (number / 1000).toFixed(1);
      return `${thousands}K`.replace('.0', '');
    } else {
      const millions = (number / 1000000).toFixed(1);
      return `${millions}M`.replace('.0', '');
    }
  } catch (error) {
    console.error('Error formatting number:', error);
    return '0';
  }
};

/**
 * Format likes count with proper abbreviation
 * @param likes - Number of likes
 * @returns Formatted likes string
 */
export const formatLikes = (likes: number): string => {
  return formatNumber(likes);
};

/**
 * Format comments count with proper abbreviation
 * @param comments - Number of comments
 * @returns Formatted comments string
 */
export const formatComments = (comments: number): string => {
  return formatNumber(comments);
};

/**
 * Check if a number is valid (not NaN, not infinite)
 * @param number - Number to validate
 * @returns Boolean indicating if number is valid
 */
export const isValidNumber = (number: number): boolean => {
  return !isNaN(number) && isFinite(number);
};

/**
 * Clamp a number between min and max values
 * @param number - Number to clamp
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Clamped number
 */
export const clampNumber = (
  number: number,
  min: number,
  max: number
): number => {
  return Math.min(Math.max(number, min), max);
};
