const purgecss = [
  "@fullhuman/postcss-purgecss",
  {
    content: ["./pages/*.js", "./layouts/*.js", "./components/*.js"],
    whitelist: ["body"],

    // Include any special characters you're using in this regular expression
    defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
  },
];

module.exports = {
  plugins: [
    "postcss-import",
    "tailwindcss",
    "autoprefixer",
    ...(process.env.NODE_ENV === "production" ? [purgecss] : []),
  ],
};
