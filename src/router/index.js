import Vue from 'vue'
import Router from 'vue-router'
import Bookshelf from '@/components/Bookshelf'
import Bookstore from '@/components/Bookstore'
import Rank from '@/components/Rank'
import Overview from '@/components/Overview'
import Ranklist from '@/components/Ranklist'
import RanklistDetail from '@/components/RanklistDetail'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Overview,
      redirect: '/bookshelf',
      children: [{
        path: 'bookshelf',
        name: 'bookshelf',
        component: Bookshelf,
      }, {
        path: 'bookstore',
        name: 'bookstore',
        component: Bookstore
      }, {
        path: 'rank',
        name: 'rank',
        component: Rank
      }]
    },{
      path: '/readbook'
    },{
      path: '/bookdetal'
    },{
      path: 'searchresult'
    },{
      path: '/ranklist',
      name: 'ranklist',
      component: Ranklist,
      children:[{
        path: 'weekRank/:id',
        name: 'weekRank',
        component: RanklistDetail
      },{
        path: 'monthRank/:id',
        name: 'monthRank',
        component: RanklistDetail
      },{
        path: 'totalRank/:id',
        name: 'totalRank',
        component: RanklistDetail
      }]
    }
  ]
})
