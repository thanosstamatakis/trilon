export default {
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    customExportConditions: [""],
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts", "<rootDir>/jest.pollyfills.js"],
  modulePathIgnorePatterns: ["<rootDir>/e2e/", "<rootDir>/tests-examples/"],
  // Map aliased paths to the correct directories
  moduleNameMapper: {
    "@trilon/(.*)": "<rootDir>/src/$1",
  },
};
