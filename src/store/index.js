import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

import Cart from './modules/cart'
import Auth from './modules/auth'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})

export default new Vuex.Store({
    modules: {
        Cart,
        Auth,
    },
    plugins: [vuexLocal.plugin]
})