const Koa = require('koa')
// //添加koa-router处理url
// const router = require('koa-router')()
//添加koa-bodyparser用来处理post的数据
const bodyParser = require('koa-bodyparser')
const controllers = require('./controllers/index')

const app = new Koa()

app.use(bodyParser())

app.use(async(ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`)
    await next()
})


app.use(controllers())

app.listen(3000)
console.log('app started at port 3000...')