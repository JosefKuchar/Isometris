var boot = function(game) {}

boot.prototype = {
  init: function() {
    //Set background-color of the game
    this.game.stage.backgroundColor = "#eee";

    //Set scale of game
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    //Set game align
    //this.scale.pageAlignVertically = true;
    this.scale.pageAlignHorizontally = true;
  },
  preload: function() {
    game.load.image('geekwork-splash', 'assets/img/geekwork-splash.png');
  },
  create: function() {
    this.game.state.start("Preload");
  }
}
