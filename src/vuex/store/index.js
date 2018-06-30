import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state:{
        number:0,
        name:2048,
    },
    mutations:{
        increment:state=>state.number++,
    },
})

export default store;