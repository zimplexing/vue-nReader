<template>
    <div id="container" class="container">
        <div class="head" v-if="operation">
            <span @click="$router.push('/book/'+bookChapter.book)">
                <Icon name="arrow-left"></Icon>
            </span>
        </div>
        <div class="content" @click="operationAction">
            <header>{{bookChaptersContent.title}}</header>
            <article v-html="bookChaptersBody"></article>
        </div>
        <div class="menu" v-if="operation"></div>
    </div>
</template>

<script>
import api from '../libs/api'
import 'vue-awesome/icons/arrow-left';
import Icon from 'vue-awesome/components/Icon';
export default {
    name: 'ReadBook',
    components: {
        Icon
    },
    data() {
        return {
            bookDetail: {},
            bookOrigin: {},
            bookChapter: {},
            bookChaptersContent: '',
            operation: false
        }
    },
    computed: {
        bookChaptersBody() {
            return this.bookChaptersContent && this.bookChaptersContent.body.replace(/\n/g, '<br/><br/>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp');
        }
    },
    created() {
        api.getMixChapters(this.$route.params.bookId).then(response => {
            this.bookChapter = response.data.mixToc;
            this.getBookChapterContent(this.bookChapter.chapters[0].link);
        }).catch(err => {
            console.log(err);
        })
    },
    methods: {
        // todo 暂时获取一个章节内容，后续需要缓存3个章节左右
        getBookChapterContent(chapterUrl) {
            api.getBookChapterContent(chapterUrl).then(response => {
                this.bookChaptersContent = response.data.chapter;
            }).catch(err => {
                console.log(err);
            })
        },
        operationAction(el) {
            let screenHeight = document.body.clientHeight;
            let gap = document.body.clientHeight / 3;
            let targetPos = el.clientY;
            let contanierEle = document.getElementById('container');
            if (0 < targetPos && targetPos < gap) {
                contanierEle.scrollTop -= screenHeight;
            }
            if (targetPos > gap && targetPos < screenHeight - gap) {
                this.operation = !this.operation;
            }
            if (screenHeight - gap < targetPos && targetPos < screenHeight) {
                contanierEle.scrollTop += screenHeight;
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
    background: #dad9d4;
    width: 100vw;
    height: 100vh;
    overflow: auto;
}

header {
    text-align: center;
    margin-bottom: 1rem;
    font-size: 1.3rem;
    font-weight: bold;
}

article {
    font-size: 1.1rem;
    line-height: 1.7rem;
    padding: 0 1rem;
}

.head {
    position: fixed;
    top: 0;
    left: 0;
    height: 3rem;
    width: 100vw;
    background: #000;
    color: #fff;
}

.menu {
    position: fixed;
    bottom: 0;
    left: 0;
    background: #000;
    height: 4rem;
    width: 100vw;
}

.head .fa-icon {
    color: #fff;
    height: 3rem;
    width: 1rem;
    margin-left: 1rem;
}
</style>
