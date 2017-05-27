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
     */
    getOrigin(){
        'http://api.zhuishushenqi.com/atoc?view=summary&book=584a76998806c8010ea176a7'
    },

    /**
     * 获取小说章节
     * @param {小说源id} originId 
     */
    getChapters(bookId) {
        return Vue.http.get('/atoc/' + originId + '?view=chapters')
    },

    getBookChapter(){
        return Vue.http.get('http://chapterup.zhuishushenqi.com/chapter/http://vip.zhuishushenqi.com/chapter/58646cde1f360f21676cd9d6?cv=1481275033588')
    }
}