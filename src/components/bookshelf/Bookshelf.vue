<template>
    <div>
        <mt-button type="primary" class="add-book" v-if="!books.length">添加小说</mt-button>
        <ul class="book-shelf" v-if="books.length">
            <v-touch tag="li" class="book-list-wrap" v-for="(book, index) in books" :key="index" @swipeleft="showDelBookBtn" @swiperight="hideDelBookBtn">
                <v-touch class="book-list" @tap="readbook(book)">
                    <img :src="book.cover" onerror="javascript:this.src='https://github.com/zimplexing/vue-nReader/blob/master/screenshot/errBook.png?raw=true'" />
                    <div class="info">
                        <p class="title">{{book.title}}</p>
                        <p class="updated">{{book.updated | ago}}：{{book.lastChapter}}</p>
                    </div>
                    <v-touch class="del-book-btn" @tap="delBook($event,index)">删除</v-touch>
                </v-touch>
            </v-touch>
        </ul>
    </div>
</template>

<script>
import api from '@/api/api'
import moment from 'moment'
import util from '@/utils/util'
import { Indicator } from 'mint-ui';

moment.locale('zh-cn');
export default {
    name: 'Bookshelf',
    data() {
        return {
            books: [],
        }
    },
    filters: {
        /**
         * 使用moment格式化时间
         */
        ago(time) {
            return moment(time).fromNow();
        }
    },
    created() {
        this.getBookUpdate();
    },
    methods: {
        /**
         * 返回追更新的书本id
         */
        getBookList() {
            let localShelf = util.getLocalStroageData('followBookList');
            let bookListArray = [];
            for (let bookId in localShelf) {
                bookListArray.push(bookId);
            }
            return bookListArray;
        },

        getBookUpdate() {
            let localShelf,
                _that = this;
            Indicator.open();
            api.getUpdate(this.getBookList()).then(response => {
                localShelf = util.getLocalStroageData('followBookList');
                response.data.forEach((book, index)=>{                 
                    Object.assign(book, localShelf[book._id]);
                    book.cover = util.parseImgUrl(book.cover);
                    _that.books.push(book);
                });
                Indicator.close();
            }).catch(err => {
                console.log(err);
                Indicator.close();
            })
        },
        
        readbook(book) {
            this.$store.commit('setReadBook', book);
            this.$router.push('/readbook/' + book._id);
        },

        showDelBookBtn(e) {
            let target = e.target.parentElement;
            while (target.className !== 'book-list') {
                target = target.parentElement;
            }
            target.style.left = '-44vw';
        },

        hideDelBookBtn(e) {
            let target = e.target.parentElement;
            while (target.className !== 'book-list') {
                target = target.parentElement;
            }
            target.style.left = '0';
        },

        delBook($event, index) {
            let storage = window.localStorage;
            let localShelf = JSON.parse(storage.getItem('followBookList')) ? JSON.parse(storage.getItem('followBookList')) : {};
            //删除该书籍在本地的缓存记录
            delete localShelf[this.books[index]._id];
            this.books.splice(index, 1);
            //重新保存
            storage.setItem("followBookList", JSON.stringify(localShelf));
        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.changeHeadText();
        })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.add-book {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.add-book:focus {
    outline: none;
}

.book-shelf {
    width: 100vw;
    overflow: hidden;
    box-sizing: border-box;
    padding: .5rem 0 0 .5rem;
}

.book-list-wrap {
    position: relative;
    height: 5rem;
    margin-bottom: .2rem;
}

.book-list {
    position: absolute;
    left: 0;
    width: 140vw;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: .2rem;
}

.book-list img {
    height: 5rem;
    float: left;
    margin-right: .4rem;
}

.info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
    width: 100%;
    height: 5rem;
    margin-left: .6rem;
    border-bottom: 1px solid #f2f2f2;
}

.info p {
    margin-top: .2rem;
    margin-bottom: .2rem;
}

.updated {
    color: #6d6666;
    font-size: .8rem;
}

.del-book-btn {
    color: #fff;
    background: red;
    width: 40vw;
    line-height: 5rem;
    text-align: center;
}
</style>
