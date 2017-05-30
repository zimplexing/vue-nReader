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

代理地址：104.199.142.204:3000

## TODO
- [ ] 增加发现页面

- [ ] 搜索历史功能

- [ ] 社区评论功能 

- [ ] 章节倒叙查看

- [ ] 组件切换动效

- [ ] 优化返回功能

## 问题：

1. 每次切换tab页后都重新加载数据 没有进行缓存
    - ~~使用`keep-alive`后，排行榜页面还是会发送请求~~

        > 解决方法：使用`created`钩子进行请求数据，使用`beforeEnterRoute`重复发请求
    
    - 记录上次浏览（现在tab互相切换，滚动条没有独立，会相互影响）

    - 重复点击同一个tab，重新请求数据（今日头条的效果）
3. 列表一次性全部加载，没有实现滚动加载
4. ~~使用$router.push()后使用浏览器返回会完全还原历史路径~~
    > 解决方法：存在二次跳转的，最好使用重定向解决，不要使用mounted之后在进行push操作
5. 返回不能返回到正确路径（返回上异步浏览的位置）
    > 解决方法：
6. ~~异步获取数据后渲染模板 模板会先报错再等数据返回之后再做一次渲染~~
    > 解决方法1：在渲染需要用到异步获取的数据的地方都先进行判断

    > 解决方法2：事件在data定义异步获取数据的数据格式，避免报错
6. ~~tab切换渲染加载等待加载动画效果~~
    > 解决方法：使用`vue-spinner`组件
7. ~~数据过滤或者是时间格式化问题~~
    > 解决方法：使用filters加moment解决
8. ~~默认加载一个带参的路由~~
    > 解决方法：将路由写成不带参数的路由，参数通过其他方式进行传递（比如vuex）
9. 跳转到相应路由标记active
10. ~~`api`为第三方网站的，存在跨域问题~~
    > 使用代理将请求进行转发
11. 小说源都是第三方的网站，存在跨域问题（每换一个源就会有一个不同域）
12. 请求章节返回的是一个html页面，何如解析正文内容，并返回
13. 爬虫爬去的数据中文存在乱码的可能性
14. uc、safri通过vuex赋值没有生效，小米浏览器下localstorage有bug
15. 实现下拉刷新
16. 路由懒加载优化
17. 事件绑定都是使用的是click，后续需要进行优化
18. beforeRouterLeave 方法this感觉没法访问 现在通过点击事件进行记录阅读记录，在使用返回时会无法记录阅读记录
