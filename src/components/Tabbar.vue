<template>
    <ul class="tabbar">
        <li>
            <router-link to="/bookshelf" active-class="active" exact>
                <div>
                    <Icon name="book"></Icon>
                </div>
                <div>书架</div>
            </router-link>
        </li>
        <li>
            <router-link to="/bookcat" active-class="active" exact>
                <div>
                    <Icon name="shopping-cart"></Icon>
                </div>
                <div>分类</div>
            </router-link>
        </li>
        <li>
            <router-link to="/rank" active-class="active" exact>
                <div>
                    <Icon name="list"></Icon>
                </div>
                <div>排行榜</div>
            </router-link>
        </li>
    </ul>
</template>
<script>
import 'vue-awesome/icons/book';
import 'vue-awesome/icons/shopping-cart';
import 'vue-awesome/icons/list';
import Icon from 'vue-awesome/components/Icon';

export default {
    name: 'tabbar',
    components: {
        Icon
    }
}
</script>
<style>
.tabbar {
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    justify-content: center;
    background: #fff;
    width: 100vw;
}

.tabbar li {
    width: 33.3%;
    text-align: center;
    padding-top: .3rem;
    border-top: 1px solid #ece3e3;
}

.tabbar p {
    margin-top: 0;
    margin-bottom: 0;
}

.tabbar .fa-icon {
    height: 1.5rem;
    width: 1.5rem;
}

.tabbar li a {
    font-size: 0.8rem;
    text-decoration: none;
    color: #a58181;
}

.tabbar li .active {
    color: #6d7ac5;
}
</style>