module.exports = {
    testEnvironment: 'node',
    setupFilesAfterEnv: ['<rootDir>/test/setup.js'],
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};