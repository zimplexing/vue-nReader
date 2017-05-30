import Vue from 'vue'
import Vuex from 'vuex'
// import action from 'action'
import mutations from './mutations'

Vue.use(Vuex);

const state = {
    weekRankId: '',
    monthRankId: '',
    totalRankId: '',
    headText: '', //头部文字
    backPath:{},
    bookInfo: {}
};

export default new Vuex.Store({
    state,
    mutations
})
