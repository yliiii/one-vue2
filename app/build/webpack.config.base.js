import path from 'path'
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import precss from 'precss'
import autoprefixer from 'autoprefixer'
import aliasBaseConfig from './alias.config.base'

export const APP_ROOT_DIR = path.resolve(__dirname, '..')
export const ROOT_DIR = path.resolve(__dirname, '../..')
export const postCssLoader  = {
  loader: 'postcss-loader',
  options: {
    plugins: function () {
      return [
        precss(),
        autoprefixer({
          browsers: ['> 1%', 'IE 8']
        })
      ]
    }
  }
}

export default {
  output: {
    path: path.resolve(ROOT_DIR, "dist"),
    publicPath: "/dist/",
    filename: "[name]-[hash:8].js",
    chunkFilename: "[name]-[chunkhash:8].js"
  },
  resolve: {
    modules: ["node_modules"],
    extensions: [".js", ".vue", ".styl"],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      ...aliasBaseConfig
    }
  },
  module: {
    noParse: /\.min\.js/,
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        exclude: /node_modules/,
        options: {
          loaders: {
            css: ExtractTextPlugin.extract({
              use: [
                "css-loader?modules&sourceMap&importLoaders=1&localIdentName=[local]_[hash:5]",
                postCssLoader,
                "stylus-loader"
              ]
            })
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        use: ["url-loader?limit=10000&mimetype=application/font-woff"]
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: ["url-loader?limit=10000&mimetype=application/octet-stream"]
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: ["file-loader"]
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: ["url?limit=10000&mimetype=image/svg+xml"]
      },
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            "css-loader?modules&sourceMap&importLoaders=1&localIdentName=[local]_[hash:5]",
            postCssLoader,
            "stylus-loader"
          ]
        })
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            "css-loader?modules&sourceMap&importLoaders=1&localIdentName=[local]_[folder]",
            postCssLoader
          ]
        })
      },
      {
        test: /\.ejs$/,
        loader: "raw-loader" // 防止HtmlWebpackPlugin破坏ejs模板语法
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "[name]-[chunkhash:8].css",
      allChunks: true
    }),
    new webpack.ProvidePlugin({
      _: "underscore"
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(ROOT_DIR, "server/templates/main.ejs"),
      filename: path.resolve(ROOT_DIR, "server/templates/index.ejs"),
      alwaysWriteToDisk: true, // 配合html-webpack-harddisk-plugin插件始终将生成的文件输出到指定目录
      excludeChunks: ["hot"]
    })
  ]
};

