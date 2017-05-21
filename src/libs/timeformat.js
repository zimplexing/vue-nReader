import Vue from 'vue'
Vue.filter("timeformat", function (value) {
    var date = new Date(value)
    var delta = new Date() - date
    var now_threshold = parseInt(now_threshold, 10)
    if (isNaN(now_threshold)) {
        now_threshold = 0;
    }
    if (delta <= now_threshold) {
        return '刚刚';
    }
    var units = null;
    var conversions = {
        '毫秒': 1, // ms    -> ms

        '秒': 1000,   // ms    -> sec

        '分钟': 60,     // sec   -> min

        '小时': 60,     // min   -> hour

        '天': 24,     // hour  -> day

        '月': 30,     // day   -> month (roughly)

        '年': 12      // month -> year

    };
    for (var key in conversions) {
        if (delta < conversions[key]) {
            break;
        } else {
            units = key; // keeps track of the selected key over the iteration

            delta = delta / conversions[key];
        }
    }
    // pluralize a unit when the difference is greater than 1.

    delta = Math.floor(delta);
    return [delta, units, "前"].join("");
});