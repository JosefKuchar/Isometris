var settings = function(game) {};

settings.prototype = {
  create: function() {
    this.backButtonClick = function() {
      game.state.start("Menu");
    };

    this.SFXButtonClick = function() {
      Settings.audio.sfx = !Settings.audio.sfx;
      var number = Settings.audio.sfx ? 1 : 0;
      sfx._onOutFrame = "SFX_button" + number;
      sfx._onOverFrame = "SFX_button" + number;
      sfx._onDownFrame = "SFX_button" + number;
    };

    this.MusicButtonClick = function() {
      Settings.audio.music = !Settings.audio.music;
      var number = Settings.audio.music ? 1 : 0;
      music._onOutFrame = "Music_button" + number;
      music._onOverFrame = "Music_button" + number;
      music._onDownFrame = "Music_button" + number;
    };

    var textStyle = {
      font: "bold 65px 04b03",
      fill: "#000"
    };

    var name_text = game.add.text(this.game.world.centerX, 0, "Settings", textStyle);
    name_text.anchor.x = 0.5;

    this.backButtonClick = function() {
      game.state.start("Menu");
    };

    var back = this.game.add.button(50, 50, "sheet", this.backButtonClick, this, "Start", "Start", "Start");
    back.anchor.setTo(1, 1);
    back.scale.x = -7;
    back.scale.y = -7;

    var sfx_state = Settings.audio.sfx ? 1 : 0;
    console.log(sfx_state);
    var sfx = this.game.add.button(this.game.world.centerX, 50, "sheet", this.SFXButtonClick, this, "SFX_button" + sfx_state, "SFX_button" + sfx_state, "SFX_button" + sfx_state);
    sfx.scale.x = 9;
    sfx.scale.y = 9;
    sfx.anchor.x = 0.5;
    sfx.position.y = 200;

    var music_state = Settings.audio.music ? 1 : 0;
    var music = this.game.add.button(this.game.world.centerX, 50, "sheet", this.MusicButtonClick, this, "Music_button" + music_state, "Music_button" + music_state, "Music_button" + music_state);
    music.scale.x = 9;
    music.scale.y = 9;
    music.anchor.x = 0.5;
    music.position.y = 300;

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
