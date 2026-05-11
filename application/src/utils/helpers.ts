// Utility functions for the Daily Harvest API

/**
 * Format a numeric price as a locale-aware USD currency string.
 * @param price - The price value to format.
 * @returns A formatted currency string (e.g. "$1.99").
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

/**
 * Calculate the total price for an array of cart items.
 * @param items - Array of objects with price and quantity properties.
 * @returns The sum of price × quantity for all items.
 */
export const calculateTotal = (items: Array<{ price: number; quantity: number }>): number => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

/**
 * Validate that a string looks like a valid email address.
 * @param email - The email string to validate.
 * @returns `true` if the email matches a basic email pattern.
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
