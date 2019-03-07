import Vue from 'vue';
import Router from 'vue-router'
import Header from '@/components/Header'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
    routes:[
        {
            path:'/Header',
            name:'Header',
            component:Header
        },
        {
            path:'/',
            name:'Login',
            component:Login
        }
    ]
})