import { uglify } from "rollup-plugin-uglify";

module.exports = [
  {
    input: 'src/main.js',
    output: {
      file: 'bundle.js',
      format: 'cjs',
    },
  },
  {
    input: 'src/main.js',
    output: {
      file: 'bundle-min.js',
      format: 'cjs',
    },
    plugins: [uglify()],
  }
];
