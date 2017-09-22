[![DeepScan Grade](https://deepscan.io/api/projects/479/branches/739/badge/grade.svg)](https://deepscan.io/dashboard/#view=project&pid=479&bid=739)
# vue-nReader

使用`mint-ui`对整个项目进行了重构，整理了项目的目录结构与代码，较上个版本新增了`小说换源`、`搜索历史记录`、优化了`滚动下载`和`下拉刷新`

整个项目一共14个页面（包括通用组件），主要使用了vue2.0+vue-router+vuex，主要实现了小说排行榜，小说分类，小说详情，小说阅读，搜索页面，小说阅读记录等页面。达到了可用来看小说的基本需求。

项目中的API均来自追书神器，纯属共享学习之用，有任何疑问或建议可提[issue](https://github.com/zimplexing/vue-nReader/issues/new)，使用代理，本地可以完美运行。

[API文档](https://github.com/zimplexing/vue-nReader/blob/master/doc/zhuishushenqi.md)

[本地运行代理](https://gist.github.com/zimplexing/c7c1f15ea3f270de3962fc0ab466d82e)

## 本地运行 

使用vue-cli工具构建，基本命令如下：
``` bash
# 安装依赖
npm install 

# 开发模式
npm run dev

# 生产模式
npm run build

```
## 预览地址
项目放在google云的虚拟主机上，访问速度看人品。代理也运行在上面，所以加载速度可能会比较慢。其中有一些小说封面会加载不出来，这个是api的问题，并不是网络的原因。


电脑端请开启开发者模式
[在线预览地址](http://35.189.165.140:8080/)

手机扫码：
![](https://github.com/zimplexing/vue-nReader/blob/master/screenshot/nReader.png?raw=true)

## 实现功能

- [x] 小说书架
- [x] 分类查询
- [x] 排行榜
- [x] 搜索（搜索历史，自动补全）
- [x] 小说详情
- [x] **小说换源**
- [x] 阅读历史记录（记录阅读章节）
- [x] 阅读夜间模式
- [x] 章节倒叙查看

## TODO
- [ ] 记录阅读历史位置

- [ ] 增加发现页面

- [ ] 社区评论功能 

- [ ] 组件切换动效

- [ ] 阅读界面设置功能

- [ ] 小说下载

## 屏幕截图

<img src="https://github.com/zimplexing/vue-nReader/blob/master/screenshot/bookshelf.png?raw=true" width="280"/> <img src="https://github.com/zimplexing/vue-nReader/blob/master/screenshot/catory.png?raw=true" width="280"/> <img src="https://github.com/zimplexing/vue-nReader/blob/master/screenshot/rank.png?raw=true" width="280"/> <img src="https://github.com/zimplexing/vue-nReader/blob/master/screenshot/catDetail.png?raw=true" width="280"/> <img src="https://github.com/zimplexing/vue-nReader/blob/master/screenshot/rankType.png?raw=true" width="280"/> <img src="https://github.com/zimplexing/vue-nReader/blob/master/screenshot/search.png?raw=true" width="280"/> <img src="https://github.com/zimplexing/vue-nReader/blob/master/screenshot/book.png?raw=true" width="280"/> <img src="https://github.com/zimplexing/vue-nReader/blob/master/screenshot/readbook.png?raw=true" width="280"/> <img src="https://github.com/zimplexing/vue-nReader/blob/master/screenshot/nightMode.png?raw=true" width="280"/> <img src="https://github.com/zimplexing/vue-nReader/blob/master/screenshot/chapter.png?raw=true" width="280"/> 

## 问题
记录在项目中遇到的一些问题，和解决方法
 - [ ] 滚动条控制
    - 在不是 `HTML5 history `模式下，还没找到解决的方法

- [x] flex布局下横向滚动
    - 设置属性`flex-shrink:0`，默认下该属性值为1，空间不够时，后等比例缩小，设置为0之后，不会缩小项目

- [x] 标签选中后active样式的添加
    - 使用`:class` 判断条件为点击当前标签的索引值

- [x] 同时绑定按键修饰符（keyup事件但不包括按键enter）
    - 监听`input`事件，绑定`keyup.enter`事件

- [x] 返回路径问题
    - 使用`$router.go()`进行模拟返回

- [x] 图片加载错误处理
    - 图片加载错误的onerror方法中的静态地址webpack打包不会将其转化为base64编码，所以现在的解决方法是贴一个在线的图片地址
