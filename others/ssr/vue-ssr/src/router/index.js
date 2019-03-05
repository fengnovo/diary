const VueRouter = require('vue-router');
const Vue = require('vue');

Vue.use(VueRouter);

module.exports = () => {
    return new VueRouter({
        mode: 'history',
        routes: [
            {
                path: '/',
                name: 'home',
                component: {
                    template: `<div>Home</div>`
                }
            },
            {
                path: '/about',
                name: 'about',
                component: {
                    template: `<div>About</div>`
                }
            }
        ]
    });
}