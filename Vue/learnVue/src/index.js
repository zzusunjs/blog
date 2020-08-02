// this is the entry of entire project

import Vue from 'vue';
import App from './App.vue';
import router from './router';

console.log("running");

new Vue({
    el: '#app', // #app is a div at index.html
    router,
    // components: {App},
    // template: '<App/>'  // still dont know what the params mean
    render: h => h(App)
});