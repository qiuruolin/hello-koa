const fs = require('fs')

function addMapping(router, mapping){
  let path = ''
  for(let url in mapping){
    if(url.startsWith('GET')){
      path = url.substring(4)
      router.get(path, mapping[url])
      console.log(`register URL mapping: GET ${path}`)
    }
    else if(url.startsWith('POST')){
      path = url.substring(5)
      router.post(path, mapping[url])
      console.log(`register URL mapping: POST ${path}`)
    }
    else{
      console.log(`invalid URL: ${url}`)
    }
  }
}

function addControllers(router){
  const files = fs.readdirSync(__dirname + '/router/')
  const js_files = files.filter(f => {
    return f.endsWith('.js')
  })

  for(let f of js_files){
    console.log(`process controlles: ${f}...`)
    let mapping = require(__dirname + '/router/' + f)
    addMapping(router, mapping)
  }
}

module.exports = function(dir){
  let controllers_dir = dir || 'controllers'
  let router = require('koa-router')()
  addControllers(router, controllers_dir)
  return router.routes()
}