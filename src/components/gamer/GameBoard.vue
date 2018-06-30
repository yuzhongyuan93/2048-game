<template>
    <section id="gameBody" @click="handleKey">
        <BaseBoard></BaseBoard>
        <div id="numbers">
            <Number :row="item.row" :col="item.col" :number="item.num" v-for="item in computedArray"></Number>
        </div>
    </section>
</template>

<script>
    import BaseBoard from './BaseBoard'
    import Number from './Number';
    export default {
        name: "GameBoard",
        data(){
            return {
                lastArray:[[0,2,0,0],[0,0,0,0],[0,0,2,0],[0,0,0,0]],//上一次的矩阵
            }
        },
        computed:{
            computedArray(){//筛选出有值的项，生成新的数组
                let arr = [];
                for( let i = 0 ; i < 4 ; i++ ){
                    for( let j = 0 ; j < 4 ; j++ ){
                        let temp = this.lastArray[i][j];
                        if( temp !== 0 ){
                            arr.push({row:i,col:j,num:this.lastArray[i][j]});
                        }
                    }
                }
                return arr;
            },
        },
        mounted(){
            const _this = this;
            document.onkeydown=function (e) {
                var arr = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
                for( let i = 0 ; i < 4 ; i++ ){
                    for( let j = 0 ; j < 4 ; j++ ){
                        arr[i][j] = _this.lastArray[i][j];
                    }
                }
                debugger
                if( e.keyCode == 37 ){
                    // direction = "left";
                    for( var i = 0 ; i < 4; i++ ){
                        var temp = arr[i].filter(function(item){
                            return item != 0 ;
                        })
                        var que = [];
                        while( temp.length != 0 ){
                            var first = temp.shift();
                            var last = temp.shift();
                            if( first == last ){
                                que.push( first + first );
                                // changeSore(first+first);
                            }
                            else if( last ) {
                                que.push( first );
                                temp.unshift( last );
                            }
                            else{
                                que.push(first);
                            }
                        }
                        for( var k = 0 ; k < 4 ; k++){
                            var shift = que.shift();
                            if( shift ){
                                arr[i][k] = shift;
                            }
                            else{
                                arr[i][k] = 0;
                            }
                        }
                    }
                    _this.renderNumbers(arr);
                }
                if( e.keyCode == 38 ){
                    // direction = "up";
                    var arr2 = [[],[],[],[]];
                    for( var m = 3 ; m >= 0 ; m-- ){
                        for( var n = 0 ; n < 4 ; n++ ){
                            arr2[n].push(arr[m][n]);
                        }
                    }
                    for( var i = 0 ; i < 4; i++ ){
                        var temp = arr2[i].filter(function(item){
                            return item != 0 ;
                        })
                        var que = [];
                        while( temp.length != 0 ){
                            var first = temp.pop();
                            var last = temp.pop();
                            if( first == last ){
                                que.push( first + first );
                                // changeSore(first+first);
                            }
                            else if( last ) {
                                que.push( first );
                                temp.push( last );
                            }
                            else{
                                que.push(first);
                            }
                        }
                        for( var k = 0 ; k < 4 ; k++ ){
                            var shift = que.shift();
                            if( shift ){
                                arr[k][i] = shift;
                            }
                            else{
                                arr[k][i] = 0;
                            }
                        }
                    }
                    _this.renderNumbers(arr);

                }
                if( e.keyCode == 39 ){
                    // direction = "right";
                    for( var i = 0 ; i < 4; i++ ){
                        var temp = arr[i].filter(function(item){
                            return item != 0 ;
                        })
                        var que = [];
                        while( temp.length != 0 ){
                            var first = temp.pop();
                            var last = temp.pop();
                            if( first == last ){
                                que.push( first + first );
                                // changeSore(first+first);
                            }
                            else if( last ) {
                                que.push( first );
                                temp.push( last );
                            }
                            else{
                                que.push(first);
                            }
                        }
                        for( var k = 3 ; k >= 0 ; k--){
                            var shift = que.shift();
                            if( shift ){
                                arr[i][k] = shift;
                            }
                            else{
                                arr[i][k] = 0;
                            }
                        }
                    }
                    _this.renderNumbers(arr);

                }
                if( e.keyCode == 40 ){
                    // direction = "down";
                    var arr2 = [[],[],[],[]];
                    for( var m = 3 ; m >= 0 ; m-- ){
                        for( var n = 0 ; n < 4 ; n++ ){
                            arr2[n].push(arr[m][n]);
                        }
                    }
                    for( var i = 0 ; i < 4; i++ ){
                        var temp = arr2[i].filter(function(item){
                            return item != 0 ;
                        })
                        var que = [];
                        while( temp.length != 0 ){
                            var first = temp.shift();
                            var last = temp.shift();
                            if( first == last ){
                                que.push( first + first );
                                // changeSore(first+first);
                            }
                            else if( last ) {
                                que.push( first );
                                temp.unshift( last );
                            }
                            else{
                                que.push(first);
                            }
                        }
                        for( var k = 3 ; k >= 0 ; k-- ){
                            var shift = que.shift();
                            if( shift ){
                                arr[k][i] = shift;
                            }
                            else{
                                arr[k][i] = 0;
                            }
                        }
                    }
                    _this.renderNumbers(arr);

                }
            }
        },
        methods:{
            handleKey(){//响应方向键
                this.lastArray = [[0,0,0,2],[0,0,4,0],[0,0,2,0],[0,0,0,0]]
            },
            renderNumbers(arr){
                console.log(arr)
                this.$set(this.lastArray,arr);
            },
        },
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