<template>
  <div>
    <pulse-loader :loading="loading" :color="color" :size="size" :margin="margin"></pulse-loader>
    <div v-show="!loading">
      <button type="button" class="add-book" v-if="!books.length" @click="$router.push('/bookcat')">添加小说</button>
      <ul class="book-shelf" v-if="books.length">
        <v-touch tag="li" class="book-list-wrap" v-for="(book, index) in books" :key="index" @swipeleft="showDelBookBtn" @swiperight="hideDelBookBtn">
          <v-touch class="book-list" @tap="readbook(book)">
            <img :src="getImgSrc(book)" />
            <div class="info">
              <p class="title">{{book.title}}</p>
              <p class="updated">{{book.updated | ago}}：{{book.lastChapter}}</p>
            </div>
            <v-touch class="del-book-btn" @tap="delBook($event,index)">删除</v-touch>
          </v-touch>
        </v-touch>
      </ul>
    </div>
  </div>
</template>

<script>
import api from '../libs/api'
import moment from 'moment'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

moment.locale('zh-cn');
export default {
  name: 'Bookshelf',
  components:{
    PulseLoader
  },
  data() {
    return {
      books: [],
      loading: true,
      color: '#04b1ff',
      size: '10px',
      margin: '4px',
    }
  },
  filters: {
    /**
     * 使用moment格式化时间
     */
    ago(time) {
      return moment(time).fromNow();
    }
  },
  created() {
    if(!this.parseLocalShelfData()){
      this.loading = false;
    } else{
      this.getBookUpdate();
    } 
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
      this.getBookList()
      api.getUpdate(this.getBookList()).then(response => {
        localShelf = this.parseLocalShelfData();
        response.data.forEach((book, index) => {
          Object.assign(book, localShelf[book._id]);
          _that.books.push(book);
        });
        this.loading = false;
      }).catch(err => {
        console.log(err);
        this.loading = false;
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
    },
    readbook(book) {
      this.$store.commit('setReadBook', book);
      this.$router.push('/readbook/' + book._id);
    },
    showDelBookBtn(e) {
      let target = e.target.parentElement;
      while (target.className !== 'book-list') {
        target = target.parentElement;
      }
      target.style.left = '-44vw';
    },
    hideDelBookBtn(e) {
      let target = e.target.parentElement;
      while (target.className !== 'book-list') {
        target = target.parentElement;
      }
      target.style.left = '0';
    },
    delBook($event, index) {
      let storage = window.localStorage;
      let localShelf = JSON.parse(storage.getItem('followBookList')) ? JSON.parse(storage.getItem('followBookList')) : {};
      //删除该书籍在本地的缓存记录
      delete localShelf[this.books[index]._id];
      this.books.splice(index, 1);
      //重新保存
      storage.setItem("followBookList", JSON.stringify(localShelf));
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
  position: absolute;
  left: 0vw;
  width: 100vw;
  overflow: hidden;
  box-sizing: border-box;
  padding: 0.5rem 0 0 1rem;
}

.book-list-wrap {
  position: relative;
  height: 5rem;
  margin-bottom: .2rem;
}

.book-list {
  position: absolute;
  left: 0;
  width: 140vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: .2rem;
}

.book-list img {
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

.del-book-btn {
  color: #fff;
  background: red;
  width: 40vw;
  line-height: 5rem;
  text-align: center;
}
</style>
