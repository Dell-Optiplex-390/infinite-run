
var gameState = "play"

function preload(){
  dogAnimation = loadAnimation("asset/1.png", "asset/2.png", "asset/3.png", "asset/4.png");
  bgImage = loadImage("asset/background.png");
  coinsImage = loadImage("asset/coinz.png");
  sticksImage = loadImage("asset/sticks.png");
  hurdleImage = loadImage("asset/hurdle.png");
}

function setup() {
 createCanvas(700, 500);
 bg = createSprite(350, 250, 700, 500);
 bg.addImage(bgImage);
 bg.scale = 3
 bg.velocityX = -1
 dog = createSprite(70, 350, 40, 30);
 dog.addAnimation("movingDog", dogAnimation)
 invisibleGround = createSprite(350, 480, 700, 5)
 invisibleGround.visible = false;
 coinsGroup = createGroup()
 obstaclesGroup = createGroup()
 score = 0;
 dog.debug = true
 dog.setCollider("rectangle", 0, 10, 40, 40)
}

function draw() {
 background("Gray");
 if(gameState === "play"){

 if(bg.x < 100){
  bg.x = bg.width/2
 }
 drawSprites();
 CreateObstacle()
 CreateCoins()
 if(keyDown("space") && dog.y > 410){
  dog.velocityY = -15
 }
 dog.velocityY += 1
 
 console.log(dog.y)
dog.collide(invisibleGround);
textSize(20)
//fill("")
  text("Score: " + score, 600, 100)
 if(dog.isTouching(coinsGroup)){
   score += 1;
   coinsGroup.destroyEach();
 }
 }
 if(dog.isTouching(obstaclesGroup)){
   gameState = "End"
 }
 if(gameState === "End"){
   textSize(40)
   fill("white")
   text("Game over! m", 250, 250)
 }
}

function CreateCoins(){
  if(frameCount % 150 === 0){
    coins = createSprite(700, 400);
    coins.velocityX = -8;
    coins.lifetime = 700 / 8
    coins.addImage(coinsImage);
    coins.scale = 0.1 
    coinsGroup.add(coins)
  }
} 


function CreateObstacle(){
  if(frameCount % 100 === 0){
    hurdle = createSprite(700, 450);
    rand = Math.round(random(1, 2))
    switch(rand){
      case 1: hurdle.addImage(hurdleImage);
      break;
      case 2: hurdle.addImage(sticksImage);
      break;
      default: break;
    }
    hurdle.velocityX = -5;
    hurdle.lifetime = 700 / 5
    hurdle.scale = 0.1 
    obstaclesGroup.add(hurdle)
  }
} 