const resolve = require("@rollup/plugin-node-resolve").default;
const commonjs = require("@rollup/plugin-commonjs");
const { babel } = require("@rollup/plugin-babel");
const postcss = require("rollup-plugin-postcss");
const pkg = require("./package.json");

module.exports = {
  input: "src/index.js",
  output: [
    { file: pkg.main, format: "cjs", sourcemap: true },
    { file: pkg.module, format: "esm", sourcemap: true },
  ],
  external: ["react", "react-dom"], // <- important: do not bundle React
  plugins: [
    postcss({
      extensions: [".css"],
    }),
    resolve({ extensions: [".js", ".jsx"] }),
    babel({
      babelHelpers: "bundled",
      exclude: "node_modules/**",
      extensions: [".js", ".jsx"],
      presets: ["@babel/preset-react"],
    }),
    commonjs(), // run after babel
  ],
};
