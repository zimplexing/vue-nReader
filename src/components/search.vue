<template>
  <div>
    <div class="search-head">
      <Icon name="search"></Icon>
      <input type="text" class="search-input" placeholder="输入书名或者作者名" @keyup.enter="fuzzySearch" @keyup="autoComplete" :value="searchWord">
      <button type="button" class="cancel"  @click="$router.push({path:back})">取消</button>
    </div>
    <!--只有在没有自动补全与搜索结果时，显示热搜词（优先级最低）-->
    <ul class="search-word" v-if="!autoCompleteList.length && !searchResult.length && !loading">
      <li class="search-hot-word" v-if="searchHotWords" v-for="(searchHotWord, index) in searchHotWords" :key="index" @click="fuzzySearch">
        {{searchHotWord.word}}
      </li>
    </ul>
    <!--有自动补全数据就显示自动补全（优先级最高）-->
    <ul class="auto-complete-list" v-if="autoCompleteList.length">
      <li v-for="(item, index) in autoCompleteList" :key="index" @click="fuzzySearch">
        <Icon name="search"></Icon>
        {{item}}
      </li>
    </ul>
    <pulse-loader :loading="loading" :color="color" :size="size" :margin="margin"></pulse-loader>
    <!--没有自动补全且有搜索结果就显示（优先级中）-->
    <transition name="fade">
      <ul class="search-result" v-if="searchResult.length && !autoCompleteList.length && !loading">
        <Booklist v-for="book in searchResult" :book="book" :key="book._id"></Booklist>
      </ul>
    </transition>
  </div>
</template>

<script>
import 'vue-awesome/icons/search';
import Icon from 'vue-awesome/components/Icon';
import api from '../libs/api';
import Booklist from '@/components/Booklist';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default {
  name: 'Search',
  components: {
    Icon,
    Booklist,
    PulseLoader
  },
  data() {
    return {
      searchWord: '',
      searchHotWords: null,
      autoCompleteList: [],
      searchResult: [],
      loading: false,
      color: '#04b1ff',
      size: '10px',
      margin: '4px',
    }
  },
  computed:{
    back(){
      return this.$store.state.prePath;
    }
  },
  created() {
    api.getHotWords().then(response => {
      this.searchHotWords = response.data.searchHotWords;
      //只取前10个热词
      this.searchHotWords.length = 10;
    }).
      catch(err => {
        console.log(err);
      })
  },
  watch: {
    'searchWord': function () {
      if (!this.searchWord) {
        this.autoCompleteList = [];
      }
    }
  },
  methods: {
    autoComplete(el) {
      this.searchWord = el.target.value;
      api.autoComplete(el.target.value).then(response => {
        this.autoCompleteList = response.data.keywords;
      }).catch(err => {
        console.log(err);
      })
    },
    fuzzySearch(el) {
      let search = el.target.value || el.target.innerText;
      this.searchWord = search;
      this.autoCompleteList = [];
      this.loading = true;
      api.fuzzySearch(search).then(response => {
        this.searchResult = response.data.books;
        this.loading = false;
      }).catch(err => {
        console.log(err);
      })
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // 记录下一个路径为search，但上一个路径不为书本详情的路径
      if (to.path.indexOf('/search') > -1 && from.path.indexOf('/book/') == -1) {
        vm.$store.commit('setPrePath',from.path)
      }
    })
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.search-head {
  position: fixed;  
  left: 0;
  width: 100vw;
  height: 3rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 0 1rem;
  background: #04b1ff;
}

.search-input {
  width: 100%;
  line-height: 1.5rem;
  padding-left: 1.8rem;
  border-radius: .4rem;
  border: none;
}

.search-input:focus,
.cancel:focus {
  outline: none;
}

.cancel {
  width: 5rem;
  font-size: 1rem;
  padding: .3rem 0 .3rem 0.8rem;
  color: #fff;
  text-align: center;
  border: none;
  background: #04b1ff;
}

.search-word {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-top: 4rem;
}

.search-hot-word {
  font-size: 0.8rem;
  padding: 0.2rem 0.6rem;
  border: 1px solid #f2f2f2;
  border-radius: 0.8rem;
  margin-left: 0.5rem;
  margin-bottom: 0.5rem;
}

.search-hot-word:active {
  background: #f2f2f2;
}

.auto-complete-list {
  display: flex;
  flex-direction: column;
  width: 100vw;
  margin-top: 3rem;
}

.auto-complete-list li {
  padding-left: 3rem;
  line-height: 2.5rem;
  border-bottom: 1px solid #f2f2f2;
}

.auto-complete-list li:active {
  background: #f2f2f2;
}

.auto-complete-list .fa-icon {
  height: 2.5rem;
}

.search-result {
  display: flex;
  flex-direction: column;
  margin-top: 3.5rem;
  width: 100vw;
}

.fa-icon {
  position: absolute;
  left: 1.5rem;
  height: 1.5rem;
  color: #ccc;
}
</style>
