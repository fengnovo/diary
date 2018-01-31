const Vue = require('vue')
const express = require('express')
const server = express()
const renderer = require('vue-server-renderer').createRenderer()
server.use(express.static('src/static'))
server.use(express.static('dist'))
server.get('/', (req, res) => {
  const app = new Vue({
    data: {
      url: req.url
    },
    template: `<div>访问的 URL 是： {{ url }}</div>`
  })
  renderer.renderToString(app, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      return
    }
    res.end(`
      <!DOCTYPE html>
      <html>
        <head>
        	<meta charset="utf-8">
        	<title>Hello</title>
        </head>
        <body>${html}</body>
      </html>
    `)
  })
})

server.use(function(req, res, next) {
  	res.status(404).send('404! 找不到相关资源！')
})

/**
 * 如何设置一个错误处理器？
	server.use(function(err, req, res, next) {
	  	console.error(err.stack)
	  	res.status(500).send('服务器出错')
	})
 */



server.listen(8080)