module.exports = {
  purge: [
    "./components/*.js",
    "./layouts/*.js",
    "./pages/*.js",
    "./styles/*.css",
  ],
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
};
