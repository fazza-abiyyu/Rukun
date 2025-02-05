module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        '^.+\\.ts$': 'babel-jest',
    },
    extensionsToTreatAsEsm: ['.ts'],
    moduleFileExtensions: ['ts', 'js'],
    testPathIgnorePatterns: ['/node_modules/', '/.nuxt/'],
    moduleNameMapper: {
        '^~/(.*)$': '<rootDir>/server/$1',  // Alias ~ mengarah ke folder server
    },
};
