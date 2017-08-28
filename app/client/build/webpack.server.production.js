import path from 'path'
import devConfig from '../../build/webpack.server.config.production'
import aliasConfig from './alias.config'

export default {
  ...devConfig,
  entry: {
    main: path.join(__dirname, '..', 'src/scripts/main-server.js')
  },
  resolve: {
    ...devConfig.resolve,
    alias: {
      ...devConfig.resolve.alias,
      ...aliasConfig
    }
  },
  plugins: [
    ...devConfig.plugins
  ]
}