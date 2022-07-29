/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  bail: 0,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.js'],
  coverageDirectory: 'out/coverage',
  coveragePathIgnorePatterns: ['/node_modules/', '/\\.', '/_', '/index\\.js$'],
  coverageProvider: 'v8',
  coverageReporters: ['text-summary', 'html-spa', 'lcov'],
  coverageThreshold: { global: { branches: 50, functions: 50, lines: 50, statements: 50 } },
  moduleNameMapper: {},
  restoreMocks: true,
  roots: ['src'],
  setupFilesAfterEnv: [],
  verbose: true,
};
