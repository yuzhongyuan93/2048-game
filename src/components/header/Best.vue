<template>
    <section class="best">
        <div class="block">
            <p class="title">Best</p>
            <p class="content">0</p>
        </div>
    </section>
</template>

<script>
    export default {
        name: "Best"
    }
</script>

<style scoped>
    .best {
        flex: 1 1 160px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .block {
        background: #bbada0;
        padding: 10px 25px;
        font-size: 25px;
        line-height: 47px;
        font-weight: bold;
        border-radius: 3px;
        color: white;
        text-align: center;
        width: 130px;
        height: 130px;
    }
    .title {
        color: #eee4da;;
    }
</style>