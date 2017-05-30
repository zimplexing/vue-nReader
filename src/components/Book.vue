<template>
  <div>
    <Topbar :showArrow="showArrow" :goBack="$store.state.backPath.thirdPath" :headText="book && book.title" :showFun="showFun"></Topbar>
    <pulse-loader :loading="loading" :color="color" :size="size" :margin="margin"></pulse-loader>
    <transition name="fade">
      <section v-show="!loading">
        <img v-if="book" :src="book.cover.indexOf('http') === -1 ? staticPath + book.cover : book.cover.slice(book.cover.indexOf('http'))">
        <div class="book-info">
          <p class="book-title" v-if="book">{{book.title}}</p>
          <p class="book-author" v-if="book">{{book.author}}</p>
          <p class="reader-info" v-if="book">
            <span v-text=""></span>{{book.updated | ago}} | {{wordCount}}万 | {{book.cat}}</p>
        </div>
        <div class="book-operation">
          <button class="btn" @click="followAction">{{isFollowed ? '不追了' : '追更新'}}</button>
          <button class="btn" @click="readBook">开始阅读</button>
        </div>
        <div class="book-status">
          <div class="list-item">
            <span class="item">追书人气</span>
            <span v-if="book">{{book.latelyFollower}}</span>
          </div>
          <div class="list-item">
            <span class="item">读者留存率</span>
            <span v-if="book">{{book.retentionRatio}}%</span>
          </div>
          <div class="list-item">
            <span class="item">日更新字数</span>
            <span v-if="book">{{book.serializeWordCount}}</span>
          </div>
        </div>
        <div class="book-tag" v-if="book">
          <span v-for="(tag, index) in book.tags" :key="index" class="tag">{{tag}}</span>
        </div>
        <p class="book-intro" v-if="book">{{book.longIntro}}</p>
      </section>
      <!--<section></section>-->
    </transition>
  </div>
</template>

<script>
import Topbar from './Topbar'
import api from '../libs/api'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import moment from 'moment'

export default {
  name: 'Book',
  components: {
    Topbar,
    PulseLoader
  },
  data() {
    return {
      showArrow: true,
      showFun: false,
      book: null,
      staticPath: 'http://statics.zhuishushenqi.com/',
      isFollowed: false,
      loading: true,
      color: '#04b1ff',
      size: '10px',
      margin: '4px'
    }
  },
  filters: {
    ago(time) {
      return moment(time).fromNow();
    }
  },
  computed: {
    wordCount() {
      return parseInt(this.book.wordCount / 10000, 10);
    }
  },
  created() {
    api.getBook(this.$route.params.bookId).then(response => {
      this.book = response.data;
      this.loading = false;
      this.isFollowBook();
    }, err => {
      console.log(err)
    });
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if(from.fullPath.indexOf('/readbook/') === -1){
          vm.$store.commit('setThirdPath',from.fullPath);     
      }
    })
  },
  methods: {
    readBook() {
      this.$store.commit('setReadBook',this.book);
      this.$router.push('/readbook/' + this.$route.params.bookId);
    },
    isFollowBook() {
      //返回本地是否缓存（加入书架）
      let localShelf = JSON.parse(window.localStorage.getItem('followBookList'));
      this.isFollowed = localShelf && localShelf[this.book._id] ? true : false;
    },
    followAction() {
      let storage = window.localStorage;
      let localShelf = JSON.parse(storage.getItem('followBookList')) ? JSON.parse(storage.getItem('followBookList')) : {};
      if (this.isFollowed) {
        //删除该书籍在本地的缓存记录
        delete localShelf[this.book._id];
        //重新保存
        storage.setItem("followBookList", JSON.stringify(localShelf));
        this.isFollowed = !this.isFollowed;
      } else {
        // 以bookId为键值，方便后续删除等操作
        localShelf[this.book._id] = {
          cover: this.book.cover,
          title: this.book.title
        }
        storage.setItem("followBookList", JSON.stringify(localShelf));
        this.isFollowed = !this.isFollowed;
      }
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
  width: 5rem;
  height: 6rem;
  float: left;
  margin-right: 0.4rem;
}

section {
  box-sizing: border-box;
  padding-right: 1rem;
  padding-left: 1rem;
  padding-bottom: 0.2rem;
  padding-top: 0.2rem;
  margin-top: 3.5rem;
  width: 100vw;
}

section:first-child {
  margin-bottom: 1rem;
}

.book-info {
  box-sizing: border-box;
  width: 100%;
  height: 6rem;
  padding-left: 6rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.book-info p {
  margin: 0;
  line-height: 1.8rem;
}

.book-operation {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #f2f2f2;
}

.book-operation .btn {
  width: 8rem;
  background: #03a9f4;
  border: none;
  color: #fff;
  font-size: 1rem;
  text-align: center;
  line-height: 2.2rem;
  border-radius: .2rem;
}

.book-operation .btn:focus {
  background: #2196f3;
  outline: none;
}

.book-status {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 1rem 0;
  border-bottom: 1px solid #f2f2f2;
}

.list-item {
  display: flex;
  flex-direction: column;
  width: 33%;
  text-align: center;
}

.item {
  font-size: .8rem;
  color: #807070;
}

.book-tag {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: .6rem 0 0;
  border-bottom: 1px solid #f2f2f2;
}

.tag {
  padding: .2rem .7rem;
  color: #fff;
  border-radius: .1rem;
  margin-bottom: .6rem;
  font-size: 0.8rem;
  margin-left: .4rem;
}

.tag:nth-child(1n) {
  background: burlywood;
}

.tag:nth-child(2n) {
  background: cadetblue;
}

.tag:nth-child(3n) {
  background: coral;
}

.tag:nth-child(4n) {
  background: cornflowerblue;
}

.reader-info,.book-author {
  font-size: 0.9rem;
}
.book-intro{
  margin-top: 1rem;
}
</style>
