import path from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { CssExtractRspackPlugin } from "@rspack/core";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isRunningWebpack = !!process.env.WEBPACK;
const isRunningRspack = !!process.env.RSPACK;
if (!isRunningRspack && !isRunningWebpack) {
  throw new Error("Unknown bundler");
}

/**
 * @type {import('webpack').Configuration | import('@rspack/cli').Configuration}
 */
const config = {
  mode: "development",
  devtool: false,
  entry: {
    main: "./src/index",
  },
  plugins: [new HtmlWebpackPlugin()],
  output: {
    clean: true,
    path: isRunningWebpack
      ? path.resolve(__dirname, "webpack-dist")
      : path.resolve(__dirname, "rspack-dist"),
    filename: "[name].js",
  },
  experiments: {
    css: true,
    layers: true,
  },
  module: {
    rules: [
      {
        test: /\.css/,
        oneOf: [
          {
            resourceQuery: /critical/,
            use: [
              {
                loader: CssExtractRspackPlugin.loader,
                options: {
                  layer: "css-critical",
                },
              },
              "css-loader",
            ],
            type: "javascript/auto",
          },
          {
            use: [
              {
                loader: CssExtractRspackPlugin.loader,
              },
              "css-loader",
            ],
            type: "javascript/auto",
          },
        ],
      },
    ],
  },
  plugins: [new CssExtractRspackPlugin()],
  optimization: {
    splitChunks: {
      cacheGroups: {
        critical: {
          name: "critical",
          chunks: "all",
          // doesn't catch css files
          layer: "css-critical",
          enforce: true,
        },
      },
    },
  },
};

export default config;
