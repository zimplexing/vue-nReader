/*
 * @Author: zimplexing 
 * @Date: 2017-06-24 19:24:32 
 * @Last Modified by:   zimplexing 
 * @Last Modified time: 2017-06-24 19:24:32 
 */

import _ from "lodash"

const localStroage = window.localStorage;

export default {

    /**
     * 获取localstroage的数据
     * @param {String} key 获取localstroage的item 
     */
    getLocalStroageData(item) {
        return JSON.parse(localStroage.getItem(item))
    },

    /**
     * 设置localstroage的值
     * @param {String} item 
     * @param {Object} obj 
     */
    setLocalStroageData(item, obj = JSON.stringify(obj)) {
        localStorage.set(item, obj);
    }
}
