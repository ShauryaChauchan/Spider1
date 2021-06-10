var web;
var PLAY = 1 ;
var END = 0;
var gameState= PLAY ;

var spider ,spider_running , spider_sooting;
var troops,troopsGroup;
var ground , invisibleGround, groundImage;
var obstaclesGroup, obstacle1, obstacle2;

var score=0;

var gameOver, restart;

function preload()
{
	spider_running=loadAnimation("pic1b.png","pos2.png","pos5.png");
	spider_sooting=loadAnimation("pic3.png");
	groundImage=loadImage("ground2.png");
	gameOverImg = loadImage("gameOver.png");
	restartImg = loadImage("restart.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");

}

function setup() {
	createCanvas(1000, 500);
	spider = createSprite(100,50,20,50);
	spider.addAnimation("running",spider_running );
	spider.addAnimation("collided", spider_sooting);
	spider.scale = 0.5;

	ground = createSprite(200,490,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,500,400,10);
  invisibleGround.visible = false;

  troopsGroup = new Group();

  obstaclesGroup = new Group();

  score = 0;



  
}


function draw() {
  background(225);
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    
  
    if(keyDown("space") && spider.y >= 159) {
      spider.velocityY = -14;
    }

	spider.velocityY = spider.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;


    }
  if(keyDown("W")) {
  Wweb();
  }
  if(keyDown("D")) {
    Wweb();
    web.velocityX=3;
    web.velocityY=0;

    }

	spider.collide(invisibleGround);
  shoot();
	//if(troopsGroup.isTouching(spider)){
	//	gameState = END;
//	}
}
else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    ground.velocityX = 0;
    spider.velocityY = 0;
    
    spider.changeAnimation("collided",spider_sooting);
    
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }

  drawSprites();
 
}



		function reset(){
			gameState = PLAY;
			ground.velocityX = -(6 + 3*score/100);
			gameOver.visible = false;
			restart.visible = false;
			
			troopsGroup.destroyEach();
			
			spider.changeAnimation("running",spider_running);
			
			score = 0;}

     
      function shoot() {
        if (frameCount % 60 === 0) {
          var troops = createSprite(600,120,40,10);
          troops.y = Math.round(random(80,120));
          troops.x = Math.round(random(100,900));

         // troops.addImage(cloudImage);
          troops.scale = 0.5;
          troops.velocityX = -3;
          troops.velocityY = 4;

          
           //assign lifetime to the variable
           troops.lifetime = 200;
          
          //adjust the depth
          troops.depth = spider.depth;
          spider.depth = spider.depth + 1;
          
          //add each cloud to the group
          troopsGroup.add(troops);
        }
      }




      function Wweb() {
        
         web = createSprite(600,120,40,10);
          web.y = spider.y;
          web.x = spider.x;

         // troops.addImage(cloudImage);
          web.scale = 0.5;
          web.velocityX =3;
          web.velocityY =-4;

          
           //assign lifetime to the variable
           web.lifetime = 200;
          
          //adjust the depth
          web.depth = spider.depth;
          spider.depth = spider.depth + 1;   
        }






