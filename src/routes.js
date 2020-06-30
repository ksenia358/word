import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import AddWords from './components/AddWords/AddWords';
import Tests from './components/Tests/Tests';
import InputTest from './components/Tests/TestsViews/InputTest';
import OptionsTest from './components/Tests/TestsViews/OptionsTest';

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/tests',
            component: Tests
        },
        {
            path: '/tests/option',
            component: OptionsTest
        },
        {
            path: '/tests/input',
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