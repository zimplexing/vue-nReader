# vue-nReader

整个项目一共14个页面（包括通用组件），主要使用了vue2.0+vue-router+vuex，主要实现了小说排行榜，小说分类，小说详情，小说阅读，搜索页面，小说阅读记录等页面。达到了可用来看小说的基本需求。

项目中的API均来自追书神器，纯属共享学习之用，有任何疑问或建议可提[issue](https://github.com/zimplexing/vue-nReader/issues/new)或联系[zhangx_0728@gmail.com](mailto://zhangx_0728@gmail.com)，使用代理，本地可以完美运行。

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

## TODO
- [ ] 增加发现页面

- [ ] 搜索历史功能

- [ ] 社区评论功能 

- [x] 章节倒叙查看

- [ ] 组件切换动效

- [x] 优化返回功能

- [x] 记录阅读历史功能

- [ ] 阅读界面设置功能


## 屏幕截图

<img src="https://github.com/zimplexing/vue-nReader/blob/master/screenshot/bookshelf.png?raw=true" width="280"/> <img src="https://github.com/zimplexing/vue-nReader/blob/master/screenshot/catory.png?raw=true" width="280"/> <img src="https://github.com/zimplexing/vue-nReader/blob/master/screenshot/rank.png?raw=true" width="280"/> <img src="https://github.com/zimplexing/vue-nReader/blob/master/screenshot/catDetail.png?raw=true" width="280"/> <img src="https://github.com/zimplexing/vue-nReader/blob/master/screenshot/rankType.png?raw=true" width="280"/> <img src="https://github.com/zimplexing/vue-nReader/blob/master/screenshot/search.png?raw=true" width="280"/> <img src="https://github.com/zimplexing/vue-nReader/blob/master/screenshot/book.png?raw=true" width="280"/> <img src="https://github.com/zimplexing/vue-nReader/blob/master/screenshot/readbook.png?raw=true" width="280"/> <img src="https://github.com/zimplexing/vue-nReader/blob/master/screenshot/nightMode.png?raw=true" width="280"/> <img src="https://github.com/zimplexing/vue-nReader/blob/master/screenshot/chapter.png?raw=true" width="280"/> 
