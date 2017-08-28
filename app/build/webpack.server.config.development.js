import path from 'path'
import webpack from 'webpack'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin'
import VueSSRServerPlugin from 'vue-server-renderer/server-plugin'
import baseConfig, { ROOT_DIR } from './webpack.config.base.js'

export default {
  ...baseConfig,
  target: 'node',
  devtool: '#source-map',
  output: {
    ...baseConfig.output,
    libraryTarget: 'commonjs2'
  },
  resolve: {
    ...baseConfig.resolve
  },
  plugins: [
    ...baseConfig.plugins,
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"'
    }),
    new CleanWebpackPlugin(['server/templates/index.ejs'], {
      // Absolute path to your webpack root folder (paths appended to this)
      // Default: root of your package
      root: path.resolve(__dirname, '../..'),

      // Write logs to console.
      verbose: true,
      
      // Use boolean "true" to test/emulate delete. (will not remove files).
      // Default: false - remove files
      dry: false,           

      // If true, remove files on recompile. 
      // Default: false
      watch: false,

      // Instead of removing whole path recursively,
      // remove all path's content with exclusion of provided immediate children.
      // Good for not removing shared files from build directories.
      exclude: [ 'files', 'to', 'ignore' ]
    }),
    new FriendlyErrorsPlugin(),
    new VueSSRServerPlugin()
  ]
}