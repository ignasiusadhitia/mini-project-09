import { useMemo } from 'react';

import DOMPurify from 'dompurify';

export const usePurify = () => {
  /**
   * Function to sanitize input
   * @param {string} dirtyInput - The input string to be sanitized
   * @returns {string} - The sanitized string
   */
  const sanitize = (dirtyInput) => {
    return DOMPurify.sanitize(dirtyInput);
  };

  /**
   * Memoized function to sanitize input
   * @param {string} dirtyInput - The input string to be sanitized
   * @returns {string} - The sanitized string
   */
  const sanitizeMemo = useMemo(() => sanitize, []);

  return {
    sanitize,
    sanitizeMemo,
  };
};
