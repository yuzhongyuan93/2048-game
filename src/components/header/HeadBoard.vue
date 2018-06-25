<template>
    <section class="head">
        <Logo></Logo>
        <Score></Score>
        <Best></Best>
    </section>
</template>

<script>
    import Logo from './Logo';
    import Score from './Score';
    import Best from './Best';
    export default {
        name: "HeadBoard",
        components:{ Logo,Score,Best },
    }
</script>

<style scoped>
    .head {
        width: 100%;
        height: 200px;
        display: flex;
    }
</style>