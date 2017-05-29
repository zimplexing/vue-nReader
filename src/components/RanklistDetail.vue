<template>
  <div class="book-list-wrap">
    <pulse-loader :loading="loading" :color="color" :size="size" :margin="margin"></pulse-loader>
    <ul v-show="!loading">
      <Booklist v-for="book in rank.books" :book="book" :key="book._id"></Booklist>
    </ul>
  </div>
</template>

<script>
  import Booklist from '@/components/Booklist';
  import api from '../libs/api';
  import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

  export default {
    name: 'RanklistDetail',
    components: {
      Booklist,
      PulseLoader
    },
    data() {
      return {
        rank: {},
        loading: true,
        color: '#04b1ff',
        size: '10px',
        margin: '4px',
        ranktype: ''
      }
    },
    methods: {
      fetchData() {
        this.loading = true;
        switch (this.$route.path) {
          case '/ranklist/weekRank':
            this.rankType = this.$store.state.weekRankId;
            break;
          case '/ranklist/monthRank':
            this.rankType = this.$store.state.monthRankId;
            break;
          case '/ranklist/totalRank':
            this.rankType = this.$store.state.totalRankId;
            break;
          default:
            this.$router.push('/rank');
            break;
        }
        api.getRankList(this.rankType).then(response => {
          this.rank = response.data.ranking;
          this.loading = false;
        }).catch(error => {
          console.log(error);
        })
      }
    },
    watch:{
        '$route': 'fetchData'
    },
    created(){
         this.fetchData();
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  ul {
    display: flex;
    flex-direction: column;
    margin-top: 5.5rem;
  }

  .book-list-wrap {
    width: 100vw;
    background: #f2f2f2;
  }

</style>
