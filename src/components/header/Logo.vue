<template>
    <section class="logo">
        <section class="title">2048</section>
        <section class="content">
            <button class="button">New Game</button>
        </section>
    </section>
</template>

<script>
    export default {
        name: "Logo"
    }
</script>

<style scoped>
    .logo {
        height: 100%;
        flex: 1 1 160px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .title {
        color: #776e65;
        font-weight: bold;
        font-size: 72px;
        width: 100%;
    }
    .content {
        display: flex;
        justify-content: center;
    }
    .button {
        color: #FFFFFF;
        background: #8f7a66;
        border-radius: 3px;
        height: 42px;
        line-height: 42px;
        padding: 0 20px;
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;
    }
</style>