import typescript from 'rollup-plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/index.ts', // Your entry file
  output: {
    file: 'dist/bundle.js', // Output file
    format: 'cjs' // CommonJS module format
  },
  plugins: [
    typescript(), // Transpile TypeScript
    nodeResolve(), // Resolve node_modules
    commonjs() // Convert CommonJS to ES6
  ]
};
