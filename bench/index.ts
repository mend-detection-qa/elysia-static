import { Bench } from 'tinybench'
import { Elysia } from 'elysia'
import { staticPlugin } from '../src'
import { req } from '../test/utils'

const bench = new Bench({ time: 10000 })

const app = new Elysia().use(
    staticPlugin({
        assets: 'public',
        prefix: 'public',
        indexHTML: true,
        bunFullstack: false,
        alwaysStatic: false
    })
)
await app.modules
console.log(app.routes)
bench.add('route caching', async () => {
    await app.modules
    const htmlPaths = [
        '/public/html',
        '/public/html/',
        '/public/html/index.html',
        '/public/html/index.html/'
    ]
    for (const path of htmlPaths) {
        // console.log(path)
        const res = await app.handle(req(path))
        // await (await res.blob()).text()
    }
})

await bench.run()
// console.log(bench.name)
console.table(bench.table())
