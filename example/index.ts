import { Elysia, file } from 'elysia'
import { staticPlugin } from '../src/index'
import { node } from '@elysiajs/node'
import { isBun } from '../src/utils'
import { req } from '../test/utils'
;(async () => {
    const app = new Elysia(isBun ? {} : { adapter: node() })
        .use(
            staticPlugin({
                prefix: '',
                assets: 'public',
                alwaysStatic: false,
                bunFullstack: true,
                decodeURI: false
                // staticLimit: 1
            })
        )
        .listen(3001)
    await app.modules
    console.log(app.routes)
})() // no top-level awaits allowed for cjs (error triggered by `bun dev:node`) (idk how to fix this)
