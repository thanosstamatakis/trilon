export default {
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    customExportConditions: [""],
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts", "<rootDir>/jest.pollyfills.js"],
  // Map aliased paths to the correct directories
  moduleNameMapper: {
    "@trilon/(.*)": "<rootDir>/src/$1",
  },
};
