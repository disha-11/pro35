var dog,happyDog,database,foodstock;
var dogs;
var write;
var ref;
var read;
var food;
var x=20;
var feed,add,fedTime,lastFed 
var foodobj=null;
var addb,feedb;
var foods=5;

function preload()
{
dog=loadImage("images/Dog.png");
happyDog=loadImage("images/happydog.png");
}

function setup() {
  createCanvas(500, 500);

  dogs=createSprite(250,250,30,30);
  dogs.addImage("we",dog);
  dogs.scale=0.2;
  foodobj=new Food();
    database=firebase.database();
  ref=database.ref("virtual pet pro34/food").on("value",readstock);



addb=createButton("add food");
addb.position(200,30);
addb.mousePressed(addFoods);

feedb=createButton("feed dog");
feedb.position(200,200);
feedb.mousePressed(feedDog);
  
}


function draw() {  
background(46,139,87);




fill("white");
  textSize(10);
  if(lastFed>=12){
    text("Last Fed (approx timing) : "+ lastFed%12 + " PM", 300,30);
   }else if(lastFed==0){
     text("Last Fed (approx timing) : 12 AM",300,30);
   }else{
     text("Last Fed (approx timing) : "+ lastFed + " AM", 300,30);
   }

 drawSprites();



 strokeWeight(3);
  stroke("blue")
  fill("white");
  textSize(30);
  text("Milk bottles left in stock : " + foods, 30, 475);

  


foodobj.display();

}

function readstock(data){
foods=data.val();

}
function writeStock(x){
 
  if(x=0){
x=0;
  }
  else{
    x=x-1;
  }
  database.ref("virtual pet pro34/food").update({
    food:x
   })
}


function feedDog(){

  if(foods > 0){
    foods--;
    foodobj.updateFoodStock(foods);
    lastFed = hour();
    database.ref("virtual pet pro34/LastFed").update({
      LastFed:lastFed
     })
  }
}
  
function addFoods(){
  foods++;
  foodobj.updateFoodStock(foods);
  database.ref("virtual pet pro34/FoodStock").update({
  FoodStock:foods
   })}