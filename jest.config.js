module.exports = {
    testEnvironment: 'node',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testTimeout: 30000, // 30 seconds
    testMatch: ['**/tests/**/*.test.js'],
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest'
    },
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
    }
};