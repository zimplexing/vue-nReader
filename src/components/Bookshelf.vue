<template>
  <div>
  </div>
</template>

<script>
import api from '../libs/api'
export default {
  name: 'Bookshelf',
  data() {
    return {
      books: []
    }
  },
  created() {
    // todo 在es6中this的指向待优化
    let localShelf,
        _that = this;
    this.$store.commit('setHeadText', '书架');
    api.getUpdate(this.getBookList()).then(response => {
      localShelf = this.parseLocalShelfData();
      response.data.forEach((book, index) => {
        Object.assign(book,localShelf[book._id]);
        _that.books.push(book);
      });
    }).catch(err => {
      console.log(err);
    })
  },
  methods: {
    parseLocalShelfData() {
      return JSON.parse(window.localStorage.getItem('followBookList'));
    },
    getBookList() {
      let localShelf = this.parseLocalShelfData();
      let bookListArray = [];
      for (let bookId in localShelf) {
        bookListArray.push(bookId);
      }
      return bookListArray;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
