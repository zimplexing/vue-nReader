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
    components:{
        Booklist, PulseLoader
    },
    data() {
        return {
            rank: {},
            loading: true,
            color: '#04b1ff',
            size: '10px',
            margin: '4px'
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
            this.loading = true;
            api.getRankList(this.$route.params.id).then(response =>{
                this.rank = response.data.ranking;
                this.loading = false;
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
    .book-list-wrap{
        width: 100vw;
    }
</style>
