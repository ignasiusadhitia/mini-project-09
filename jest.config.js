export default {
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest', // Transform file JS, JSX, TS, dan TSX using Babel
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock CSS file
    '\\.(svg|png|jpg|jpeg|gif)$': 'jest-transform-stub', // Mock image file
  },
};
