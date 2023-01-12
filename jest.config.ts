/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/tests/**/*.test.ts'],
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    verbose: true,
    forceExit: true,
    extensionsToTreatAsEsm: ['.ts'],
    transform: {
        '^.+\\.ts$': 'ts-jest'
    },
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1'
    }
};
