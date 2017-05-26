export default {
    setRankId(state,rankDetail){
        state.weekRankId = rankDetail._id;
        state.monthRankId = rankDetail.monthRank;
        state.totalRankId = rankDetail.totalRank;
        state.headText = rankDetail.shortTitle;
    },
    setGoBackId(state,preViewId){
        state.goBackId = preViewId;
    },
    setHeadText(state,text){
      state.headText = text;
    }
}
