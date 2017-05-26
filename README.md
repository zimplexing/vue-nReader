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
    - 使用`keep-alive`后，排行榜页面还是会发送请求
        > 解决方法：使用`created`钩子进行请求数据，使用`beforeEnterRoute`重复发请求
    - 记录上次浏览（现在tab互相切换，滚动条没有独立，会相互影响）
    - 重复点击同一个tab，重新请求数据（今日头条的效果）
3. 列表一次性全部加载，没有实现滚动加载
4. 使用$router.push()后使用浏览器返回会完全还原历史路径
5. 路由返回有问题
6. 异步获取数据后渲染模板 模板会先报错再等数据返回之后再做一次渲染
    > 解决方法1：在渲染需要用到异步获取的数据的地方都先进行判断
    > 解决方法2：事件在data定义异步获取数据的数据格式，避免报错
6. tab切换渲染加载等待加载动画效果
    - 使用`vue-spinner`组件
7. 数据过滤或者是时间格式化问题
8. 默认加载路由的选择

