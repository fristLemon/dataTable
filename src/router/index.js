import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Table11 from '@/components/table'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },{
      path: '/table11',
      name: 'Table11',
      component: Table11
    }
  ]
})
