import { getWrappedPromise } from 'controller/promiseCtl'
import { getApiUrl } from './UrlManager'

const MAX_WAITING_TIME = 30000
const HTTP_STATUS = {
  CLIENT_ERROR: 400,	// 客户端错误
  AUTHENTICATE: 401,	// 认证错误
  SERVER_ERROR: 500	// 服务器错误
}
const defaultFetchConfig = {
  method: 'GET',
  mode: 'cors',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8'
  },
  credentials: 'include' // Fetch 请求默认是不带 cookie 的，需要设置 fetch(url, {credentials: 'include'})
}

require('es6-promise').polyfill()
const iFetch = require('isomorphic-fetch')

export default class BaseApiService {
  fetchApi(api, args, config = {}) {
    config.headers = {
      ...defaultFetchConfig.headers,
      ...config.headers
    }

    if (config.body) {
      config.body = JSON.stringify(config.body)
    }

    let wrappedPromise = getWrappedPromise()
    let url = getApiUrl(api, args, this.MODULE)
    let timeoutId = setTimeout(() => {
      wrappedPromise.reject(new Error('fetch timeout' + ' ' + url)) // reject on timeout
    }, MAX_WAITING_TIME)
    console.log('------------' + url)
    iFetch(url, {
      ...defaultFetchConfig,
      ...config
    }).then(response => {
      clearTimeout(timeoutId)
      wrappedPromise.resolve(response)
    }).catch(error => {
      clearTimeout(timeoutId)
      wrappedPromise.reject(error)
    })

    return wrappedPromise
  }

  async fetch(api, args, config = {}) {
    try {
      let res = await this.fetchApi(api, args, config)
      let { status } = res

      switch (status) {
        case HTTP_STATUS.AUTHENTICATE:
        case HTTP_STATUS.CLIENT_ERROR:
        case HTTP_STATUS.SERVER_ERROR:
          return Promise.reject({ status: status, data: null, message: '认证错误' })
        default: 
          if (status !== 200) {
            return Promise.reject({ status: status, data: null, message: '' })
          }
      }

      res = await res.json()
      res = res || { status: -200, message: '' }

      if (res.status !== 0) {
        return Promise.reject({ status: res.status, data: res.data, message: res.message, serverTime: res.time })
      }

      return Promise.resolve(res.data)
    } catch (e) {
      if (process.env.NODE_ENV === 'development') {
        console.error(e)
      }
      return Promise.reject({ status: -999, message: e.message })
    }
  }
}