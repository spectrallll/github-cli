const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const autoprefixer = require("autoprefixer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TsCheckerPlugin = require("fork-ts-checker-webpack-plugin");

const buildPath = path.resolve(__dirname, "dist");
const srcPath = path.resolve(__dirname, "src");

const isProd = process.env.NODE_ENV === "production";

const getStyleOptions = (withModules = false) => {
  return [MiniCssExtractPlugin.loader, !withModules ? "css-loader" : {
    loader: "css-loader",
    options: {
      modules: {
        localIdentName: !isProd ? '[path][name]__[local]' : '[hash:base64]'
      }
    },
  }, {
    loader: "postcss-loader",
    options: {
      postcssOptions: {
        plugins: [autoprefixer]
      }
    }
  }, "sass-loader"];
}

module.exports = {
  entry: path.join(srcPath, "index.tsx"),
  target: !isProd ? "web" : "browserslist",
  devtool: isProd ? "hidden-source-map" : "eval-source-map",
  output: {
    path: buildPath,
    filename: "bundle.js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(srcPath, "index.html")
    }),
    !isProd && new ReactRefreshWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name]-[hash].css"
    }),
    new TsCheckerPlugin()
  ].filter(Boolean),
  module: {
    rules: [
      {
        test: /\.module.s?css$/,
        use: getStyleOptions(true)
      },
      {
        test: /\.s?css$/,
        exclude: /\.module.s?css$/,
        use: getStyleOptions()
      },
      {
        test: /\.[tj]sx?$/,
        use: "babel-loader"
      },
      {
        test: /\.(png|svg|jpg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024
          }
        }
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".js", ".jsx", ".ts", ".scss"],
    alias: {
      "@components": path.join(srcPath, "components"),
      "@styles": path.join(srcPath, "styles"),
      "@store": path.join(srcPath, "store"),
      "@utils": path.join(srcPath, "utils"),
      "@config": path.join(srcPath, "config")
    }
  },
  devServer: {
    host: "127.0.0.1",
    port: 4444,
    hot: true,
    historyApiFallback: true
  }
}