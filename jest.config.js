export default {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'jsdom', // or 'node', depending on your environment needs
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Assuming you created this file for jest-dom matchers
};