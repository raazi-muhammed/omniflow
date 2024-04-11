import type { Config } from "jest";

const config: Config = {
    clearMocks: true,
    verbose: true,
    collectCoverage: true,
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "ts-jest",
    },
    moduleNameMapper: {
        "^ipaddr.js$": "<rootDir>/node_modules/ipaddr.js",
        "^(.+)\\.js$": "$1",
    },
    setupFiles: ["<rootDir>/.jest/setEnvVars.js"],
    testPathIgnorePatterns: ["__tests__/index*"],
    coveragePathIgnorePatterns: [
        "node_modules",
        "test-config",
        "interfaces",
        "jestGlobalMocks.ts",
        ".module.ts",
        "<rootDir>/src/events/kafka/*",
        ".mock.ts",
    ],
    coverageDirectory: "coverage",
    coverageProvider: "v8",
};

export default config;
