<template>
  <v-touch
    tag="li"
    class="book-list-wrap"
    @panmove="showDelBookBtn"
    @swiperight="hideDelBookBtn">
    <v-touch
      class="book-list"
      @tap="readbook(book)">
      <div class="read-book-history">
        <img :src="book.cover">
        <div class="info">
          <p class="title">{{ book.title }}</p>
          <p class="updated">{{ book.updated | ago }}：{{ book.lastChapter }}</p>
        </div>
      </div>
      <v-touch
        class="del-book-btn"
        @tap="delBook($event,index)">删除</v-touch>
    </v-touch>
  </v-touch>
</template>

<script>
import moment from 'moment'
import { SET_CURRENT_SOURCE, SET_READ_BOOK } from '@/store/mutationsType'

moment.locale('zh-cn')
export default {
  name: 'BookListItem',
  props: {
    book: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  filters: {
    /**
     * 使用moment格式化时间
     */
    ago (time) {
      return moment(time).fromNow()
    }
  },
  methods: {
    readbook (book) {
      this.$store.commit(SET_READ_BOOK, book)
      this.$store.commit(SET_CURRENT_SOURCE, book.source)
      this.$router.push('/readbook/' + book._id)
    },

    showDelBookBtn (e) {
      console.log(e)
      // let target = e.target.parentElement
      // while (target.className !== 'book-list') {
      //   target = target.parentElement
      // }
      // target.style.left = '-44vw'
    },

    hideDelBookBtn (e) {
      let target = e.target.parentElement
      while (target.className !== 'book-list') {
        target = target.parentElement
      }
      target.style.left = '0'
    },

    delBook ($event, index) {
      let storage = window.localStorage
      let localShelf = JSON.parse(storage.getItem('followBookList'))
        ? JSON.parse(storage.getItem('followBookList'))
        : {}
      // 删除该书籍在本地的缓存记录
      delete localShelf[this.books[index]._id]
      this.books.splice(index, 1)
      // 重新保存
      storage.setItem('followBookList', JSON.stringify(localShelf))
    }
  }
}
</script>

<style lang="less" scoped>
.book-list-wrap {
  position: relative;
  height: 5rem;
  margin-bottom: 0.2rem;
}

.book-list {
  position: absolute;
  left: 0;
  width: 140vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 0.2rem;
}

.book-list img {
  height: 5rem;
  float: left;
  margin-right: 0.4rem;
}

.info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;
  height: 5rem;
  margin-left: 0.6rem;
  border-bottom: 1px solid #f2f2f2;
}

.info p {
  margin-top: 0.2rem;
  margin-bottom: 0.2rem;
}

.updated {
  color: #6d6666;
  font-size: 0.8rem;
}

.del-book-btn {
  color: #fff;
  background: red;
  width: 40vw;
  line-height: 5rem;
  text-align: center;
}

.read-book-history {
  display: flex;
  width: 100vw;
}
</style>
