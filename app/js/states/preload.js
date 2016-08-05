var preload = function(game) {};

preload.prototype = {
  preload: function() {
    //Only set this to false, if you are developer
    this.SPLASHSCREEN_LONG = false;

    //Show Geekwork 2016 splashScreen
    var splashScreen = this.add.sprite(this.game.world.centerX, 0, "geekwork-splash");
    splashScreen.anchor.x = 0.5;

    //Get time after showing splash screen
    this.startingTime = this.time.now;

    //Load images from texture atlas
    game.load.atlas("sheet", "assets/img/sheet.png", "assets/img/sheet.json");

    //Load bricks from json file
    game.load.json("bricks", "assets/data/bricks.json");
  },
  update: function() {
    if (this.time.now - this.startingTime >= 4000 || !this.SPLASHSCREEN_LONG) {
      //Start game
      this.game.state.start("Play");
    }
  }
};
