import Vue from 'vue'
import Vuex from 'vuex'
// import action from 'action'
import mutations from './mutations'

Vue.use(Vuex);

const state = {
    weekRankId: '',
    monthRankId: '',
    totalRankId: '',
    goBackId: ''
}

export default new Vuex.Store({
    state,
    mutations
})
