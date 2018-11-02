// 处理用户管理相关url
const fn_hello = async(ctx, next) => {
    const name = ctx.params.name
    ctx.response.body = `<h1>Hello, ${name}!</h1>`
}

module.exports = {
    'GET /hello/:name': fn_hello
}