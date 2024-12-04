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

  return {
    sanitize, // Return the sanitize function directly
  };
};

export default usePurify;
