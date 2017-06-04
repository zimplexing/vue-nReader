<template>
    <header class="header">
        <span v-if="!showArrow"></span>
        <router-link v-else :to="goBack" class="operation"><Icon name="arrow-left" ></Icon></router-link>
        <div class="header-text">
            <span>{{headText}}</span>
        </div>
        <div class="operation" v-if="showFun">
            <span @click="$router.push({path:'/search'})"><Icon  name="search"></Icon></span>
            <!--<span @click="showBar"><Icon name="bars"></Icon></span>-->
        </div>
    </header>
</template>

<script>
import 'vue-awesome/icons/search';
import 'vue-awesome/icons/bars';
import 'vue-awesome/icons/arrow-left';
import Icon from 'vue-awesome/components/Icon';

export default {
    name: 'Topbar',
    components: {
        Icon
    },
    data() {
        return {

        }
    },
    props:{
        showArrow: {
            default: true
        },
        goBack:{
            type: String
        },
        headText:{
            type: String
        },
        showFun:{
            type: Boolean,
            default: true
        }
    },
    methods: {
        showBar() {
            alert('showbar');
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
header {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100vw;
    height: 3rem;
    line-height: 3rem;
    background: #04b1ff;
    color: #ffffff;
}

header a{
    color: #ffffff;
}

.header-text {
    position: absolute;
    left: 0;
    display: flex;
    justify-content: center;
    width: 100%;
}

.fa-icon {
    height: 3rem;
    width: 1rem;
    margin-left: 1rem;
    margin-right: .5rem;
}
.operation{
    z-index:10;
    margin-right: 1rem;
}
</style>
