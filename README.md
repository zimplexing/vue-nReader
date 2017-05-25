# vue-biquge

> 使用VUE2.0 & 追书神器API 模仿的笔趣阁APP的一个webapp

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

```

问题：

1. 每次切换tab页后都重新加载数据 没有进行缓存
2. tab切换没有加载动画效果
3. 列表一次性全部加载，没有实现滚动加载
4. 使用$router.push()后使用浏览器返回会完全还原历史路径
5. 路由返回有问题
6. 异步获取数据后渲染模板 模板会先报错再等数据返回之后再做一次渲染
7. 数据过滤或者是时间格式化问题
