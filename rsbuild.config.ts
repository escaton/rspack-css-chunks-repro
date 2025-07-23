import { defineConfig } from "@rsbuild/core";

export default defineConfig({
  output: {
    distPath: {
      root: "./rsbuild-dist",
    },
  },
  performance: {
    chunkSplit: {
      strategy: "custom",
      splitChunks: {
        cacheGroups: {
          critical: {
            /*
              Bug/feature-request #1
              I'm trying to split modules with "critial" in the name into single seprate chunks.
              One critical chunk for each js chunk
              That works as expected with `name: undefined`
              But as soon as I want to mark these chunks with some suffix, like `[chunkId].critical`, problems begin
              I cannot replicate the `undefined` behavior:
                - if I return `name: 'critical`, I get single critical chunk for all my dynamic chunks 🚫
                - if I use callback, the chunks argument has no id for dynamic chunks, until I gave it a "webpackChunkName" magic comment
            */
            // name: (module, chunks) => {
            //   if (!chunks[0].id) {
            //     throw new Error('give dynamic chunk a name!')
            //   }
            //   return `${chunks[0].name}.critical`;
            // },
            chunks: "all",
            /* Bug #2: the regexp doesn't work for module.type === 'css/mini-extract' */
            // test: /critical/,
            // but somehow, the identifier is available if called inside callback
            test: (module) => module.identifier().includes("critical"),
            enforce: true,
          },
        },
      },
    },
  },
});
