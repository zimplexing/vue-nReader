
<template>
    <div>
        <Topbar :showArrow="showArrow" preUrl="/ranklist/weekRank/"></Topbar>
        <section>
            <img :src="book.cover.indexOf('http') === -1 ? staticPath + book.cover : book.cover.slice(book.cover.indexOf('http'))">
            <div class="book-info">
                <p class="book-title">{{book.title}}</p>
                <p class="book-author">{{book.author}}</p>
                <p class="reader-info"><span v-text=""></span>| {{wordCount}}万 | {{book.cat}}</p>
            </div>
        </section>
        <section></section>
    </div>
</template>

<script>
import Topbar from './Topbar'
import api from '../libs/api'

export default {
    name: 'Book',
    components: {
        Topbar
    },
    data() {
        return {
            showArrow: true,
            book: null,
            staticPath: 'http://statics.zhuishushenqi.com/'
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
        }, err => {
            console.log(err)
        });
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
</style>
