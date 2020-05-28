import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import TodayReport from '@/components/todayReport'
import IndexV2 from '@/components/indexV2'
import Backstage from '@/components/backstage'
import Table11 from '@/components/table'
import Ajax from '@/components/ajax'
import treeData from '@/components/treeData'
import Search from '@/components/search'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },{
      path: '/todayReport',
      name: 'todayReport',
      component: TodayReport
    },{
      path: '/v2',
      name: 'indexV2',
      component: IndexV2
    },{
      path: '/backstage',
      name: 'backstage',
      component: Backstage
    },{
      path: '/table11',
      name: 'Table11',
      component: Table11
    },{
      path: '/ajax',
      name: 'Ajax',
      component: Ajax
    },{
      path: '/treeData',
      name: 'treeData',
      component: treeData
    },{
      path: '/search',
      name: 'Search',
      component: Search
    }
  ]
})
