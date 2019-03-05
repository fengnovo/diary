const express = require('express');
const app = express();
const Vue = require('vue');
const fs = require('fs');
const path = require('path');
const App = require('./src/entry.server.js');
const vsr = require('vue-server-renderer');

// Renderer对象
// const vueServerRenderer = require('vue-server-renderer').createRenderer();
const vueServerRenderer = vsr.createRenderer({
    template: fs.readFileSync(path.join(__dirname, './index.html'), 'utf-8')
});


// app.get('*', (req, res) => {
//     res.status(200);
//     res.setHeader('Content-Type', 'text/html;charset=utf-8;');
//     vueServerRenderer.renderToString(App()).then(data => {
//         let html = 
//         `
//         <!DOCTYPE html>
//         <html lang="en">
//         <head>
//             <meta charset="UTF-8">
//             <meta name="viewport" content="width=device-width, initial-scale=1.0">
//             <meta http-equiv="X-UA-Compatible" content="ie=edge">
//             <title>Document</title>
//         </head>
//         <body>
//             ${data}
//         </body>
//         </html>
//         `
//         res.end(html);
//     }).catch(e => {
//         console.error('失败');
//     });
    
// });


app.get('*', async (req, res) => {
    res.status(200);
    res.setHeader('Content-Type', 'text/html;charset=utf-8;');
    
    let vueApp = await App({url: req.url});
    vueServerRenderer.renderToString(vueApp).then(html => {
        res.end(html);
    }).catch(e => {
        console.error('失败', e);
    });
    
});

app.listen(3000, ()=>{
    console.log('服务器3000端口已启动。');
});
