export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  // Map aliased paths to the correct directories
  moduleNameMapper: {
    "@trilon/(.*)": "<rootDir>/src/$1",
  },
};
