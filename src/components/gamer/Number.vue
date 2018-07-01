<template>
    <div class="number" :class="[positionClass,numberClass]">
        <div class="number-inner" :name="new Date().getTime()">{{ number }}</div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    export default {
        name: "Number",
        props:['row','col','number'],
        data(){
            return {

            }
        },
        computed:{
            positionClass(){ return 'number-position-'+this.row+'-'+this.col },
            numberClass(){ return 'number-'+this.number },
        },
        methods:{
            listenKeys(){
                document.onkeydown = function(e){

                }
        }
    }
</script>

<style scoped>
    /*@keyframes appear{*/
        /*0%{*/
            /*opacity: 0;*/
            /*transform: scale(0);*/
        /*}*/
        /*100% {*/
            /*opacity: 1.0;*/
            /*transform: scale(1);*/
        /*}*/
    /*}*/
    .number {
        position: absolute;
        top: 10px;
        left: 10px;
        animation:appear 200ms ease 100ms;
    }
    .number-inner {
        width: 112.5px;
        height: 112.5px;
        line-height: 112.5px;
        margin-right: 10px;
        float: left;
        background: #eee4da;
    }
    .number, .number-inner {
        border-radius: 3px;
        text-align: center;
        font-weight: bold;
        z-index: 10;
        font-size: 55px;
        transition: 100ms ease-in-out;
        -webkit-transition-property: -webkit-transform;
        -moz-transition-property: -moz-transform;
        transition-property: transform;
    }
    /*numbers*/
    .number-2 .number-inner {
        background: #eee4da;
    }
    .number-4 .number-inner {
        background: #ede0c8;
    }
    .number-8 .number-inner {
        color: #f9f6f2;
        background: #f2b179;
    }
    .number-16 .number-inner {
        color: #f9f6f2;
        background: #f59563;
    }
    .number-32 .number-inner {
        color: #f9f6f2;
        background: #f67c5f;
    }
    .number-64 .number-inner {
        color: #f9f6f2;
        background: #f65e3b;
    }
    /*position*/
    .number-position-0-0 {
        transform: translate(0,0);
    }
    .number-position-0-1 {
        transform: translate(122.5px,0);
    }
    .number-position-0-2 {
        transform: translate(245px,0);
    }
    .number-position-0-3 {
        transform: translate(367.5px,0);
    }
    .number-position-1-0 {
        transform: translate(0,122.5px);
    }
    .number-position-1-1 {
        transform: translate(122.5px,122.5px);
    }
    .number-position-1-2 {
        transform: translate(245px,122.5px);
    }
    .number-position-1-3 {
        transform: translate(367.5px,122.5px);
    }
    .number-position-2-0 {
        transform: translate(0,245px);
    }
    .number-position-2-1 {
        transform: translate(122.5px,245px);
    }
    .number-position-2-2 {
        transform: translate(245px,245px);
    }
    .number-position-2-3 {
        transform: translate(367.5px,245px);
    }
    .number-position-3-0 {
        transform: translate(0,367.5px);
    }
    .number-position-3-1 {
        transform: translate(122.5px,367.5px);
    }
    .number-position-3-2 {
        transform: translate(245px,367.5px);
    }
    .number-position-3-3 {
        transform: translate(367.5px,367.5px);
    }
</style>