// jest.config.cjs

module.exports = {
  preset: "ts-jest", // Use ts-jest preset for TypeScript support
  testEnvironment: "jsdom", // Use jsdom environment for React components
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // Setup file for additional configurations
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Mock CSS imports
    "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/__mocks__/fileMock.js", // Mock static file imports
  },
  testPathIgnorePatterns: ["/node_modules/"],
};
