const path = require('path');
const webpack = require('webpack');

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
  resolve: {
    fallback: {
      url: require.resolve("url/"),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.REACT_APP_GIT_API': JSON.stringify('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')
    })
  ]
};