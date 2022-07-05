// import { hmrPlugin, presets } from '@open-wc/dev-server-hmr';

import { fromRollup } from '@web/dev-server-rollup';
import rollupReplace from '@rollup/plugin-replace';
import copy from 'rollup-plugin-copy';

const replace = fromRollup(rollupReplace);

/** Use Hot Module replacement by adding --hmr to the start command */
const hmr = process.argv.includes('--hmr');

export default /** @type {import('@web/dev-server').DevServerConfig} */ ({
  open: '/',
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
    /** Fix for xstate */
    replace({
      preventAssignment: true,
      include: ['node_modules/xstate/**/*.js'],
      'process.env.NODE_ENV': process.env.NODE_ENV,
    }),
    copy({
      targets: [{ src: 'xstate', dest: 'dist' }],
    }),
  ],

  // See documentation for all available options
});
