import { uglify } from "rollup-plugin-uglify";
import resolve from 'rollup-plugin-node-resolve';
import commonJS from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import process from 'process';


const plugins = [
  resolve(),
  commonJS({ include: 'node_modules/**' }),
  babel({
    exclude: 'node_modules/**',
    presets: [
      '@babel/preset-env'
    ]
  }),
  uglify()
];

const targetDev = {
  input: 'src/index.js',
  output: {
    file: 'bundle.js',
    format: 'cjs',
  },
  plugins: plugins.slice(0, -1),
};

const targetProd = {
  input: 'src/index.js',
  output: {
    file: 'bundle-min.js',
    format: 'cjs',
  },
  plugins: plugins,
};


const target = process.env.DEV ? [targetDev] : [targetDev, targetProd];
module.exports = target;
