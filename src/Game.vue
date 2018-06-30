<template>
    <section class="container">
        <HeadBoard></HeadBoard>
        <GameBoard></GameBoard>
    </section>
</template>

<script>
    import HeadBoard from './components/header/HeadBoard';
    import GameBoard from './components/gamer/GameBoard';
    export default {
        name: "Game",
        components:{ HeadBoard,GameBoard },
    }
</script>

<style scoped>
    .container {
        width: 500px;
        height: 100%;
        margin: 0 auto;
    }
</style>