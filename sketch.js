
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

let engine;
let world;
var bk_img;
var blink;
var sad;
var eat;
var calabaza, zanahoria, piña;
var bunny;
var gameState = PLAY;
var PLAY = 1;
var END = 0;
var random = 0;

function preload(){
bk_img = loadImage ('jardín-fondo.jpg');

blink = loadAnimation('blink_1.png','blink_2.png','blink_3.png');
sad = loadAnimation('sad_1.png','sad_2.png','sad_3.png');
eat = loadAnimation('eat_0.png','eat_1.png','eat_2.png','eat_3.png','eat_4.png');

}

function setup() {
  createCanvas(450,500);

  engine = Engine.create();
  world = engine.world;
  
  bunny = createSprite(170,80,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');

}


function draw() 
{
  background(51);
  image(bk_img,0,0,450,500);
  
  bunny.x = World.mouseX;
  edges = createEdgeSprites();
  rabbit.collide(edges);
  
 var select_sprites = Math.round(1,3);
if(gameState === PLAY){
 if(collide(createCalabaza,bunny)==true)
  {
    bunny.changeAnimation('eating');
  }

  if(collide(createZanahoria,bunny)==true)
  {
    bunny.changeAnimation('eating');
  }
  if(collide(createPiña,bunny)==true)
  {
    bunny.changeAnimation('eating');
  }

  if(createCalabaza!=null && createCalabaza.position.y>=650)
  {
    bunny.changeAnimation('crying');
    createCalabaza = null;
   }

   if(createZanahoria!=null && createZanahoria.position.y>=650)
  {
    bunny.changeAnimation('crying');
    createZanahoria = null;
   }

   if(createPiña!=null && createPiña.position.y>=650)
   {
     bunny.changeAnimation('crying');
     createPiña = null;
    }

 if (frameCount / 80 == 0) {
  if (select_sprites == 1) {
    createZanahoria();
  } else if (select_sprites == 2) {
   createPiña();
  }else {
   createCalabaza();
 }
}
}  
if (gameState === END){
  createCalabaza.setlifetimeEach(-1);
  createPiña.setlifetimeEach(-1);
  createZanahoria.setlifetimeEach(-1);
  
  createCalabaza.setVelocityXEach(0);
  createPiña.setVelocityXEach(0);
  createZanahoria.setVelocityXEach(0);
}

  Engine.update(engine);
  drawSprites();
}

function createZanahoria(){
  zanahoria = createImg ('Zanahoria.PNG')
  zanahoria.position(random(50, 350),40, 10, 10);
  zanahoria.size(60,60);
  zanahoria.velocityY = 3;
  zanahoria.lifetime = 500; 
}

function createPiña(){
  piña = createImg('piña.PNG');
  piña.position(random(50, 350),40, 10, 10);
  piña.size(60,60);
  piña.velocityY = 3;
  piña.lifetime = 500; 
}

function createCalabaza(){
  calabaza = createImg('Calabaza.PNG',);
  calabaza.position(random(50, 350),40, 10, 10);
  calabaza.size(50,50);
  calabaza.velocityY = 3;
  calabaza.lifetime = 500; 
}

function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,createCalabaza||createPiña||createZanahoria);
               createCalabaza = null;
               createZanahoria = null;
               createPiña = null;
               return true; 
            }
            else{
              return false;
            }
         }
}