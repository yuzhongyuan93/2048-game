<template>
    <div class="grid-container">
        <div class="grid-row" v-for="n in 4">
            <div class="grid-cell" v-for="m in 4"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "BaseBoard"
    }
</script>

<style scoped>
    .grid-container {
        width: 480px;
        height: 480px;
        background: #bbada0;
        padding: 10px;
        border-radius: 6px;
        box-sizing: content-box;
    }
    .grid-row {
        width: 100%;
        height: 112px;
        margin-bottom: 10px;
    }
    .grid-cell {
        width: 112.5px;
        height: 112.5px;
        margin-right: 10px;
        float: left;
        border-radius: 3px;
        background: rgba(238, 228, 218, 0.35);
    }
    .grid-cell:last-child {
        margin-right: 0px;
    }
</style>