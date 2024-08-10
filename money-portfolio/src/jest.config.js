// // jest.config.js
// module.exports = {
//   preset: "jest-preset-angular",
//   setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
//   globalSetup: "jest-preset-angular/global-setup",
// };

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
