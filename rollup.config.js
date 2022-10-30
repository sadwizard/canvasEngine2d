import process from 'process';
import typescript from '@rollup/plugin-typescript';
import { terser } from "rollup-plugin-terser";

const isProduction = process.env.PROD;

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/bundle.js',
    format: 'iife',
  },
  plugins: [
    typescript({ compilerOptions: {lib: ["es5", "es6", "dom"], target: "es5"}}),
    (isProduction && terser()),
  ].filter(Boolean),
};