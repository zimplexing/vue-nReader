# vue-nReader

> 使用VUE2.0 & 追书神器API的一个小说阅读 webapp

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
## 预览地址
电脑端请开启开发者模式
[在线预览地址](http://35.189.165.140/)

## TODO
- [ ] 增加发现页面

- [ ] 搜索历史功能

- [ ] 社区评论功能 

- [x] 章节倒叙查看

- [ ] 组件切换动效

- [x] 优化返回功能

- [x] 记录阅读历史功能

- [ ] 阅读界面设置能工

## 手机浏览器兼容性问题
1. uc浏览器完美运行
2. chrome地址栏无法隐藏
3. 小米浏览器地址栏和工具栏无法隐藏，localstorage有bug
4. QQ浏览器地址栏和工具栏无法隐藏
5. safari浏览器没有测试

## 屏幕截图


## 问题：

- [ ] 每次切换tab页后都重新加载数据 没有进行缓存
    - ~~使用`keep-alive`后，排行榜页面还是会发送请求~~

        > 解决方法：使用`created`钩子进行请求数据，使用`beforeEnterRoute`重复发请求
    
    - 记录上次浏览（现在tab互相切换，滚动条没有独立，会相互影响）

- [ ] 列表一次性全部加载，没有实现滚动加载
- [x] 使用$router.push()后使用浏览器返回会完全还原历史路径
    > 解决方法：存在二次跳转的，最好使用重定向解决，不要使用mounted之后在进行push操作
- [x] 有多层页面，并且上级页面不确定时，路由返回错误
    > 解决方法：将每层的页面路径分类并放到state中（二级页面，三级页面等等）分开管理，向state提交上级路径时，排除当页面的所有下级页面路径
- [x] 异步获取数据后渲染模板 模板会先报错再等数据返回之后再做一次渲染
    > 解决方法1：在渲染需要用到异步获取的数据的地方都先进行判断

    > 解决方法2：事件在data定义异步获取数据的数据格式，避免报错
- [x] tab切换渲染加载等待加载动画效果
    > 解决方法：使用`vue-spinner`组件
- [x] 数据过滤或者是时间格式化问题
    > 解决方法：使用filters加moment解决
- [x] 默认加载一个带参的路由
    > 解决方法：将路由写成不带参数的路由，参数通过其他方式进行传递（比如vuex）
- [x] 跳转到相应路由标记active
    > 解决方法：使用`vue-router`并设置`exact`属性即可
- [x] `api`为第三方网站的，存在跨域问题
    > 使用代理将请求进行转发
- [ ] 实现下拉刷新
- [ ] 路由懒加载优化
- [ ] 事件绑定都是使用的是click，后续需要进行优化
