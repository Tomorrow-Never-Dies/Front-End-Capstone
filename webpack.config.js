const path = require('path');

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
<<<<<<< HEAD
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
=======
        test: /\.(css|less)$/,
        use: ["style-loader", "css-loader"]
      }
>>>>>>> 50b1b6036aff4a1f71225554f2100a922cd3cc8b
    ],
  },
};