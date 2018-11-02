const Koa = require('koa')
//添加koa-router处理url
const router = require('koa-router')()
//添加koa-bodyparser用来处理post的数据
const bodyParser = require('koa-bodyparser')

const app = new Koa()

app.use(bodyParser())

app.use(async(ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`)
    await next()
})

router.get('/hello/:name', async(ctx, next) => {
    const name = ctx.params.name
    ctx.response.body = `<h1>Hello, ${name}!</h1>`
})

router.get('/', async(ctx, next) => {
    ctx.response.body = `<h1>Index</h1>
        <form action="/signin" method="post">
            <p>Name: <input name="name" value="koa"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`;
})

router.post('/signin', async(ctx, next) => {
    const name = ctx.request.body.name || ''
    const password = ctx.request.body.password || ''
    console.log(`signin with name: ${name}, password: ${password}`)
    if(name === 'koa' && password === '12345'){
        ctx.response.body = `<h1>Welcome, ${name}!</h1>`
    }
    else{
        ctx.response.body = `<h1>Login failed</h1>
        <p><a href="/">Try Again</a></p>`
    }
})

app.use(router.routes())

app.listen(3000)
console.log('app started at port 3000...')