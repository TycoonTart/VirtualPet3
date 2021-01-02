//Create variables here
var dog,happyDog,database,foodS,
dogImg,happyDogImg
var fedTime,lastFed,foodObj
var bedroom,garden,washroom
var gameState,readState,changeState
var lazy
function preload()
{
  //load images here
  dogImg=loadImage("dogImg.png")
  happyDogImg=loadImage("dogImg1.png")
  bedroom=loadImage("Bed Room.png")
  garden=loadImage("Garden.png")
  washroom=loadImage("Wash Room.png")
  lazy=loadImage("Lazy.png")
  
}
  
function setup() {
  createCanvas(800, 800);
  database=firebase.database()
  console.log(database)
  /*foodObj=new Food()
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(150,50,20,20)
  dog.addImage(dogImg)
  dog.scale=0.1
  
 
  feed=createButton("Feed The Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
 
  readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  });*/
  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  feedTime=database.ref('lastFed');
  feedTime.on("value",function(data){
    lastFed=data.val();
  });

  //read game state from database
  readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  });
   
  dog=createSprite(200,400,150,150);
  dog.addImage(lazy);
  dog.scale=0.15;
  
  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}


function draw() {  
  background(46,139,87)
  /*foodObj.display();
  fill(255,255,254)
  textSize(15)
  if(lastFed>=12){
    text("Last Feed: "+lastFed%12+" PM",350,30)
  }else if(lastFed==0){
    text("Last Feed : 12AM",350,30)
  }else{
    text("Last Feed : "+lastFed+" AM",350,30);
  }

  fedTime=database.ref('lastFed');                
  fedTime.on("value",function(data){
    lastFed=data.val();
  })
  if(gameState!=="Hungry"){
    addFood.hide()
    feed.hide()
    dog.remove()
  }
  else{
    feed.show()
    addFood.show()
    dog.addImage(lazy)
  }
  currentTime=hour();
  if(currentTime==(lastFed+1)){
    update("Playing");
    foodObj.garden1();
    console.log("hi")
  }
  else if(currentTime==(lastFed+2)){
    update("Sleeping")
    foodObj.bedroom()
  }
  else if(currentTime>(lastFed+2)&& currentTime<=(lastFed+4)){
    update("Bathing")
    foodObj.washroom()
    
  }
  else {
    
    update("Hungry")
    foodObj.display()
   
   }*/
   currentTime=hour();
  if(currentTime==(lastFed+1)){
    update("Playing");
    foodObj.garden();
 }else if(currentTime==(lastFed+2)){
  update("Sleeping");
    foodObj.bedroom();
 }else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
  update("Bathing");
    foodObj.washroom();
 }else{
  update("Hungry")
  foodObj.display();
 }
 
 if(gameState!="Hungry"){
   feed.hide();
   addFood.hide();
   dog.remove();
 }else{
  feed.show();
  addFood.show();
  dog.addImage(lazy);
 }
drawSprites()
}
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}
function feedDog(){
  dog.addImage(happyDogImg)

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    lastFed:hour()
  })
  }
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })

  
}
function update(state){
  database.ref("/").update({
    gameState:state
  })
}






