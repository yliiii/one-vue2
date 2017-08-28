import path from 'path'
import views from 'koa-views'
import json from 'koa-json'
import logger from 'koa-logger'
import convert from 'koa-convert'
import Bodyparser from 'koa-bodyparser'
import router from 'server-router'

const templatePath = path.join(__dirname, 'templates')

export default (app, renderer) => {
  // error logger
  app.on('error', function (err, ctx) {
    console.log('--------> error occured:', err.stack)
  })

  // reg middlewares
  app.use(Bodyparser())
  app.use(json())
  app.use(logger())

  // template ejs
  app.use(views(templatePath, { extension: 'ejs' }))

  // render dispatcher
  app.use(router(renderer))

  // logger
  if (app.env === 'development') {
    app.use(async (ctx, next) => {
      const start = new Date()
      await next()
      const ms = new Date() - start
      console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
    })
  }
}
