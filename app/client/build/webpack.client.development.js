import path from 'path'
import devConfig from '../../build/webpack.client.config.development'
import aliasConfig from './alias.config'

export default {
  ...devConfig,
  entry: {
    ...devConfig.entry,
    main: path.join(__dirname, '..', 'src/scripts/main-client.js')
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