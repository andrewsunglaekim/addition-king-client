let sassPaths = `
@import "normalize-scss";
@import "@/styles/settings/_variables.scss";
`;

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: sassPaths,
      },
    },
  },
};
