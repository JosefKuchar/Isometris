var end = function(game) {};

end.prototype = {
  init: function(score) {
    this.score = score
  },
  create: function() {
    Settings.end = false;

    //Text style
    var textStyle = {
      font: "bold 150px 04b03",
      fill: "#000"
    };

    var end_text = game.add.text(this.game.world.centerX, 0, "THE END", textStyle);
    end_text.anchor.x = 0.5;

    //Text style
    var scoreStyle = {
      font: "bold 70px 04b03",
      fill: "#000"
    };

    var score_text = game.add.text(this.game.world.centerX, 200, "Your score: " + this.score, scoreStyle);
    score_text.anchor.x = 0.5;

    this.backButtonClick = function() {
      game.state.start("Menu");
    };

    var back = this.game.add.button(this.game.world.centerX, 400, "sheet", this.backButtonClick, this, "Start", "Start", "Start");
    back.anchor.setTo(0.5, 0.5);
    back.scale.x = 9;
    back.scale.y = 9;

    this.toggleFullscreen = function() {
      if (game.scale.isFullScreen) {
        game.scale.stopFullScreen();
      } else {
        game.scale.startFullScreen(false);
      }
    }
    var fullscreen = this.game.add.button(50, this.game.world.height - 50, "sheet", this.toggleFullscreen, this, "Fullscreen_button", "Fullscreen_button", "Fullscreen_button");
    fullscreen.scale.x = 6;
    fullscreen.scale.y = 6;
    fullscreen.anchor.y = 1;
  },
  update: function() {

  }
};
