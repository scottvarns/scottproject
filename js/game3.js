// create a new scene
let gameScene3 = new Phaser.Scene('Game3');

// initiate scene parameters
gameScene3.init = function() {
    this.gameOver = false;
};

// load assets
gameScene3.preload = function(){
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
gameScene3.create = function() {
    gameScene3.add.image(400, 300, `factoryback`);
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400, 568, `metalplatform`).setScale(2).refreshBody();
    this.platforms.create(0, 568, 'metalplatform').setScale(2).refreshBody();
    this.platforms.create(700, 568, 'metalplatform').setScale(2).refreshBody();
    this.platforms.create(200, 350, 'metalplatform');
    this.platforms.create(400, 250, `metalplatform`);
    this.platforms.create(70, 100, `metalplatform`);
    this.platforms.create(750, 400, `metalplatform`);
    this.platforms.create(650, 150, 'metalplatform');

    music = this.sound.add('gameSound');
    music.loop = true;
    music.play();
    
    this.player = this.physics.add.sprite(100, 450, `dude`);
    this.player.tint = 0x8f5606;
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

    this.bombs = this.physics.add.group({
        key: `bomb`,
        repeat: 5,
        setXY: { x: 12, y: 0, stepX: 200 },
    }); 
    
    this.stars.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    this.bombs.children.iterate(function (child) {
        child.setBounce(Phaser.Math.FloatBetween(0.6, 1));
        child.setVelocity(Phaser.Math.FloatBetween(100, 150));
        child.setCollideWorldBounds(true);
    });




    
    this.physics.add.collider(this.stars, this.platforms);
    this.physics.add.collider(this.bombs, this.platforms);
    
    this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);

    this.physics.add.overlap(this.player, this.bombs, this.hitBomb, null, this);
    
    this.scoreText=this.add.text(16, 16, 'score= 240', {Fontsize:'32px',Fill:'#000'});
    this.levelText=this.add.text(16, 70, 'level= 3', {Fontsize:'32px',Fill:'#000'});
    this.endText=this.add.text(400, 300, '', { fontSize: '64px', Fill: '#000' });
    this.endText.setOrigin(0.5);


  
};

// this is called up to 60 times per second
gameScene3.update = function(){
    if(this.gameOver) { 
        return;
    }
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
        this.player.setVelocityY(-430);
    }
    
    if (globalScore==360){
        console.log("Level complete");
        music.stop();
        this.scene.start('Game4');
        //this.endText.setText("Congratulations!");
        
        
    }
    

};


gameScene3.collectStar=function(player,star){
        star.disableBody(true, true);
    globalScore +=10;
    this.scoreText.setText("Score:" + globalScore);

};


gameScene3.hitBomb=function(player,bomb){
        this.gameOver = true;
        bomb.disableBody(true, true);
        console.log('bomb hit')
        globalScore = 0;
        this.scene.start('startScreen');

};






