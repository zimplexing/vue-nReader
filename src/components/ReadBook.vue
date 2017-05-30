<template>
    <div id="container" class="container">
        <div class="head" v-if="operation">
            <span class="arrow-left" @click="$router.push(preView)">
                <Icon type="arrow-left-c"></Icon>
            </span>
            <!--todo 过长或有显示问题-->
            {{$store.state.bookInfo.title}}
        </div>
        <pulse-loader :loading="loading" :color="color" :size="size" :margin="margin"></pulse-loader>
        <div class="content" v-show="!loading" @click="operationAction" :class="{'night-mode':nightMode}">
            <header>{{bookChaptersContent.title}}</header>
            <article v-html="bookChaptersBody"></article>
        </div>
        <div class="menu" v-if="operation">
            <div class="menu-btn" @click="showChapter">
                <Icon type="ios-list-outline"></Icon>
                <span>目录</span>
            </div>
            <div class="menu-btn">
                <Icon type="ios-gear-outline"></Icon>
                <span>设置</span>
            </div>
            <div class="menu-btn" v-if="nightMode" @click="changeMode">
                <Icon type="ios-sunny-outline"></Icon>
                <span>日间模式</span>
            </div>
            <div class="menu-btn" @click="changeMode" v-else>
                <Icon type="ios-moon-outline"></Icon>
                <span>夜间模式</span>
            </div>
        </div>
        <div class="chapter-list" v-show="isShowChapter">
            <div class="chapter-contents">
                <p>{{$store.state.bookInfo.title}}：目录</p>
                <span class="chapter-sort" @click="descSort">
                    <Icon type="arrow-down-b" v-if="!chapterDescSort"></Icon>
                    <Icon type="arrow-up-b" v-else></Icon>
                </span>
            </div>
            <ul>
                <li v-if="bookChapter.chapters" v-for="(chapter, index) in bookChapter.chapters" :key="index" @click="jumpChapter(index)">{{chapter.title}}</li>
            </ul>
        </div>
        <Modal v-model="showAddToShelf" title="添加到书架" :closable="false" :mask-closable="false" okText="添加" @on-ok="addBook" @on-cancel="dontAddBookToShelf">
            <p>是否将该书添加到本地书架</p>
        </Modal>
    </div>
</template>

<script>
import api from '../libs/api'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'


export default {
    name: 'ReadBook',
    components: {
        PulseLoader
    },
    data() {
        return {
            loading: true,
            color: '#04b1ff',
            size: '10px',
            margin: '4px',
            bookDetail: {},
            bookOrigin: {},
            bookChapter: {},
            bookChaptersContent: '',
            preView: '',
            firstLoad: true, //首次加载标识符
            operation: false, //显示操作界面标识符
            currentChapter: 0,
            isNewset: false, //最新章节
            nightMode: false, //夜间/日间模式却换
            isShowChapter: false, //是否显示目录
            showAddToShelf: false, //显示添加书架的提示
            chapterDescSort: false, //是否降序排列
            dontAddBook: false //不添加到书架
        }
    },
    computed: {
        bookChaptersBody() {
            return this.bookChaptersContent && this.bookChaptersContent.body.replace(/\n/g, '<br/><br/>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp');
        }
    },
    created() {
        let readRecord = JSON.parse(window.localStorage.getItem('followBookList'));
        // let scrollTop = readRecord ? readRecord[this.$route.params.bookId].readPos : 0;
        this.firstLoad = true;
        api.getMixChapters(this.$route.params.bookId).then(response => {
            this.bookChapter = response.data.mixToc;
            this.currentChapter = readRecord && readRecord[this.$route.params.bookId] && readRecord[this.$route.params.bookId].chapter ? readRecord[this.$route.params.bookId].chapter : 0;
            this.getBookChapterContent();
        }).catch(err => {
            console.log(err);
        })
    },
    watch: {
        'currentChapter': 'getBookChapterContent'
    },
    methods: {
        // todo 暂时获取一个章节内容，后续需要缓存3个章节左右
        getBookChapterContent() {
            this.loading = true;
            api.getBookChapterContent(this.bookChapter.chapters[this.currentChapter].link).then(response => {
                this.bookChaptersContent = response.data.chapter;
                this.loading = false;
            }).catch(err => {
                this.$Message.error('获取章节失败！');
                console.log(err);
            })
        },
        operationAction(el) {
            if (this.isShowChapter) {
                this.isShowChapter = false;
                return;
            }
            let screenHeight = document.body.clientHeight;
            let gap = document.body.clientHeight / 3;
            let targetPos = el.clientY;
            let contanierEle = document.getElementById('container');
            if (0 < targetPos && targetPos < gap) {
                this.operation = false;
                contanierEle.scrollTop -= screenHeight;
            }
            if (targetPos > gap && targetPos < screenHeight - gap) {
                this.operation = !this.operation;
            }
            if (screenHeight - gap < targetPos && targetPos < screenHeight) {
                this.operation = false;
                //判断是否到底部
                if (contanierEle.scrollHeight === contanierEle.scrollTop + screenHeight) {
                    if (this.currentChapter >= this.bookChapter.chapters.length) {
                        this.$Message.info('这已经是最新的章节了~');
                        return;
                    }
                    //当前章节加1
                    this.currentChapter += 1;
                }
                contanierEle.scrollTop += screenHeight;
            }
        },
        changeMode() {
            this.nightMode = !this.nightMode;
        },
        showChapter() {
            this.isShowChapter = true;
        },
        jumpChapter(index) {
            this.currentChapter = index;
            this.isShowChapter = false;
            this.operation = false;
        },
        recordReadHis(readRecord) {
            //目录正反序时，记录的都是正序排列的实际索引
            let chapterRecord = this.chapterDescSort ? this.bookChapter.chapters.length - this.currentChapter - 1 : this.currentChapter;
            readRecord[this.$route.params.bookId] = {
                cover: this.$store.state.bookInfo.cover,
                title: this.$store.state.bookInfo.title,
                chapter: chapterRecord,
                readPos: document.getElementById('container').scrollTop
            }
            window.localStorage.setItem('followBookList', JSON.stringify(readRecord));
        },
        addBook() {
            let readRecord = JSON.parse(window.localStorage.getItem('followBookList')) || {};
            this.recordReadHis(readRecord);
            this.$Message.success('添加成功！');
            this.$router.push('/book/' + this.bookChapter.book);            
        },
        dontAddBookToShelf(){
            this.dontAddBook = true;
            this.$router.push('/book/' + this.bookChapter.book);                        
        },
        descSort() {
            this.chapterDescSort = !this.chapterDescSort;
            this.bookChapter.chapters.reverse();
        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.preView = from.fullPath;
        })
    },
    beforeRouteLeave(to, from, next) {
        this.dontAddBook && next();
        let readRecord = JSON.parse(window.localStorage.getItem('followBookList')) || {};
        if (!readRecord[this.bookChapter.book]) {
            this.showAddToShelf = true;
            next(false);
        } else {
            this.recordReadHis(readRecord);
            next();
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
    color: #000;
}

header {
    text-align: center;
    padding-top: 1rem;
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
    color: #f3e7e7;
    text-align: center;
    line-height: 3rem;
}

.menu {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    position: fixed;
    bottom: 0;
    left: 0;
    background: #000;
    height: 3.5rem;
    width: 100vw;
}

.menu-btn {
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #f3e7e7;
    text-align: center
}

.menu-btn i {
    font-size: 1.6rem;
}

.menu-btn span {
    font-size: 0.8rem;
}

.arrow-left {
    position: absolute;
    left: 1rem;
    line-height: 3rem;
    font-size: 1.5rem;
}

.night-mode {
    background: #383434;
    color: #807d7d;
}

.chapter-list {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    overflow: auto;
    background: #fff;
    width: 80vw;
}

.chapter-list ul {
    margin-top: 2.5rem;
}

.chapter-list li {
    padding-left: 1rem;
    line-height: 2.5rem;
    border-bottom: 1px solid #f2f2f2;
}

.chapter-contents {
    position: fixed;
    top: 0;
    left: 0;
    width: 80vw;
    background: #fff;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    line-height: 2.5rem;
    padding-left: 1rem;
}

.chapter-sort {
    margin-right: 1.5rem;
    font-size: 1.4rem;
}
</style>
