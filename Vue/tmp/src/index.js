import Vue from 'vue';
import App from './App.vue';
import router from './router';

new Vue({
    el: '#application',
    router,
    render: h => h(App)
});