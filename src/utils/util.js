/*
 * @Author: zimplexing 
 * @Date: 2017-06-24 19:24:32 
 * @Last Modified by: zimplexing
 * @Last Modified time: 2017-06-26 22:30:27
 */

import _ from "lodash"

const localStroage = window.localStorage;

export default {

    staticPath: 'http://statics.zhuishushenqi.com',

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

}
