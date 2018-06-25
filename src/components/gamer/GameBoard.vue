<template>
    <section id="gameBody">
        <BaseBoard></BaseBoard>
        <div id="numbers">
            <Number></Number>
        </div>
    </section>
</template>

<script>
    import BaseBoard from './BaseBoard'
    import Number from './Number';
    export default {
        name: "GameBoard",
        components:{ BaseBoard,Number },
    }
</script>

<style scoped>
    #gameBody {
        position: relative;
    }
    #numbers {
        z-index: 2;
    }
</style>