module.exports = {
    preset: "jest-preset-angular",
    setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
    TestEnvirontment: "jsdom",
    collectCoverage: true,
    coverageDirectory: "coverage",
    coverageReporters: ["html", "lcov", "text-summary"],
    testMatch: ["**/__tests__/**/*.(ts|js)", "**/*.(test|spec).(ts|js)"],
    moduleFileExtensions: ["ts", "html", "js", "json"],
    transformIgnorePatterns: ["node_modules/(?!(@angular|@ngrx|ngx-)/)"],
}