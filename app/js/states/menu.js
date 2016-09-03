var menu = function(game) {};

menu.prototype = {
  create: function() {

    this.playButtonClick = function() {
      game.state.start("Play");
    }

    this.SettingsButtonClick = function() {

    }

    this.AboutButtonClick = function() {

    }

    var buttons = this.game.add.group();
    this.buttons = buttons;

    buttons.add(this.game.add.button(0, 0, "sheet", this.playButtonClick, this, "Play_button", "Play_button", "Play_button"));
    buttons.add(this.game.add.button(0, 32, "sheet", this.SettingsButtonClick, this, "Settings_button", "Settings_button", "Settings_button"));
    buttons.add(this.game.add.button(0, 64, "sheet", this.AboutButtonClick, this, "About_button", "About_button", "About_button"));
    console.log(buttons.width);
    buttons.scale.x = 5;
    buttons.scale.y = 5;
    console.log(buttons.scale.x);
    buttons.position.x = this.game.world.centerX - buttons.width / (2 * buttons.scale.x);
    buttons.position.y = this.game.world.centerY - buttons.height / (2 * buttons.scale.y);
    //this.game.state.start("Play");
  },
  update: function() {

  }
};
