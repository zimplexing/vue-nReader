import Vue from 'vue'
import Vuex from 'vuex'
// import action from 'action'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  weekRankId: '',
  monthRankId: '',
  totalRankId: '',
  headTitle: '', // 头部文字
  previousPosition: '书架',
  source: '', // 小说源
  backPath: {},
  bookInfo: {}
}

export default new Vuex.Store({
  state,
  mutations
})
