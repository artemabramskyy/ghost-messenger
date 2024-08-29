import type {Config} from 'jest';

const jestClientConfig: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/client/jest.client.setup.ts'],
  moduleNameMapper: {
    '^root/(.*)$': '<rootDir>/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  testMatch: ['<rootDir>/src/client/**/*.test.ts'],
};

export default jestClientConfig;
