import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Home = resolve => require(['@/components/Home'], resolve)
// const Bookshelf = resolve => require(['@/components/bookshelf/Bookshelf'], resolve)
// const Bookcat = resolve => require(['@/components/Bookcat'], resolve)
// const Rank = resolve => require(['@/components/Rank'], resolve)
const Ranklist = resolve => require(['@/components/ranklist/Ranklist'], resolve)
const RanklistDetail = resolve => require(['@/components/ranklist/RanklistDetail'], resolve)
const Book = resolve => require(['@/components/common/Book'], resolve)
const ReadBook = resolve => require(['@/components/book/ReadBook'], resolve)
// const Search = resolve => require(['@/components/Search'], resolve)
const BookcatDetail = resolve => require(['@/components/category/BookcatDetail'], resolve)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
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
        }, //{
        //   path: '/search',
        //   name: 'search',
        //   component: Search
        // }, {
        //   path: 'searchresult'
        //},
        {
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
