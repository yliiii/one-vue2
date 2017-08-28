import api from './api'
import serverRender from '../server/renderer'

export default function(renderer) {
  return async (ctx, next) => {
    console.log('--------> request: ', ctx.url)

    // api server through koa-router
    if (ctx.path.match(/^\/api/)) {
      return await api.routes()(ctx, next)
    }

    // others render
    await serverRender(renderer, ctx, next)
  }
}