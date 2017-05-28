<template>
  <div>
    <button type="button" class="add-book" v-if="!parseLocalShelfData()" @click="$router.push('/bookcat')">添加小说</button>
    <ul class="book-shelf" v-if="books.length">
      <li class="book-list" v-for="(book, index) in books" :key="index">
        <img :src="getImgSrc(book)" />
        <div class="info">
          <p class="title">{{book.title}}</p>
          <p class="updated">{{book.updated | ago}}：{{book.lastChapter}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import api from '../libs/api'
import moment from 'moment'
moment.locale('zh-cn');
export default {
  name: 'Bookshelf',
  data() {
    return {
      books: []
    }
  },
  filters:{
    /**
     * 使用moment格式化时间
     */
    ago(time){
      return moment(time).fromNow();
    }
  },
  created() {
    this.parseLocalShelfData() && this.getBookUpdate();
  },
  methods: {
    /**
     * 格式化locastorage数据
     */
    parseLocalShelfData() {
      return JSON.parse(window.localStorage.getItem('followBookList'));
    },
    /**
     * 返回追更新的书本id
     */
    getBookList() {
      let localShelf = this.parseLocalShelfData();
      let bookListArray = [];
      for (let bookId in localShelf) {
        bookListArray.push(bookId);
      }
      return bookListArray;
    },
    getBookUpdate() {
      // todo 在es6中this的指向待优化
      let localShelf,
        _that = this;
      _that.books = [];
      api.getUpdate(this.getBookList()).then(response => {
        localShelf = this.parseLocalShelfData();
        response.data.forEach((book, index) => {
          Object.assign(book, localShelf[book._id]);
          _that.books.push(book);
        });
      }).catch(err => {
        console.log(err);
      })
    },
    /**
     * 获取封边静态路径
     */
    getImgSrc(book) {
      return book.cover.indexOf('http') === -1 ? this.staticPath + book.cover : book.cover.slice(book
        .cover.indexOf('http'));
    },
    /**
     * 设置头部文字
     */
    changeHeadText() {
      this.$store.commit('setHeadText', '书架');
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.changeHeadText();
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.add-book {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 0.6rem 2rem;
  color: #fff;
  background: #04b1ff;
  border: none;
  border-radius: .2rem;
  font-size: 1rem;
}

.add-book:focus {
  outline: none;
}

.book-shelf {
  box-sizing: border-box;
  padding: 0.5rem 1rem 0;
}

.book-list {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: .2rem;
}

img {
  width: 4.2em;
  height: 5rem;
  float: left;
  margin-right: .4rem;
}

.info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;
  height: 5rem;
  margin-left: .6rem;
  border-bottom: 1px solid #f2f2f2;
}

.info p {
  margin-top: .2rem;
  margin-bottom: .2rem;
}

.updated {
  color: #6d6666;
  font-size: .8rem;
}
</style>
