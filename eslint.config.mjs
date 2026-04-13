import nextConfig from "eslint-config-next";

const config = [
  ...nextConfig,
  {
    languageOptions: {
      parserOptions: {
        warnOnUnsupportedTypeScriptVersion: false,
      },
    },
  },
];

export default config;
