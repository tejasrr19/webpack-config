const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/index.js", // single entry
  output: {
    path: path.join(__dirname, "build"),
    filename: "[name].[contenthash].js", // hashed bundle file
    publicPath: "/build"
  },
  module: {
    rules: [
      {
        test: /\.scss$/, // handle scss
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "/build"
            }
          },
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "sass-loader" }
        ]
      },
      {
        test: /\.js$/, // handle JS files
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.jsx?$/, // handle JSX files
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.(png|gif|jp(e*)g)$/, // handle images
        use: {
          loader: "url-loader"
        }
      },
      {
        test: /\.svg$/, // handle SVG files
        use: {
          loader: "url-loader",
          options: {
            limit: 1000000 // < 1MB return base64 encoded string
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Caching"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
};
