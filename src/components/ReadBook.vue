<template>
    <article>
    </article>
</template>

<script>
import api from '../libs/api'
export default {
    name: 'ReadBook',
    data() {
        return {
            bookDetail: {},
            bookOrigin: {},
            bookChapter: {},
        }
    },
    created() {
        api.getOrigin(this.$route.params.bookId).then(response => {
            // let _that = this;
            this.bookOrigin = response.data;
            this.bookChapter = this.getBookChapter(response.data[1]._id);
            // this.bookOrigin.forEach(function (origin) {
                // if (origin.source !== 'zhuishuvip') {
                //     _that.bookChapter = _that.getBookChapter(origin._id);
                //     return false;
                // }
            // })
        }).catch(err => {
            console.log(err);
        })
    },
    beforeMount() {
        console.log('beforeMount');
    },
    mounted() {
        console.log('mounted');
    },
    methods: {
        getBookChapter(originId) {
            api.getChapters(originId).then(response => {
                return response.data;
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
