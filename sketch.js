var player, playerImg;
var enemy1, enemy2, enemy1Img, enemy2Img;
var bullet, bulletImg;
var enemyGroup,  bulletGroup;

var score = 0;
var lives = 3; 
var life1, life2, life3;
var gameOverImg, gameOver;
var bulletSound, lifeSound, gameOverSound;

var gameState = "play";
var timer = 0; 

function preload(){
    playerImg = loadImage("galagaShip.png");
    enemy1Img = loadImage("enemy1.png");
    enemy2Img = loadImage("enemy2.png");
    bulletImg = loadImage("bullet.png");
    gameOverImg = loadImage("gameOver.png");

    bulletSound = loadSound("1.mp3");
    lifeSound = loadSound("2.mp3");
    gameOverSound = loadSound("6.mp3");

}

function setup(){
    createCanvas(1440, 830);

    player = createSprite(720, 750, 30, 30);
    player.addImage("player", playerImg);
    player.scale = 0.1;

    enemyGroup = new Group();
    bulletGroup = new Group();

    life1 = createSprite(1300, 100, 30, 30);
    life1.addImage("player", playerImg);
    life1.scale = 0.1;

    life2 = createSprite(1345, 100, 30, 30);
    life2.addImage("player", playerImg);
    life2.scale = 0.1;

    life3 = createSprite(1390, 100, 30, 30);
    life3.addImage("player", playerImg);
    life3.scale = 0.1;

    gameOver = createSprite(720, 415, 1440, 830);
    gameOver.addImage("gameOver", gameOverImg);
    gameOver.visible = false;

}

function draw(){
    background("black");

    if(gameState==="play"){
        
        if(keyDown(LEFT_ARROW)){
            player.velocityX=-10;
            //bullet.velocityX = -10;
        } 
        if(keyDown(RIGHT_ARROW)){
            player.velocityX=10;
            //bullet.velocityX = 10;
        }
    
        if(player.x<0){
            player.x = 1435;
            //bullet.x = 1435;
        }
        if(player.x>1440){
            player.x = 5;
            bullet.x = 5;
        }
        console.log(player.x);

        if(keyDown("space")){
        fireBullet();
        }
    
        for(var  i = 0; i<enemyGroup.length; i++){
            if(bulletGroup.isTouching(enemyGroup.get(i))){
                enemyGroup.get(i).destroy();
                score  = score + 10;
            }
        }
        
    
        for(var i = 0; i<enemyGroup.length; i++){
            if(player.isTouching(enemyGroup.get(i))){
                enemyGroup.get(i).destroy();
                lifeSound.play();
                lives = lifeCount(lives);
                if(lives === 0){
                    gameState = "end";
                }
            }
        }
        
    
        spawnEnemy();
    
            fill("white");
            textSize(30);
            text("Score: "  + score, 700, 100);
    
            fill("red");
            text("lives: " + lives, 1050, 100);
    
    } 
    if(gameState==="end"){
        enemyGroup.destroyEach();
                bulletGroup.destroyEach();
                player.destroy();
                gameOver.visible = true;
                gameOverSound.play();
                setTimeout(function(){gameOverSound.stop();}, 10);
    }
    
    //if(keyDown(LEFT_ARROW)){
    //    gameOverSound.play();
    //}
    
    drawSprites();
}

function fireBullet(){
    bullet = createSprite(player.x, player.y - 30, 30, 30);
    bullet.addImage("bullet", bulletImg);
    bullet.scale = 0.07;
    bullet.velocityY = -10;
    bulletGroup.add(bullet);
    bulletSound.play();
}

function spawnEnemy(){
    //console.log(frameCount);
    if(frameCount % 10 === 0){

    var rand = Math.round (random(1,2));
    var randX = Math.round(random(50, 1400));
    var randVx = Math.round(random(-15, 10));
    var randVy = Math.round(random(6,10));

    console.log(rand);
    if(rand ===1){
        enemy1 = createSprite(randX, 200, 30, 30);
        enemy1.addImage("enemy1", enemy1Img);
        enemy1.scale = 0.1;
        enemy1.velocityY= randVy;
        enemy1.velocityX = randVx;
        enemy1.lifetime = 100;
        enemyGroup.add(enemy1);
    } else if(rand ===2){
        enemy2 = createSprite(randX, 200, 30, 30);
        enemy2.addImage("enemy2", enemy2Img);
        enemy2.scale = 0.07;
        enemy2.velocityY=randVy;
        enemy2.velocityX =randVx;
        enemy2.lifetime = 100;
        enemyGroup.add(enemy2);
    }
        
    }
    
}

function lifeCount(lives){
    switch(lives){
        case 3: lives = lives - 1;
                life1.visible = false; 
                break;
        case 2: lives = lives - 1;
                life2.visible = false;
                break;
        case 1: lives = lives - 1;
                life3.visible = false;
                break;
        default: break;
    }
        return lives;

}