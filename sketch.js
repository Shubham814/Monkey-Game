var PLAY = 1;
var END = 0;
var gameState=PLAY;

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var eatingScore;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkey_collided = loadAnimation("sprite_0.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,500);
  
  //creating ground
  ground = createSprite(300,490,600,20)
  ground.x = ground.width /2;
  
  monkey = createSprite(60,436,25,50);
  monkey.addAnimation("running",monkey_running)
  monkey.scale=0.15;
  
  //make groups
  stonesGroup = createGroup();
  fruitsGroup = createGroup();
  
  //make collider
  //monkey.debug=true;
  
  score = 0;
  eatingScore = 0;
}


function draw() {
  background(250);
 
  textSize(20);
  text ("Survival Time: "+score,400,50)
  text ("Score: "+eatingScore,200,50)
  
  console.log(score)
  
 if (gameState===PLAY){
  
  //moving ground
  ground.velocityX=-2;
  
  //reseting ground
  if (ground.x>20){
      ground.x = ground.width /2;
      }
   
   //making score increase
   score=Math.ceil(frameCount/frameRate())
   
   if (fruitsGroup.isTouching(monkey)){
     eatingScore=eatingScore+1;
      fruitsGroup.destroyEach(); 
       }
   
  //making fruit at every 80 frames
   if (frameCount%200===0){
      spawnFruits(); 
  
   }
   //making stones at every 200 frames
   if (frameCount%300===0){
     spawnStones();
   }
   
   //jump monkey
    if(keyDown("space")&& monkey.y >= 410) {
        monkey.velocityY = -22;
        
    }
   
   //add gravity
   monkey.velocityY = monkey.velocityY + 0.8
   
   //make game Sate end
   if (stonesGroup.isTouching(monkey)){
      gameState = END;
   }
   
 } else if (gameState===END){
   ground.velocityX=0;
   stonesGroup.setVelocityXEach(0);
   fruitsGroup.setVelocityXEach(0);
   
   stonesGroup.setLifetimeEach(-1);
   fruitsGroup.setLifetimeEach(-1);
   
   monkey.changeAnimation("running",monkey_collided)
   
   
   
 }
   
 monkey.collide(ground);
  
 drawSprites(); 
}

function spawnFruits(){
  fruit = createSprite (600,Math.round(random(120,200)),20,20);
  fruit.addAnimation("floating",bananaImage)
  fruit.scale=0.15;
  fruit.velocityX=-3;
  
  fruit.lifetime=250;
  
  fruitsGroup.add(fruit)
  
  fruit.depth = monkey.depth;
  monkey.depth = monkey.depth+1;
  
}

function spawnStones(){
  stone = createSprite(600,450,20,20)
  stone.velocityX=-5;
  stone.addAnimation("walking",obstaceImage)
  stone.scale=0.15;
  //stone.debug=true;
  
  stone.lifetime=150;
  
  stonesGroup.add(stone)
  
}






