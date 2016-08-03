//Init Phaser framework
var game = new Phaser.Game(1280, 720, Phaser.AUTO, "");

//Add game states to the game
game.state.add("Boot", boot);

//Start game
game.state.start("Boot");