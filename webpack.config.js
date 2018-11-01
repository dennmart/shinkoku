const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    historyApiFallback: true,
    publicPath: '/assets'
  },
  output: {
    path: path.resolve(__dirname, 'dist', 'assets')
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/react']
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new BundleAnalyzerPlugin()
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  }
};