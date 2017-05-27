<template>
  <div>
    <div class="search-head">
      <Icon name="search"></Icon>
      <input type="text" class="search-input" placeholder="输入书名或者作者名" @keyup.enter="fuzzySearch" @keyup="autoComplete" :value="searchWord">
      <button type="button" class="cancel" :goBack="prePath" @click="$router.push({path:prePath})">取消</button>
    </div>
    <ul class="search-word" v-if="!autoCompleteList.length && !searchResult.length">
      <li class="search-hot-word" v-if="searchHotWords" v-for="(searchHotWord, index) in searchHotWords" :key="index" @click="fuzzySearch">
        {{searchHotWord.word}}
      </li>
    </ul>
    <ul class="auto-complete-list" v-if="autoCompleteList.length && !searchResult.length">
      <li v-for="(item, index) in autoCompleteList" :key="index" @click="fuzzySearch">
        <Icon name="search"></Icon>
        {{item}}
      </li>
    </ul>
    <transition name="fade">
    <ul class="search-result">
      <pulse-loader :loading="loading" :color="color" :size="size" :margin="margin"></pulse-loader>
      <Booklist v-if="searchResult.length && !loading" v-for="book in searchResult" :book="book" :key="book._id"></Booklist>
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
        prePath: '',
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
        this.autoCompleteList.lenth = 0;
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
        vm.prePath = from.path;
      })
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .search-head {
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
    margin-top: 1rem;
  }

  .search-hot-word {
    font-size: 0.8rem;
    padding: 0.2rem 0.6rem;
    border: 1px solid #f2f2f2;
    border-radius: 0.8rem;
    margin-left: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .search-hot-word:active{
    background: #f2f2f2;
  }

  .auto-complete-list {
    display: flex;
    flex-direction: column;
  }

  .auto-complete-list li {
    padding-left: 3rem;
    line-height: 2.5rem;
    border-bottom: 1px solid #f2f2f2;
  }

  .auto-complete-list li:active{
    background: #f2f2f2;
  }

  .auto-complete-list .fa-icon {
    height: 2.5rem;
  }

  .search-result {
    display: flex;
    flex-direction: column;
    width: 100vw;
  }

  .fa-icon {
    position: absolute;
    left: 1.5rem;
    height: 1.5rem;
    color: #ccc;
  }

</style>
