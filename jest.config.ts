export default {
  preset: "ts-jest",
  moduleFileExtensions: ["js", "json", "ts"],
  testRegex: ".*\\.spec\\.ts$",
  bail: 1,
  clearMocks: true,
  coverageProvider: "v8",
  coverageDirectory: "./coverage",
  testEnvironment: "node",
};
