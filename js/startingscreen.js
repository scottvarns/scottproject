
// create a new scene
let startScreen = new Phaser.Scene('startScreen');

//initiate scene parameters
startScreen.init = function() {
    
};

//load background image
startScreen.preload = function() {
    this.load.image('background-image', 'assets/startingscreen.png');
    this.load.audio('gameSound','assets/WorldmapTheme.mp3');
}


//create function
startScreen.create = function(){
    music = this.sound.add('gameSound');
    music.loop = true;
    music.play();
    this.titlescreen = this.add.image(400, 300, 'background-image');
    this.titlescreen.setInteractive();
    this.titlescreen.on('pointerdown', () => { startScreen.start(); });

    var devText = this.add.text(160, 16, 'devstart', {Fontsize:'16px',Fill:'#000'});
    devText.setInteractive();
    devText.on('pointerdown', () => { this.devStart();});
}

startScreen.start = function(pointer, gameObject) {
    music.stop();
    this.scene.start('Game');
}

startScreen.devStart = function() {
    var level = prompt('Enter Level ID');
    this.scene.start(level);
};

// set the configuration of the game
let config = {
  //type: Phaser.AUTO, // Phaser will use WebGL if available, if not it will use Canvas
  //width: 1920,
  //height: 1080,

  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  pixelArt: true,
  scene: {
      preload: function(){},
      create: function(){},
      update: function(){},
  },

  physics:{
      default:`arcade`,
      arcade:{
          gravity:{ y: 500 },
          debug: false
      }
  },
  scene: [startScreen, gameScene1, gameScene2, gameScene3, gameScene4]  
};

// create a new game, pass the configuration
let game = new Phaser.Game(config);

