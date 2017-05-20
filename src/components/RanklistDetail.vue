<template>
   <ul>
       <Booklist v-for="book in rank.books" :book="book" :key="book._id"></Booklist>
   </ul>
</template>

<script>
import Booklist from '@/components/Booklist';
import api from '../libs/api';

export default {
    name: 'RanklistDetail',
    components:{
        Booklist
    },
    data() {
        return {
            rank: {}
        }
    },
    created(){
        this.fetchData()
    },
    watch: {
        '$route': 'fetchData'
    },
    methods:{
        fetchData(){
            api.getRankList(this.$route.params.id).then(response =>{
                this.rank = response.data.ranking;
                console.log(this.rank);
            }).catch(error=>{
                console.log(error);
            })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    ul{
        display: flex;
        flex-direction: column;
        margin-top: 6rem;
    }
</style>
