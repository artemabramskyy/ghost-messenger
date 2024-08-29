import {Config} from "jest";

const jestServerConfig: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/src/server/jest.server.setup.ts'],
  testMatch: ['<rootDir>/src/server/**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  moduleNameMapper: {
    '^root/(.*)$': '<rootDir>/$1',
  }
};

export default jestServerConfig;
