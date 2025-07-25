import { Post } from '../types';

/**
 * Check if a URL is valid
 * @param url - URL string to validate
 * @returns Boolean indicating if URL is valid
 */
export const isValidUrl = (url: string): boolean => {
  try {
    if (!url || typeof url !== 'string') {
      return false;
    }

    const urlPattern = /^https?:\/\/.+/i;
    return urlPattern.test(url);
  } catch (error) {
    console.error('Error validating URL:', error);
    return false;
  }
};

/**
 * Check if a string is valid (not empty, not null, not undefined)
 * @param str - String to validate
 * @returns Boolean indicating if string is valid
 */
export const isValidString = (str: string): boolean => {
  return (
    str !== null &&
    str !== undefined &&
    typeof str === 'string' &&
    str.trim().length > 0
  );
};

/**
 * Check if a number is valid (not NaN, not infinite, not null)
 * @param num - Number to validate
 * @returns Boolean indicating if number is valid
 */
export const isValidNumber = (num: number): boolean => {
  return num !== null && num !== undefined && !isNaN(num) && isFinite(num);
};

/**
 * Validate if an object has all required fields
 * @param obj - Object to validate
 * @param requiredFields - Array of required field names
 * @returns Boolean indicating if all required fields are present
 */
export const validateRequiredFields = (
  obj: any,
  requiredFields: string[]
): boolean => {
  try {
    if (!obj || typeof obj !== 'object') {
      return false;
    }

    return requiredFields.every(field => {
      const value = obj[field];
      return value !== null && value !== undefined;
    });
  } catch (error) {
    console.error('Error validating required fields:', error);
    return false;
  }
};

/**
 * Validate a Post object structure
 * @param post - Post object to validate
 * @returns Boolean indicating if post is valid
 */
export const isValidPost = (post: any): post is Post => {
  try {
    if (!post || typeof post !== 'object') {
      return false;
    }

    const requiredFields = [
      'id',
      'name',
      'avatar',
      'description',
      'image',
      'likes',
      'comments',
      'liked',
      'saved',
      'location',
      'createdAt',
    ];

    // Check if all required fields exist
    if (!validateRequiredFields(post, requiredFields)) {
      return false;
    }

    // Validate specific field types
    if (!isValidString(post.id) || !isValidString(post.name)) {
      return false;
    }

    if (!isValidUrl(post.avatar) || !isValidUrl(post.image)) {
      return false;
    }

    if (!isValidString(post.description) || !isValidString(post.location)) {
      return false;
    }

    if (!isValidNumber(post.likes) || !isValidNumber(post.comments)) {
      return false;
    }

    if (typeof post.liked !== 'boolean' || typeof post.saved !== 'boolean') {
      return false;
    }

    // Validate date
    const date = new Date(post.createdAt);
    if (isNaN(date.getTime())) {
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error validating post:', error);
    return false;
  }
};

/**
 * Sanitize a string by removing extra whitespace and special characters
 * @param str - String to sanitize
 * @returns Sanitized string
 */
export const sanitizeString = (str: string): string => {
  try {
    if (!isValidString(str)) {
      return '';
    }

    return str
      .trim()
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .replace(/[^\w\s\-.,!?]/g, ''); // Remove special characters except basic punctuation
  } catch (error) {
    console.error('Error sanitizing string:', error);
    return '';
  }
};

/**
 * Validate if a string length is within specified range
 * @param str - String to validate
 * @param minLength - Minimum length
 * @param maxLength - Maximum length
 * @returns Boolean indicating if string length is valid
 */
export const isValidStringLength = (
  str: string,
  minLength: number,
  maxLength: number
): boolean => {
  try {
    if (!isValidString(str)) {
      return false;
    }

    const length = str.trim().length;
    return length >= minLength && length <= maxLength;
  } catch (error) {
    console.error('Error validating string length:', error);
    return false;
  }
};

/**
 * Validate if a number is within specified range
 * @param num - Number to validate
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Boolean indicating if number is within range
 */
export const isNumberInRange = (
  num: number,
  min: number,
  max: number
): boolean => {
  try {
    if (!isValidNumber(num)) {
      return false;
    }

    return num >= min && num <= max;
  } catch (error) {
    console.error('Error validating number range:', error);
    return false;
  }
};
