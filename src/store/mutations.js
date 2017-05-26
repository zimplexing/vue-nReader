export default {
    setRankId(state,rankDetail){
        state.weekRankId = rankDetail._id;
        state.monthRankId = rankDetail.monthRank;
        state.totalRankId = rankDetail.totalRank;
    }
}