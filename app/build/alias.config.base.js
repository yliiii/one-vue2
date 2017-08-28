const path = require('path') // node端在babel之前也会使用所以这里不能用import方式

const ROOT_PATH = path.resolve(__dirname, '../..')

module.exports = {
  controller: path.join(__dirname, '..', 'common/controller/src'),
  service: path.join(__dirname, '..', 'common/service/src'),
  ui: path.join(__dirname, '..', 'common/ui/src/'),
  "ui-base": path.join(__dirname, '..', 'common/ui/src/base'),
  utils: path.join(__dirname, '..', 'common/utils/src'),
  "server-bin": path.resolve(ROOT_PATH, 'bin'),
  "server-router": path.resolve(ROOT_PATH, 'router'),
  "server-controller": path.resolve(ROOT_PATH, 'controller'),
  "server": path.resolve(ROOT_PATH, 'server')
}