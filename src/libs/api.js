import Vue from 'vue';

export default {

    /**
     * 获取所有的排行榜类型
     */
    getRankType() {
        return Vue.http.get('/ranking/gender');
    },

    /**
     * 根据id获取排行榜
     */
    getRankList(id) {
        return Vue.http.get('/ranking/' + id);
    },

    /**
     * 获取所有分类
     */
    getCategory() {
        return Vue.http.get('/cats/lv2/statistics');
    },

    /**
     * 获取细分的类别
     */
    getCategoryDetail() {
        return Vue.http.get('/cats/lv2');
    },

    /**
     * 根据分类获取小说列表
     * @param {可选：male/female/press} gender
     * @param {可选：hot(热门)/new(新书）/reputation(好评)/over(完结)/monthly(包月)} type
     * @param {*} major
     * @param {*} minor
     * @param {*} start
     * @param {*} limit
     */
    getNovelListByCat(gender, type, major, minor, start = 0, limit = 20) {
        return Vue.http.get('/book/by-categories?gender=' + gender + '&type=' + type + '&major=' + major + '&minor=' + minor + '&start=' + start + '&limit=' + limit)
    },

    /**
     * 根据id获取小说
     * @param {小说id} bookId
     */
    getBook(bookId) {
        return Vue.http.get('/book/' + bookId);
    },

    /**
     * 获取小说源
     * 'http://api.zhuishushenqi.com/atoc?view=summary&book=548d9c17eb0337ee6df738f5'
     */
    getOrigin(bookId) {
        return Vue.http.get('/atoc?view=summary&book=' + bookId);
    },

    /**
     * 获取小说章节
     * @param {小说源id} originId
     */
    getChapters(originId) {
        return Vue.http.get('/atoc/' + originId + '?view=chapters')
    },

    getBookChapter() {
        return Vue.http.get('http://chapterup.zhuishushenqi.com/chapter/http://vip.zhuishushenqi.com/chapter/5817f1161bb2ca566b0a5973?cv=1481275033588')
    },

    /**
     * 获取搜索热刺
     * @returns {*}
     */
    getHotWords(){
      return Vue.http.get('/book/search-hotwords');
    },

    /**
     * 搜索自动补充
     * @param {搜索内容} searchWord
     * http://api05iye5.zhuishushenqi.com/book/auto-complete?query=%E6%96%97%E7%BD%97
     */
    autoComplete(searchWord){
        return Vue.http.get('/book/auto-complete?query='+searchWord)
    },

    /**
     * 模糊搜索
     *  @param {搜索内容} searchWord
     */
    fuzzySearch(searchWord){
        return Vue.http.get('/book/fuzzy-search?query='+searchWord)
    }
    //获取小说最新章节（书架）
    //http://api05iye5.zhuishushenqi.com/book?view=updated&id=531169b3173bfacb4904ca67,51d11e782de6405c45000068

}
