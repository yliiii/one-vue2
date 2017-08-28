import path from 'path'

const rootPath = path.join(__dirname, '../..')
export default {
  rootPath,
  publicPath: '/dist',
  staticPath: '/dist/assert',
  port: 3000,
  db: {}
}
