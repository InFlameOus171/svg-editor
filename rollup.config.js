// Import rollup plugins
import html from '@web/rollup-plugin-html';
import { copy } from '@web/rollup-plugin-copy';
import resolve from '@rollup/plugin-node-resolve';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import commonjs from '@rollup/plugin-commonjs';

export default {
  plugins: [
    // Entry point for application build; can specify a glob to build multiple
    // HTML files for non-SPA app
    html({
      input: './src/index.html',
    }),
    // Resolve bare module specifiers to relative paths
    // github - crypto wurde nicht richtig geladen
    // https://github.com/open-wc/open-wc/issues/1534
    resolve({ browser: 'true' }),
    // Minify HTML template literals
    minifyHTML(),
    commonjs(),
    // Optional: copy any static assets to build directory
    copy({
      patterns: ['./public/images/*'],
    }),
  ],
  output: {
    dir: 'build',
  },
  preserveEntrySignatures: 'strict',
};
