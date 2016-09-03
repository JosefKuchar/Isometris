//Init Phaser framework
//var game = new Phaser.Game(1280, 720, Phaser.AUTO, "", null, false, false);
var game = new Phaser.Game(1920, 1080, Phaser.AUTO, "", null, false, false);
//Add game states to the game
game.state.add("Boot", boot);
game.state.add("Preload", preload);
game.state.add("Play", play);
game.state.add("Menu", menu);

//Start game
game.state.start("Boot");
