import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import router from './router';

Vue.use(Vuex);

new Vue({
    el: '#application',
    router,
    render: h => h(App)
});