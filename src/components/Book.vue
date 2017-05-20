
<template>
    <div>
        <Topbar :showArrow="showArrow" preUrl="/ranklist/weekRank/"></Topbar>
        <router-view></router-view>
    </div>
</template>

<script>
import Topbar from './Topbar'
import api from '../libs/api'
export default {
    name: 'Book',
    components:{
        Topbar
    },
    data() {
        return {
            showArrow: true,
            book: null
        }
    },
    created() {
        this.getBook();
    },
    methods: {
        getBook() {
            api.getBook(this.$route.params.bookId).then(response => {
                this.book = response.data;
            }).catch(err => {
                console.log(err);
            })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
