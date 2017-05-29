<template>
    <div>
        <Topbar :showArrow="showArrow" goBack="/bookcat" :headText="major" :showFun="showFun"></Topbar>
        <div class="select">
            <ul class="select-bar">
                <li v-for="(item, index) in types" @click="setType(item.type)">{{item.name}}</li>
            </ul>
            <ul class="select-bar">
                <li data-type="hot">全部</li>
                <li v-if="mins" v-for="(minor, index) in mins" @click="setMinor(minor)">{{minor}}</li>
            </ul>
        </div>
        <pulse-loader :loading="loading" :color="color" :size="size" :margin="margin"></pulse-loader>
        <ul v-show="!loading" class="book-list">
            <Booklist v-for="book in books" :book="book" :key="book._id"></Booklist>
        </ul>
    </div>
</template>
<script>
import api from '../libs/api'
import Topbar from '@/components/Topbar'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import Booklist from '@/components/Booklist';

export default {
    name: "BookcatDetail",
    components: {
        Topbar, PulseLoader, Booklist
    },
    data() {
        return {
            showArrow: true,
            showFun: false,
            loading: true,
            color: '#04b1ff',
            size: '10px',
            margin: '4px',
            books: null,
            type: 'hot',
            gender: '',
            major: '',
            minor: '',
            mins: null,
            types: [{
                type: 'hot',
                name: '热门'
            }, {
                type: 'new',
                name: '新书'
            }, {
                type: 'reputation',
                name: '好评'
            }, {
                type: 'over',
                name: '完结'
            }, {
                type: 'monthly',
                name: '包月'
            }]
        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.major = vm.$route.query.major;
            vm.gender = vm.$route.query.gender;
            /**
             * 获取大分类中的小类别
             */
            api.getCategoryDetail().then(response => {
                response.data[vm.$route.query.gender].forEach((type) => {
                    if (type.major === vm.$route.query.major) {
                        vm.mins = type.mins;
                    }
                })
            }).catch(err => {
                console.log(err);
            });
            vm.getNovelListByCat(vm.$route.query.gender, vm.type, vm.$route.query.major);
        })
    },
    methods: {
        /**
         * 根据筛选分类获取结果
         */
        //todo 入参需要优化
        getNovelListByCat(gender, type, major, minor) {
            this.loading = true;
            api.getNovelListByCat(gender, type, major, minor).then(response => {
                this.loading = false;
                this.books = response.data.books;
            }).catch(err => {
                console.log(err);
            })
        },
        setType(type) {
            this.type = type;
            this.getNovelListByCat(this.gender, this.type, this.major, this.minor);
        },
        setMinor(minor) {
            this.minor = minor;
            this.getNovelListByCat(this.gender, this.type, this.major, this.minor);
        }
    }
}
</script>
<style scoped>
.select {
    position: fixed;
    top: 3rem;
    left: 0;
    background: #fff;
}

.select-bar {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    overflow: auto;
    height: 2.5rem;
    flex-wrap: wrap;
    width: 100vw;
    border-bottom: 1px solid #f2f2f2;
}

.select-bar li {
    line-height: 2.5rem;
    margin-left: 0.6rem;
    font-size: 0.9rem;
}

.active {
    color: red;
}
.book-list{
    width: 100vw;
    margin-top: 8rem;
    background: #f2f2f2;
}
</style>
