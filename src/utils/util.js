/*
 * @Author: zimplexing 
 * @Date: 2017-06-24 19:24:32 
 * @Last Modified by: zimplexing
 * @Last Modified time: 2017-06-24 21:21:54
 */

import _ from "lodash"

const localStroage = window.localStorage;

export default {

    staticPath: 'http://statics.zhuishushenqi.com/',

    /**
     * 获取localstroage的数据
     * @param {String} key 获取localstroage的item 
     */
    getLocalStroageData(item) {
        return _.isEmpty(JSON.parse(localStroage.getItem(item))) ? null : JSON.parse(localStroage.getItem(item));
    },

    /**
     * 设置localstroage的值
     * @param {String} item 
     * @param {Object} obj 
     */
    setLocalStroageData(item, obj) {
        localStorage.setItem(item, JSON.stringify(obj));
    },

    /**
     * 转化img的url
     * @param {String} url 
     */
    parseImgUrl(url){
        return this.staticPath + url.indexOf('http') === -1 ? staticPath + url : url.slice(url.indexOf('http'))
    }
}
