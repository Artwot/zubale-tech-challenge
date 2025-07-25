import moment from 'moment';

/**
 * Format a date to show relative time (e.g., "hace 2 horas", "hace 1 día")
 * @param date - Date string or Date object
 * @returns Formatted relative time string
 */
export const formatRelativeTime = (date: string | Date): string => {
  try {
    const momentDate = moment(date);

    if (!momentDate.isValid()) {
      return 'Invalid date';
    }

    const now = moment();
    const diffInMinutes = now.diff(momentDate, 'minutes');
    const diffInHours = now.diff(momentDate, 'hours');
    const diffInDays = now.diff(momentDate, 'days');

    if (diffInMinutes < 1) {
      return 'ahora mismo';
    } else if (diffInMinutes < 60) {
      return `hace ${diffInMinutes} ${diffInMinutes === 1 ? 'minuto' : 'minutos'}`;
    } else if (diffInHours < 24) {
      return `hace ${diffInHours} ${diffInHours === 1 ? 'hora' : 'horas'}`;
    } else if (diffInDays < 7) {
      return `hace ${diffInDays} ${diffInDays === 1 ? 'día' : 'días'}`;
    } else if (diffInDays < 30) {
      const weeks = Math.floor(diffInDays / 7);
      return `hace ${weeks} ${weeks === 1 ? 'semana' : 'semanas'}`;
    } else if (diffInDays < 365) {
      const months = Math.floor(diffInDays / 30);
      return `hace ${months} ${months === 1 ? 'mes' : 'meses'}`;
    } else {
      const years = Math.floor(diffInDays / 365);
      return `hace ${years} ${years === 1 ? 'año' : 'años'}`;
    }
  } catch (error) {
    console.error('Error formatting relative time:', error);
    return 'Invalid date';
  }
};

/**
 * Format a date to show full date (e.g., "17 de abril de 2024")
 * @param date - Date string or Date object
 * @returns Formatted date string
 */
export const formatDate = (date: string | Date): string => {
  try {
    const momentDate = moment(date);

    if (!momentDate.isValid()) {
      return 'Invalid date';
    }

    return momentDate.format('D [de] MMMM [de] YYYY');
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid date';
  }
};

/**
 * Check if a date is valid
 * @param date - Date string or Date object
 * @returns Boolean indicating if date is valid
 */
export const isValidDate = (date: string | Date): boolean => {
  try {
    return moment(date).isValid();
  } catch (error) {
    console.error('Error validating date:', error);
    return false;
  }
};

/**
 * Get the time difference in a specific unit
 * @param date - Date string or Date object
 * @param unit - Time unit ('minutes', 'hours', 'days', etc.)
 * @returns Number representing the difference
 */
export const getTimeDifference = (
  date: string | Date,
  unit: moment.unitOfTime.Diff = 'minutes'
): number => {
  try {
    const momentDate = moment(date);

    if (!momentDate.isValid()) {
      return 0;
    }

    return moment().diff(momentDate, unit);
  } catch (error) {
    console.error('Error calculating time difference:', error);
    return 0;
  }
};
