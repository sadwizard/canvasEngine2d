// import process from 'process';
import typescript from '@rollup/plugin-typescript';

const plugins = [
  typescript({ compilerOptions: {lib: ["es5", "es6", "dom"], target: "es5"}})
];

// const targetDev = {
//   input: 'src/index.ts',
//   output: {
//     file: 'bundle.js',
//     format: 'iife',
//   },
//   plugins: plugins,
// };

// const targetProd = {
//   input: 'src/index.js',
//   output: {
//     file: 'bundle.js',
//     format: 'iife'
//   },
//   plugins: plugins,
// };

// const target = process.env.DEV ? targetDev : targetProd;

// export default target;

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/bundle.js',
    format: 'iife',
  },
  plugins: plugins,
};