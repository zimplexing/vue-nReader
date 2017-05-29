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
import Search from '@/components/Search'
import BookcatDetail from '@/components/BookcatDetail'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: Overview,
      redirect: '/bookshelf',
      children: [{
        path: '/bookshelf',
        name: 'bookshelf',
        component: Bookshelf
      }, {
        path: '/bookcat',
        name: 'bookcat',
        component: Bookcat
      }, {
        path: '/rank',
        name: 'rank',
        component: Rank
      }]
    }, {
      path: '/bookcat/detail',
      name: 'bookcatDetail',
      component: BookcatDetail
    }, {
      path: '/readbook/:bookId',
      name: 'readbook',
      component: ReadBook
    }, {
      path: '/book/:bookId',
      name: 'book',
      component: Book
    }, {
      path: '/search',
      name: 'search',
      component: Search
    }, {
      path: 'searchresult'
    }, {
      path: '/ranklist',
      name: 'ranklist',
      redirect: '/ranklist/weekRank',
      component: Ranklist,
      children: [{
        path: '/ranklist/*',
        name: 'RanklistDetail',
        component: RanklistDetail
      }]
    }
  ]
})
