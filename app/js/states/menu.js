var menu = function(game) {};

menu.prototype = {
  create: function() {

    //Text style
    var textStyle = {
      font: "bold 100px 04b03",
      fill: "#000"
    };

    this.audio = game.add.audio('menutrack');
    if (Settings.audio.music) {
      this.audio.loopFull();
    }


    var name_text = game.add.text(this.game.world.centerX, 0, "ISOMETRIS", textStyle);
    name_text.anchor.x = 0.5;

    this.playButtonClick = function() {
      this.audio.stop();
      game.state.start("Play");
    };

    this.SettingsButtonClick = function() {
      this.audio.stop();
      game.state.start("Settings");
    };

    this.AboutButtonClick = function() {
      this.audio.stop();
      game.state.start("About");
    };

    var buttons = this.game.add.group();
    this.buttons = buttons;


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

    buttons.add(this.game.add.button(0, 0, "sheet", this.playButtonClick, this, "Play_button", "Play_button", "Play_button"));
    buttons.add(this.game.add.button(0, 32, "sheet", this.SettingsButtonClick, this, "Settings_button", "Settings_button", "Settings_button"));
    buttons.add(this.game.add.button(0, 64, "sheet", this.AboutButtonClick, this, "About_button", "About_button", "About_button"));
    buttons.scale.x = 5;
    buttons.scale.y = 5;
    buttons.position.x = this.game.world.centerX - buttons.width / (2 * buttons.scale.x);
    buttons.position.y = this.game.world.centerY - buttons.height / (2 * buttons.scale.y);
    //this.game.state.start("Play");
  },
  update: function() {

  }
};
