import type { Config } from "jest";

const config: Config = {
    clearMocks: true,
    verbose: true,
    collectCoverage: true,
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "ts-jest",
    },
    moduleNameMapper: {
        "(.+)\\.js": "$1",
    },
    setupFiles: ["<rootDir>/.jest/setEnvVars.js"],
    testPathIgnorePatterns: ["__tests__/index*"],
    coverageDirectory: "coverage",
    forceExit: true,
    coverageProvider: "v8",
};

export default config;
