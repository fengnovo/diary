// server端需要把访问路径给vue-router
const createApp = require('./app.js');

module.exports = (context) => {
    return new Promise((resolve,reject) => {
        let {vueApp, vueRouter} = createApp(context);
        console.log(context.url);
        vueRouter.push(context.url);
        vueRouter.onReady(()=>{
            let matchedComponents = vueRouter.getMatchedComponents();
            console.log(matchedComponents);
            if (!matchedComponents) {
                return reject({code: 404});
            }
            resolve(vueApp);
        }, reject);
    })
}