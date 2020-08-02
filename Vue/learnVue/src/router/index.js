import Vue from 'vue';
import Router from 'vue-router';
import Main from "../components/main.vue";

Vue.use(Router);
// 使用 vue-router 作为路由, 具体用法还要再查

export default new Router({
    routes: [
        {
            path: '/',
            name: 'main',
            component: Main,
        }
    ]
});

// router/index.js 可以视作真正的入口