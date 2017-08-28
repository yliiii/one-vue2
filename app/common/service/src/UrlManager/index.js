import serverConfig from 'server-bin/config/default'
import format from 'string-template'

var configure = {}

export function getApiUrl(api, params, module = 'global') {
  if (!configure[module]) configure[module] = require(`./url.${module}.config.json`)
  const apiUrl = configure[module][api]
  
  return apiUrl ? `http://localhost:${serverConfig.port}/api${module === 'global' ? '' : '/' + module}${format(apiUrl, params)}` : ''
}

export default configure
