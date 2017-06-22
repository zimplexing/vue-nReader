import Vue from 'vue'
import Router from 'vue-router'
// import Bookshelf from '@/components/Bookshelf'
// import Bookcat from '@/components/Bookcat'
// import Rank from '@/components/Rank'
// import Overview from '@/components/Overview'
// import Ranklist from '@/components/Ranklist'
// import RanklistDetail from '@/components/RanklistDetail'
// import Book from '@/components/Book'
// import ReadBook from '@/components/ReadBook'
// import Search from '@/components/Search'
// import BookcatDetail from '@/components/BookcatDetail'

Vue.use(Router)

const Container = resolve => require(['@/components/Container'], resolve)
const Bookshelf = resolve => require(['@/components/Bookshelf'], resolve)
const Bookcat = resolve => require(['@/components/Bookcat'], resolve)
const Rank = resolve => require(['@/components/Rank'], resolve)
const Ranklist = resolve => require(['@/components/Ranklist'], resolve)
const RanklistDetail = resolve => require(['@/components/RanklistDetail'], resolve)
const Book = resolve => require(['@/components/Book'], resolve)
const ReadBook = resolve => require(['@/components/ReadBook'], resolve)
const Search = resolve => require(['@/components/Search'], resolve)
const BookcatDetail = resolve => require(['@/components/BookcatDetail'], resolve)

export default new Router({
  routes: [
    {
      path: '/',
      component: Container,
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
