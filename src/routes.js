import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import AddWords from './components/AddWords/AddWords';
import InputTest from './components/Tests/InputTest';
import OptionsTest from './components/Tests/OptionsTest';

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/test',
            component: OptionsTest
        },
        {
            path: '/test-inp',
            component: InputTest
        },
        {
            path: '/add',
            component: AddWords
        },
        {
            path: '',
            redirect: '/add'
        }
    ]
});