module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    testPathIgnorePatterns: ["/node_modules/", "/dist/"],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
    },
    setupFilesAfterEnv: [
        "@testing-library/jest-dom/extend-expect",
        "<rootDir>/src/tests/setupTests.tsx",
    ],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
    transformIgnorePatterns: ["<rootDir>/node_modules/"],
    collectCoverage: true,
    collectCoverageFrom: ["src/**/*.ts", "src/**/*.tsx"],
};
