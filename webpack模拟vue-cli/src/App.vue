<template>
    <div>
        <div class="box">hellow {{msg}}</div>
        <div>
            <div>
                <router-link to="/page1">go page1</router-link>
                <router-link to="/page2">go page2</router-link>
            </div>
            <div>
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'app',
        data() {
            return {
                msg: 'worls'
            }
        },
    }
</script>

<style lang='sass'>
.box{
    color: red;
}
</style>