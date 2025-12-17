/**
 * Validation utilities for form inputs
 */

/**
 * Validates email format
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if email is valid
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates password strength
 * Requirements: minimum 8 characters, at least one uppercase, one lowercase, one number, one special character
 * @param {string} password - Password to validate
 * @returns {object} - Object with isValid and message properties
 */
export const validatePassword = (password) => {
  if (!password) {
    return { isValid: false, message: 'Password is required' };
  }

  if (password.length < 8) {
    return { isValid: false, message: 'Password must be at least 8 characters long' };
  }

  if (!/[A-Z]/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one uppercase letter' };
  }

  if (!/[a-z]/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one lowercase letter' };
  }

  if (!/[0-9]/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one number' };
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one special character' };
  }

  return { isValid: true, message: 'Password is strong' };
};

/**
 * Validates if passwords match
 * @param {string} password - Password
 * @param {string} confirmPassword - Confirmation password
 * @returns {boolean} - True if passwords match
 */
export const doPasswordsMatch = (password, confirmPassword) => {
  return password === confirmPassword;
};

/**
 * Validates if field is not empty
 * @param {string} value - Value to check
 * @returns {boolean} - True if field is not empty
 */
export const isNotEmpty = (value) => {
  return value && value.trim().length > 0;
};

/**
 * Validates OTP format (4 digits)
 * @param {string} otp - OTP to validate
 * @returns {boolean} - True if OTP is valid
 */
export const isValidOTP = (otp) => {
  return /^\d{4}$/.test(otp);
};

/**
 * Validates full name (at least 2 characters)
 * @param {string} name - Name to validate
 * @returns {boolean} - True if name is valid
 */
export const isValidName = (name) => {
  return name && name.trim().length >= 2;
};
