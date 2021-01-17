var runningmonkey,monkey,ground;
var banana ,bananaimg, stone, stoneimg;
var foodg, obstacleg;
var score,rand,survivaltime;
var database =firebase.database();

function preload(){
  
  
  runningmonkey =loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaimg = loadImage("banana.png");
  stoneimg = loadImage("obstacle.png");
}

function setup() {
  createCanvas(600,400);
  ground = createSprite(300,372,1000,20);
  ground.velocityX=-6;
  monkey = createSprite(30,320);
  monkey.addAnimation("running",runningmonkey);
  monkey.scale=0.10;
  obstacleg = new Group();
  foodg = new Group();
  score = 0;
}

function draw() {
  background("white");
  
  if(keyDown("space") && monkey.y === 331.3){
    monkey.velocityY=-17;
  }
  
  monkey.velocityY=monkey.velocityY+0.8;
  
  survivaltime = Math.round(frameCount/frameRate());
  if(monkey.isTouching(foodg)){
    score = score+1;
    foodg.destroyEach();
  }
  
  if(ground.x<100){
     ground.x=ground.width/2;
  }
  monkey.collide(ground);
  Obstacles();
  Bananas();
  rand = Math.round(random(247,331));
  fill("black");
  textSize(20);
  text("Score: "+score,450,50);
  text("Survival time: "+survivaltime,100,50);
  drawSprites();
}

function Obstacles(){
  if(frameCount % 300 === 0){
    stone = createSprite(620,330,100,30);
    stone.addImage(stoneimg);
    stone.scale=0.2;
    stone.lifetime=620;
    stone.velocityX=-6;
    obstacleg.add(stone);
  }
}

function Bananas(){
  if(frameCount % 80 === 0){
    banana = createSprite(620,rand,30,30)
    banana.addImage(bananaimg);
    banana.scale=0.1;
    banana.lifetime=620;
    banana.velocityX=-6;
    foodg.add(banana);
  }
}