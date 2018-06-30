(function(w){
	
	var Gamer = function(){
		
		//基础参数
		var _this = this;
		var direction = "";
		var arr = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
		var score = 0;
		var best = 0;
		
		//获取随机0——3
		var getRandom = function(){
			return Math.floor(Math.random()*4);
		}
		
		//更新分数
		var changeSore = function(s){
			score += s;
			document.getElementById("score").childNodes[3].innerHTML = score;
			if( score > best ){
				best = score;
				document.getElementById("best").childNodes[3].innerHTML = score;
			}
		}
		
		//监听方向键事件
		var listenKey = function(){
			document.onkeydown = function(e){
				if( e.keyCode == 37 ){
					direction = "left";
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
								changeSore(first+first);
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
					_this.render();
				}
				if( e.keyCode == 38 ){
					direction = "up";
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
								changeSore(first+first);
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
					_this.render();
				}
				if( e.keyCode == 39 ){
					direction = "right";
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
								changeSore(first+first);
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
					_this.render();
				}
				if( e.keyCode == 40 ){
					direction = "down";
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
								changeSore(first+first);
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
					_this.render();
				}
			}
		}
		
		//初始化游戏
		this.init = function(){
			direction = "";
			arr = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
			score = 0;
			changeSore(0);
			var getRandomXY = function(){
				var x = getRandom(),
					y = getRandom();
				while( x == y ){
					x = getRandom();
					y = getRandom();
				}
				_this.createNumber(x,y,2);
			}
			getRandomXY();
			getRandomXY();
			listenKey();
		}
		
		//在指定坐标创建数字元素
		this.createNumber = function(x,y,num){
			var outer = document.createElement("div");
			var inner = document.createElement("div");
			var container = document.getElementById("numbers");
			var _class = "number number-"+num+" number-position-"+x+"-"+y;
			outer.className = _class;
			inner.className = "number-inner";
			inner.innerHTML = num;
			outer.appendChild(inner);
			container.appendChild(outer);
			arr[x][y] = num;
		}
		
		//进行单次渲染
		this.render = function(){
			console.log(arr)
			this.flush();
			//每次新产生一个2
			var x = getRandom(),
				y = getRandom();
			while( arr[x][y] != 0 ){
				x = getRandom();
				y = getRandom();
			}
			arr[x][y] = 2;
			//渲染矩阵
			for( var i = 0 ; i < 4 ; i++ ){
				for( var j = 0 ; j < 4 ; j++ ){
					var temp = arr[i][j];
					if( temp != 0 ){
						this.createNumber(i,j,temp);
					}
				}
			}
		}
		
		//清空dom节点
		this.flush = function(){
			var container = document.getElementById("numbers");
			container.innerHTML = "";
		}
		
		this.array = arr;
		this.score = score;
		this.best = best;
		
		
	}
	
	w.Gamer = Gamer;
	
})(window);
