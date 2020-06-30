import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import words from './modules/words';

export default new Vuex.Store({
    modules: {
        words
    }
});