/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.test.ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/__tests__/**',
    '!src/server.ts',
    '!**/*.d.ts',
  ],
  coverageReporters: ['text', 'text-summary', 'json', 'html'],
  // Coverage thresholds can be set here once the team agrees on a target.
  // Example: global: { branches: 80, functions: 80, lines: 80, statements: 80 }
  coverageThreshold: {},
};
