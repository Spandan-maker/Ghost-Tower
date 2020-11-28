var ghost, ghostImage1, ghostImage2;

var tower, towerImage;

var door, doorImage;
var invisibleGround;
var climber, climberImage;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var doorGroup;
var climberGroup;
var invisibleGroundGroup;

var spookySound;

function preload(){
  
  ghostImage1 = loadImage("ghost-jumping.png");
  ghostImage2 = loadImage("ghost-standing.png");
  
  towerImage = loadImage("tower.png");
  
  doorImage = loadImage("door.png");
  
  climberImage = loadImage("climber.png");
  
  spookySound = loadSound("spooky.wav");
}


function setup(){
  createCanvas(600,600); 
  
  spookySound.loop();
  
  tower = createSprite(300,200,20,20);
  tower.addImage("tower", towerImage);
  
  
  ghost = createSprite(300,200,20,20);
  ghost.addImage("jumping", ghostImage2);
  ghost.scale = 0.3;
  
  doorGroup = new Group();
  climberGroup = new Group();
  invisibleGroundGroup = new Group();
  
}


function draw(){
  
  background("black");
  
  ghost.collide(climberGroup);
  
  if (gameState === PLAY){
    
    
    if (keyDown("space")){
      ghost.velocityY = -10;
      ghost.addImage("jumping", ghostImage1);
  }
  
    ghost.velocityY = ghost.velocityY + 0.8;
    
    
     if (tower.y > 400){
      tower.y = tower.width/2;
    }
  
     tower.velocityY = 3;
     
     if (keyDown("left_arrow")){
       ghost.x = ghost.x - 3;
     }
     
     if (keyDown("right_arrow")){
       ghost.x = ghost.x + 3;
     }
     
     if(invisibleGroundGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gameState = END;
    }
    
     spawndoors();
    
    
  }else if(gameState === END){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over :<", 230,250)
  }
  
  drawSprites();
}

function spawndoors(){
  
  if (frameCount % 240 === 0){
    door = createSprite(300,100,20,20);
    door.addImage("door", doorImage);
    
    invisibleGround = createSprite(300,160,50,10);
    invisibleGround.visible = false;
     
    climber = createSprite(200,153,20,20);
    climber.addImage("climber", climberImage);
    climber.scale = 0.8
    
    door.x = Math.round(random(140,400)) 
    
    climber.x = door.x;
    invisibleGround.x = door.x;
    
    door.velocityY = 2;
    climber.velocityY = 2;
    invisibleGround.velocityY = 2;
    
    ghost.depth = door.depth;
    ghost.depth = ghost.depth+1;
    
    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleGround.lifetime = 800;

    console.log(door.x);
    
    doorGroup.add(door);
    climberGroup.add(climber);
    
    invisibleGroundGroup.add(invisibleGround);
  }
}