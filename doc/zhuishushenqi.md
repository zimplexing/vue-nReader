## nReader

#### 追书神器api文档

追书神器`api`官方地址:

```javascript
http://api.zhuishushenqi.com
http://api05iye5.zhuishushenqi.com
http://http://chapterup.zhuishushenqi.com/chapter
```

由于官方`api`地址没有进行CROS处理,所以调用时会存在跨域问题,这里提供了一个代理地址:

```JavaScript
http://35.189.165.140:3000
```

有能力的童鞋可以自己搭一个代理,对请求进行转发.

#### 接口

1. 获取所有分类
2. 获取排行榜类型
3. 获取排行榜小说
4. 获取分类下小类别
5. 根据分类获取小说列表
6. 获取小说信息
7. 获取小说正版源
8. 获取小说源(正版➕盗版)
9. 获取小说章节(根据小说id)
10. 获取小说章节(根据小说源id)
11. 获取小说章节内容
12. 获取搜索热词
13. 搜索自动补充
14. 模糊搜索
15. 获取小说最新章节



**所有接口都是`GET`请求**

##### 1. 获取所有分类

| 类型     | 值                                        |
| ------ | ---------------------------------------- |
| 接口地址   | /cats/lv2/statistics                     |
| 参数     | null                                     |
| 实例接口地址 | http://api.zhuishushenqi.com/cats/lv2/statistics |

##### 2. 获取排行榜类型

| 类型     | 值                                        |
| ------ | ---------------------------------------- |
| 接口地址   | /ranking/gender                          |
| 参数     | null                                     |
| 实例接口地址 | http://api.zhuishushenqi.com/ranking/gender |

##### 3. 获取排行榜小说

| 类型     | 值                                        |
| ------ | ---------------------------------------- |
| 接口地址   | /ranking/:rankId                         |
| 参数     | 排行榜的ID,不同字段对应不同的榜单,具体ID从接口2中获取           |
|        | _id: 周榜ID                                |
|        | monthRank: 月榜ID                          |
|        | totalRank: 总榜ID                          |
| 实例接口地址 | http://api.zhuishushenqi.com/ranking/54d43437d47d13ff21cad58b |

##### 4. 获取分类下小类别

| 类型     | 值                                     |
| ------ | ------------------------------------- |
| 接口地址   | /cats/lv2                             |
| 参数     | null                                  |
| 实例接口地址 | http://api.zhuishushenqi.com/cats/lv2 |

##### 5. 根据分类获取小说列表

| 类型     | 值                                        |
| ------ | ---------------------------------------- |
| 接口地址   | /book/by-categories                      |
| 参数     | 说明无                                      |
|        | gender: 男生:`mael`    女生:`female`     出版:`press` |
|        | type: 热门:`hot` 新书:`new` 好评:`repulation` 完结: `over` 包月: `month` |
|        | major: 大类别 从接口1获取                        |
|        | minor: 小类别 从接口4获取 (非必填)                  |
|        | start: 分页开始页                             |
|        | limit: 分页条数                              |
| 实例接口地址 | https://api.zhuishushenqi.com/book/by-categories?gender=male&type=hot&major=%E5%A5%87%E5%B9%BB&minor=&start=0&limit=20 |

##### 6. 获取小说信息

| 类型     | 值                                        |
| ------ | ---------------------------------------- |
| 接口地址   | /book/:booId                             |
| 参数     | booId具体小说的ID                             |
| 实例接口地址 | http://api.zhuishushenqi.com/book/548d9c17eb0337ee6df738f5 |

##### 7. 获取小说正版源

| 类型     | 值                                        |
| ------ | ---------------------------------------- |
| 接口地址   | /btoc                                    |
| 参数     | view: 暂时只知道`summary`这个参数 book: 对应的bookId |
| 实例接口地址 | http://api.zhuishushenqi.com/btoc?view=summary&book=548d9c17eb0337ee6df738f5 |

##### 8. 获取小说正版源于盗版源(混合)

| 类型     | 值                                        |
| ------ | ---------------------------------------- |
| 接口地址   | /atoc                                    |
| 参数     | `view`: 暂时只知道`summary`这个参数` book`: 对应的bookId |
| 实例接口地址 | http://api.zhuishushenqi.com/atoc?view=summary&book=548d9c17eb0337ee6df738f5 |

##### 9. 获取小说章节(根据小说id)

| 类型     | 值                                        |
| ------ | ---------------------------------------- |
| 接口地址   | /mix-atoc/:bookId                        |
| 参数     | `bookId`:对应小说id `view`:暂时只知道`chapters`   |
| 实例接口地址 | http://api.zhuishushenqi.com/mix-atoc/50bff3ec209793513100001c?view=chapters |

##### 10. 获取小说章节(根据小说源id)

| 类型     | 值                                        |
| ------ | ---------------------------------------- |
| 接口地址   | /atoc 或者/btoc                            |
| 参数     | `sourceId`:对应小说源id `view`:暂时只知道`chapters |
| 实例接口地址 | http://api.zhuishushenqi.com/atoc/568fef99adb27bfb4b3a58dc?view=chapters |

##### 11. 获取小说章节内容

| 类型     | 值                                        |
| ------ | ---------------------------------------- |
| 接口地址   | chapterup.zhuishushenqi.com/chapter/     |
| 参数     | link: 章节地址                               |
| 实例接口地址 | http://chapterup.zhuishushenqi.com/chapter/http://vip.zhuishushenqi.com/chapter/5817f1161bb2ca566b0a5973?cv=1481275033588 |

##### 12. 获取搜索热词

| 类型     | 值                                        |
| ------ | ---------------------------------------- |
| 接口     | /book/search-hotwords                    |
| 参数     | null                                     |
| 实例接口地址 | http://api.zhuishushenqi.com/book/search-hotword |

##### 13. 搜索自动补充

| 类型     | 值                                        |
| ------ | ---------------------------------------- |
| 接口     | /book/auto-complete                      |
| 参数     | `query`:查询值                              |
| 实例接口地址 | http://api.zhuishushenqi.com/book/auto-complete?query=%E6%96%97%E7%BD%97 |

##### 14. 模糊搜索

| 类型   | 值                                        |
| ---- | ---------------------------------------- |
| 接口   | /book/fuzzy-search                       |
| 参数   | `query`:查询值                              |
| 实例地址 | http://api.zhuishushenqi.com/book/fuzzy-search?query=%E6%96%97%E7%BD%97 |

##### 15. 获取小说最新章节

| 类型     | 值                                        |
| ------ | ---------------------------------------- |
| 接口     | /book                                    |
| 参数     | `view`: updated `id`:以都好分割的bookId        |
| 实例接口地址 | http://api05iye5.zhuishushenqi.com/book?view=updated&id=531169b3173bfacb4904ca67 |