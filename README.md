# vue-biquge

> 使用VUE2.0 & 追书神器API 模仿的笔趣阁APP的一个webapp

## Build Setup
``
``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

问题：

1. 每次切换tab页后都重新加载数据 没有进行缓存
2. tab切换没有加载动画效果
3. 列表一次性全部加载，没有实现滚动加载
4. 使用$router.push()后使用浏览器返回会完全还原历史路径
5. 组件之间通过路由切换，传参目前通过路由的query
6. 路由返回有问题

