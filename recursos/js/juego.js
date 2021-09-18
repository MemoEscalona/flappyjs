
//Obtener el canvas
var canvas=document.getElementById("juego");
//obtener el contexto 2d del canvas
var contexto=canvas.getContext("2d");

//carga de imagenes
var flappy = new Image();
var fondo = new Image();
var fondoFrente = new Image();
var tuberiaSuperior = new Image();
var tuberiaInferior = new Image();

fondo.src="recursos/images/bg.png";
flappy.src="recursos/images/bird.png";
fondoFrente.src="recursos/images/fg.png";
tuberiaSuperior.src="recursos/images/pipeNorth.png";
tuberiaInferior.src="recursos/images/pipeSouth.png";

//carga de audio
var flySound=new Audio();
var scoreSound=new Audio();
var crashSound=new Audio();

flySound.src="recursos/sounds/fly.mp3";
scoreSound.src="recursos/sounds/score.mp3";
crashSound.src="recursos/sounds/crash-sound.mp3";

//variables
var gap=85;
var sepacion=(tuberiaSuperior.height==0?242:tuberiaSuperior.height)+gap;
var posFlapX=10;
var posFlapY=150;
var score=0;

//constantes
var gravity=1.4;
var movimientoFlappy=40;

//listener
document.addEventListener("keydown",moverArriba);

//moverArriba
function moverArriba() {
	posFlapY-=movimientoFlappy;
	flySound.play();
}
//tuberias
var tuberia=[];
tuberia[0]={
	x:canvas.width,
	y:0
};

//
function draw() {
	
	contexto.drawImage(fondo,0,0);
	// dibujo de tuberia
	for (var i = 0; i < tuberia.length; i++) {
		contexto.drawImage(tuberiaSuperior,tuberia[i].x,tuberia[i].y);
		contexto.drawImage(tuberiaInferior,tuberia[i].x,tuberia[i].y+sepacion);
		tuberia[i].x--;
		if(tuberia[i].x==125){
			tuberia.push({
				x:canvas.width,
				y:Math.floor(Math.random()*tuberiaSuperior.height)-tuberiaSuperior.height
			});
		}

		//Deteccion de colisiones
		if( 
			posFlapX + flappy.width >= tuberia[i].x &&
			posFlapX <= tuberia[i].x + tuberiaSuperior.width &&
			(
				posFlapY <= tuberia[i].y+tuberiaSuperior.height || 
				posFlapY+flappy.height >= tuberia[i].y+sepacion 
			) ||
			posFlapY + flappy.height>= canvas.height - fondoFrente.height

		){
			//crashSound.play();
			setTimeout(() => {location.reload()}, 250); 
		}

		if(tuberia[i].x==5){
			score++;
			scoreSound.play();
		}
	}	
	

	contexto.drawImage(fondoFrente,0,canvas.height-fondoFrente.height);
	contexto.drawImage(flappy,posFlapX,posFlapY);
	posFlapY+=gravity;
	contexto.fillStyle="#000";
	contexto.font="20px Verdana";
	contexto.fillText("Score: "+score,10,canvas.height-20);
	requestAnimationFrame(draw);
}
draw();