const Vue = require('vue');
const createRouter = require('./router');

module.exports = (context)=> {
    const vueRouter = createRouter();
    const vueApp = new Vue({
        router: vueRouter,
        template: `
            <div>
                <ul>
                    <router-link to='/'>首页</router-link>
                    <router-link to='/about'>关于</router-link>
                </ul>
                <div>Hello World!{{msg}},当前访问路径是{{url}}</div>
                <router-view></router-view>
            </div>
        `,
        data: {
            msg: 'ok',
            url: context.url
        }
    })
    return {
        vueApp,
        vueRouter
    }
}