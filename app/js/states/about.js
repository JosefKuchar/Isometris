var about = function(game) {};

about.prototype = {
  create: function() {
    this.backButtonClick = function() {
      game.state.start("Menu");
    };


    var authorSprite = game.add.sprite(this.game.world.centerX, 50, "sheet", "Author");
    var back = this.game.add.button(50, 50, "sheet", this.backButtonClick, this, "Start", "Start", "Start");
    authorSprite.scale.x = 8;
    authorSprite.scale.y = 8;
    authorSprite.anchor.x = 0.5;
    authorSprite.anchor.y = 0;
    back.anchor.setTo(1, 1);
    back.scale.x = -7;
    back.scale.y = -7;

    var textStyle = {
      font: "bold 28px 04b03",
      fill: "#000"
    };

    var name_text = game.add.text(300, 500, "Game by Josef Kuchar, josefkuchar.cz\nSFX: bfxr.net\nMusic: youtube.com/watch?v=E8FQBjVlERk, youtube.com/watch?v=NmCCQxVBfyM\nGraphics: All sprites created with aseprite editor: aseprite.org\nFont: 04b03 by Yuji Oshimoto", textStyle);

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
