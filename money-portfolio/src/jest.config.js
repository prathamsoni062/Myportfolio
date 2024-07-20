// // jest.config.js
// module.exports = {
//   preset: "jest-preset-angular",
//   setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
//   globalSetup: "jest-preset-angular/global-setup",
// };
module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|js|html)$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'html', 'js', 'json'],
  transformIgnorePatterns: ['node_modules/(?!(jest-test|@ngrx|ngx-socket-io|@ionic-native|@ionic))'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.spec.json',
      stringifyContentPathRegex: '\\.html$',
      astTransformers: {
        before: [
          'jest-preset-angular/build/InlineFilesTransformer',
          'jest-preset-angular/build/StripStylesTransformer',
        ],
      },
    },
  },
};
