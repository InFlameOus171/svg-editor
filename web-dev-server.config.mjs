// import { hmrPlugin, presets } from '@open-wc/dev-server-hmr';
import rollupReplace from '@rollup/plugin-replace';
import { fromRollup } from '@web/dev-server-rollup';
import { esbuildPlugin } from '@web/dev-server-esbuild';

const replace = fromRollup(rollupReplace);
/** Use Hot Module replacement by adding --hmr to the start command */
const hmr = process.argv.includes('--hmr');

export default /** @type {import('@web/dev-server').DevServerConfig} */ ({
  open: './src',
  /** Use regular watch mode if HMR is not enabled. */
  watch: !hmr,
  /** Resolve bare module imports */
  nodeResolve: {
    exportConditions: ['browser', 'development'],
  },

  /** Compile JS for older browsers. Requires @web/dev-server-esbuild plugin */
  // esbuildTarget: 'auto'

  /** Set appIndex to enable SPA routing */
  // appIndex: 'demo/index.html',

  plugins: [
    replace({
      include: ['src/**/*.js'],
      __environment__: '"development"',
      preventAssignment: true,
    }),
    esbuildPlugin({ ts: true, target: 'auto' }),
  ],

  // See documentation for all available options
});
