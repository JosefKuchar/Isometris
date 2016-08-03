var boot = function(game) {
  console.log("Game booting");
}

boot.prototype = {
  init: function() {
    //Set background-color of the game
    game.stage.backgroundColor = "#eee";

    //Set scale of game
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    //Set game align
    //this.scale.pageAlignVertically = true;
    this.scale.pageAlignHorizontally = true;
  },
  create: function() {
    //TODO: Load preload state
  }
}
