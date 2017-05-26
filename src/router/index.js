import Vue from 'vue'
import Router from 'vue-router'
import Bookshelf from '@/components/Bookshelf'
import Bookcat from '@/components/Bookcat'
import Rank from '@/components/Rank'
import Overview from '@/components/Overview'
import Ranklist from '@/components/Ranklist'
import RanklistDetail from '@/components/RanklistDetail'
import Book from '@/components/Book'
import ReadBook from '@/components/ReadBook'

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
        path: 'bookcat',
        name: 'bookcat',
        component: Bookcat
      }, {
        path: 'rank',
        name: 'rank',
        component: Rank
      }]
    },{
      path: '/readbook/:bookId',
      name: 'readbook',
      component: ReadBook
    },{
      path: '/book/:bookId',
      name: 'book',
      component: Book
    },{
      path: 'searchresult'
    },{
      path: '/ranklist',
      name: 'ranklist',
      component: Ranklist,
      children:[{
        path: '/ranklist/:id',
        name: 'RanklistDetail',
        component: RanklistDetail
      }]
    }
  ]
})
