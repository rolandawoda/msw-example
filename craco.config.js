module.exports = {
  jest: {
    configure: (jestConfig, { env, paths, resolve, rootDir }) => {
      return {
        ...jestConfig,
        transformIgnorePatterns: ["node_modules/(?!@bundled-es-modules)/"],
        setupFiles: ["./jest.polyfills.js"],
      };
    },
  },
};
