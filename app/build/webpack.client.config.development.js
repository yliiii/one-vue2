import webpack from 'webpack'
import HtmlWebpackHarddiskPlugin from 'html-webpack-harddisk-plugin'
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin'
import VueSSRClientPlugin from 'vue-server-renderer/client-plugin'
import baseConfig, { ROOT_DIR } from './webpack.config.base.js'

export default {
  ...baseConfig,
  devtool: '#source-map',
  entry: {
    hot: 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'
  },
  resolve: {
    ...baseConfig.resolve
  },
  plugins: [
    ...baseConfig.plugins,
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"client"'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: function (module) {
        // a module is extracted into the vendor chunk if...
        return (
          // it's inside node_modules
          /node_modules/.test(module.context) &&
          // and not a CSS file (due to extract-text-webpack-plugin limitation)
          !/\.css$/.test(module.request)
        )
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // new webpack.LoaderOptionsPlugin({
    //   debug: true
    // }),
    new HtmlWebpackHarddiskPlugin(), // HtmlWebpackPlugin保持将模板输出到指定目录，防止server render时找不到对应模板文件
    new FriendlyErrorsPlugin(),
    new VueSSRClientPlugin()
  ]
}