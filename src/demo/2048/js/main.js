var gamer = new Gamer(),
	restart = document.getElementById("restart");

gamer.init();

restart.onclick =()=>{
	gamer.flush();
	gamer.init();
}
