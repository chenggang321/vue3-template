<template>
    <div class="main">
        <h3 class="text">hello world</h3>
        <el-button type="primary" @click="test">test</el-button>
    </div>
</template>

<script>
    export default {
        name: "index",
        mounted() {
            this.$http.get('/api/helloworld').then(res => {
                if (res.data.success) {
                    console.log(res);
                }
            });
            console.log(process.env.NODE_ENV)
        },
        methods: {
            test() {
                this.$toast({tips: 'toast调用成功！', iconClass: 'el-icon-error'});
            }
        }
    }
</script>

<style scoped lang="scss">
    .main {
        .text {
            color: #f00;
        }
    }
</style>
