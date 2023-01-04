const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const WebpackBundleAnalyzer = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const CompressionPlugin = require('compression-webpack-plugin');



module.exports = {
  mode:'development',
  entry: path.join(__dirname, "/client/src/index.jsx"),
  output: {
    path:path.join(__dirname, "/client/dist"),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /nodeModules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(css|less)$/,
        use: ["style-loader", "css-loader"]
      }
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
        },
      }),

    ],
    usedExports: true,
  },
  plugins: [
    new WebpackBundleAnalyzer(),
    new CompressionPlugin({
      algorithm: "gzip",
    }),

 ],
  resolve: {
    fallback: {
      url: require.resolve("url/"),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
    }
  }
};