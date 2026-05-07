import { Elysia, file } from 'elysia'
import { staticPlugin } from '../src/index'
import { node } from '@elysiajs/node'
import { isBun } from '../src/utils'
import { req } from '../test/utils'
;(async () => {
    const app = new Elysia(isBun ? {} : { adapter: node() })
        .onError(() => {})
        .get('/*', () => {
            // if (Math.random() < 0.3) return 'hi'
            return file('nonexistent')
        })
        // .use(
        //     staticPlugin({
        //         prefix: '/public',
        //         assets: 'public/html',
        //         alwaysStatic: false,
        //         bunFullstack: false
        //         // staticLimit: 1
        //     })
        // )
        .listen(3001)
    await app.modules
    // const res = await app.handle(new Request(`http://localhost`))
    // console.log(res.status)
    console.log(app.routes)
})() // no top-level awaits allowed for cjs (error triggered by `bun dev:node`) (idk how to fix this)
