import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
    dir: "./",
});

const config: Config = {
    coverageProvider: "v8",
    testEnvironment: "jsdom",
    setupFiles: ["<rootDir>/.jest/setEnvVars.js"],
};

export default createJestConfig(config);
