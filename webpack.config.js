const path = require('path');
var webpack = require('webpack');
var dotenv = require('dotenv').config({path: __dirname + '/.env'});

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
      'process.env.REACT_APP_IMGBB_API':JSON.stringify('32afd28d526fb3f23e543894fbad7e6e')
    })
  ]
};