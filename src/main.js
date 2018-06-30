import './css/main.css';
import Vue from 'vue';
import App from './Game.vue';
import store from './vuex/store';

new Vue({
    el: "#root",
    store,
    render: h => h(App)
});

