import path from 'path'
import { createBundleRenderer } from 'vue-server-renderer'
import { ROOT_PATH } from 'server-bin/config/path'

async function renderToString(renderer, options) {
  return new Promise((resolve, reject) => {
    renderer.renderToString(options, (err, html) => {
      if (err) {
        reject(err)
      } else {
        resolve(html)
      }
    })
  })
}

async function responseRenderer(renderer, ctx, next) {
  try {
    let html = await renderToString(renderer, {
      url: ctx.url
    })

    await ctx.render('index', {
      title: 'vue',
      gData: {},
      html
    })
  } catch (e) {
      // if (e.url) {
      //   ctx.redirect(e.url)
      // }

      if(e.code === 404) {
        await ctx.render('404', { html: 'Page Not Found !!!' })
      } else {
        console.error(`error during render : ${ctx.url}`)
        console.error(e.stack)

        await ctx.render('500', {
          html: 'Internal Server Error !!!'
        })
      }
  }
}

export function createRenderer (bundle, options) {
  // https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#why-use-bundlerenderer
  return createBundleRenderer(bundle, Object.assign(options, {
    // this is only needed when vue-server-renderer is npm-linked
    basedir: path.resolve(ROOT_PATH, 'dist'),
    // recommended for performance
    runInNewContext: false
  }))
}

export default async (renderer, ctx, next) => {
  await responseRenderer(renderer, ctx, next)
}
