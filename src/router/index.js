import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Home = resolve => require(['@/page/Home'], resolve)
const Ranklist = resolve => require(['@/page/ranklist/Ranklist'], resolve)
const RanklistDetail = resolve => require(['@/page/ranklist/RanklistDetail'], resolve)
const Book = resolve => require(['@/components/Book'], resolve)
const ReadBook = resolve => require(['@/page/book/ReadBook'], resolve)
const BookcatDetail = resolve => require(['@/page/category/BookcatDetail'], resolve)
const ChangeSource = resolve => require(['@/page/book/ChangeSource'], resolve)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
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
      path: '/changeSource/:bookId',
      name: 'changeSource',
      component: ChangeSource
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
