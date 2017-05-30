export default {
    setRankId(state,rankDetail){
        state.weekRankId = rankDetail._id;
        state.monthRankId = rankDetail.monthRank;
        state.totalRankId = rankDetail.totalRank;
        state.headText = rankDetail.shortTitle;
    },
    setSecPath(state,prePath){
        state.backPath.secPath = prePath;
    },
    setThirdPath(state,prePath){
        state.backPath.thirdPath = prePath;
    },
    setHeadText(state,text){
      state.headText = text;
    },
    setReadBook(state,book){
        state.bookInfo = book; 
    }
}
