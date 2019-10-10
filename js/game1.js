// create a new scene


let gameScene1 = new Phaser.Scene('Game');

var globalScore = 0;
// initiate scene parameters
gameScene1.init = function() {
  
};

// load assets
gameScene1.preload = function(){
    this.load.image(`sky`,`assets/sky.png`);
    this.load.image(`ground`,`assets/platform.png`);
    this.load.image(`bomb`,`assets/bomb.png`);
    this.load.image(`star`,`assets/star.png`);
    this.load.image('factoryback','assets/factoryback.png');
    this.load.image('concrete','assets/concrete.png');
    this.load.image('metalplatform','assets/metalplatform.png');
    this.load.image('metaltiles','assets/metaltiles.png');
    this.load.image('grass','assets/grass3.png');
    this.load.audio('gameSound','assets/WorldmapTheme.mp3');
    this.load.spritesheet(`dude`,`assets/dude.png`,{ frameWidth: 32, frameHeight: 48});
  
};

// called once after the preload ends
gameScene1.create = function() {
    this.add.image(400, 300, `sky`);
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400, 568, `ground`).setScale(2).refreshBody();
    this.platforms.create(600, 400, `ground`);
    this.platforms.create(50, 250, `ground`);
    this.platforms.create(750, 220, `ground`);

    music = this.sound.add('gameSound');
    music.loop = true;
    music.play();
    
    this.player = this.physics.add.sprite(100, 450, `dude`);
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    
    this.physics.add.collider(this.player, this.platforms);
    
    this.anims.create({
        key: `left`,
        frames: this.anims.generateFrameNumbers(`dude`, { start: 0, end: 3}),
        frameRate: 10,
        repeat: -1
    });
    
    this.anims.create({
        key: `turn`,
        frames: [ {key: `dude`, frame:4} ],
        frameRate: 20
    });
    
    this.anims.create({
        key: `right`,
        frames: this.anims.generateFrameNumbers(`dude`, { start: 5, end: 8}),
        frameRate: 10,
        repeat: -1
    });
    
    this.stars = this.physics.add.group({
        key:`star`,
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });
    
    this.stars.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });
    
    this.physics.add.collider(this.stars, this.platforms);
    
    this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
    globalScore=0;
    
     this.scoreText=this.add.text(16, 16, 'score= 0', {Fontsize:'32px',Fill:'#000'});
     this.levelText=this.add.text(16, 70, 'level= 1', {Fontsize:'32px',Fill:'#000'});


  
};

// this is called up to 60 times per second
gameScene1.update = function(){
    cursors = this.input.keyboard.createCursorKeys();
    if (cursors.left.isDown)
    {
        this.player.setVelocityX(-160);
        this.player.anims.play(`left`, true);
    }
    else if (cursors.right.isDown)
    {
        this.player.setVelocityX(160);
        this.player.anims.play(`right`, true);
    }
    else
    {
        this.player.setVelocityX(0);
        this.player.anims.play(`turn`);
    }
    
    if (cursors.up.isDown && this.player.body.touching.down)
    {
        this.player.setVelocityY(-330);
    }
    
    if (globalScore==120){
        console.log("Level complete");
        music.stop();
        this.scene.start('Game2');
    }
    

};

gameScene1.collectStar=function(player,star){
        star.disableBody(true, true);
    globalScore +=10;
    this.scoreText.setText("Score:" + globalScore);
};

