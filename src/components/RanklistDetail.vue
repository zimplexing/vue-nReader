<template>
  <div class="book-list-wrap">
    <pulse-loader :loading="loading" :color="color" :size="size" :margin="margin"></pulse-loader>
    <ul v-show="!loading">
      <!--<keep-alive>-->
      <Booklist v-for="book in rank.books" :book="book" :key="book._id"></Booklist>
      <!--</keep-alive>-->
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
      fetchData(ranktype) {
        this.loading = true;
        api.getRankList(ranktype).then(response => {
          this.rank = response.data.ranking;
          this.loading = false;
        }).catch(error => {
          console.log(error);
        })
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        switch (to.path) {
          case '/ranklist/weekRank':
            console.log('weekRankId:'+ vm.$store.state.weekRankId);
            vm.rankType = vm.$store.state.weekRankId;
            break;
          case '/ranklist/monthRank':
            console.log('weekRankId:'+ vm.$store.state.weekRankId);          
            vm.rankType = vm.$store.state.monthRankId;
            break;
          case '/ranklist/totalRank':
            console.log('weekRankId:'+ vm.$store.state.weekRankId);
            vm.rankType = vm.$store.state.totalRankId;
            break;
          default:
            vm.$router.push('/rank');
            break;
        }
        vm.fetchData(vm.rankType);
      })
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  ul {
    display: flex;
    flex-direction: column;
    margin-top: 6rem;
  }
  
  .book-list-wrap {
    width: 100vw;
  }

</style>
