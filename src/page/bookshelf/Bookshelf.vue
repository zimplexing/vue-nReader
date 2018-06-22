<template>
  <div>
    <mt-button
      type="primary"
      class="add-book"
      v-if="!books.length"
      @click="$emit('addBook','分类')">添加小说</mt-button>
    <ul
      class="book-shelf"
      v-if="books.length">
      <book-list-item
        v-for="book in books"
        :key="book._id"
        :book="book"
      />
    </ul>
  </div>
</template>

<script>
import util from '@/utils/util'
import BookListItem from './BookListItem'
import { getUpdate } from '@/api'
import { Indicator } from 'mint-ui'

export default {
  name: 'Bookshelf',
  components: { BookListItem },
  data () {
    return {
      books: []
    }
  },
  created () {
    this.getBookUpdate()
  },
  methods: {
    /**
     * 返回追更新的书本id
     */
    getBookList () {
      let localShelf = util.getLocalStroageData('followBookList')
      return Object.keys(localShelf)
    },

    async getBookUpdate () {
      let localShelf = util.getLocalStroageData('followBookList')
      let bookIds = this.getBookList()
      if (!bookIds.length) return
      Indicator.open()
      try {
        let { data } = await getUpdate(bookIds)
        this.books = data.map(book => ({
          ...book,
          ...localShelf[book._id],
          cover: util.staticPath + book.cover
        }))
        Indicator.close()
      } catch (error) {
        Indicator.close()
      }
    }
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
}

.add-book:focus {
  outline: none;
}

.book-shelf {
  width: 100vw;
  overflow: hidden;
  box-sizing: border-box;
  padding: 0.5rem 0 0 0.5rem;
}

</style>
