var dog, database, foodS, foodStock;

function preload()
{
  dogImg = loadImage("images/dogImg.png");
  dogHappy= loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();

	createCanvas(500,500);
  dog = createSprite(350,300,50,50);
  dog.addImage(dogImg);
  dog.scale = 0.2;



  foodStock = database.ref('Food');
  foodStock.on("value",readStock,writeStock);

}


function draw() {  
  background(46,139,87);
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogHappy);
    
    stroke("black");
    textSize(35);
    fill("white");
    text("food remaining: "+foodS, width-100,50);
    textSize(13);
    text("press up arrow key to feed russell milk",130,10);
  
}




  drawSprites();
}

function readStock(data){
  foodS=data.val();

}
function writeStock(x){

  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}
  
  

  