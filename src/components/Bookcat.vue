<template>
    <div>
        <section v-for="(item ,key, index) in category" :key="index">
            <p class="category-type">{{categoryType[key]}}</p>
            <ul>
                <li v-for="(male, index) in item" :key="index">
                    <p class="category">{{male.name}}</p>
                    <span>{{male.bookCount}}</span>
                </li>
            </ul>
        </section>
    
    </div>
</template>
<script>
import api from '../libs/api';
export default {
    name: 'Booklcat',
    data() {
        return {
            category: null,
            categoryType: {
                male: '男生',
                female: '女生',
                press: '出版'
            }
        }
    },
    created() {
        api.getCategory().then(response => {
            this.category = response.data;
        }).catch(err => {
            conosle.log(err)
        })
    }
}
</script>
<style scoped>
ul {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-left: 1rem;
    margin-right: 1rem;
}

li {
    width: 33.3%;
    text-align: center
}

.category {
    font-weight: bold;
    font-size: 1rem;
    margin-bottom: 0.1rem;
    margin-top: 0.8rem;
}

.category-type {
    line-height: 2rem;
    margin-top: 0;
    margin-bottom: 0;
    margin-left: 1rem;
    margin-right: 1rem;
    border-bottom: 1px solid #f3eded;
}

span {
    color: #959595;
}

div {
    background: #f7f7f7;
}
</style>