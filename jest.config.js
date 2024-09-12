module.exports = {
    testEnvironment: 'node',
    setupFilesAfterEnv: ['<rootDir>/test/setupTests.js'],
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};