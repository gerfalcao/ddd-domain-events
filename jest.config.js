/** @type {import('jest').Config} */
module.exports = {
  clearMocks: true,
  coverageProvider: "v8",
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"],
  },
};
