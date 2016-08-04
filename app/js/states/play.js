var play = function(game) {};

play.prototype = {
  create: function() {
    game.time.advancedTiming = true;

    var world = new World();
    console.log(world);

    var blockWidth = 42;
    var blockHeight = 42;
    var blocks = this.game.add.group();
    blocks.scale.x = 1;
    blocks.scale.y = 1;



    var tmpWidth = (blockWidth - 2) / 2;
    var tmpHeight = (blockHeight / 2 - 1) / 2;
    var tmpZ = (blockHeight / 2);
    for (var z = 0; z < world.height; z++) {
      var fastZ = tmpZ * z;
      for (var y = 0; y < world.width; y++) {
        var tmpHeightY = y * tmpHeight;
        var tmpWidthY = y * tmpWidth;
        for (var x = 1 - 1; x >= 0; x--) {
          var xx = Math.floor((x * tmpWidth) + tmpWidthY);
          var yy = Math.floor(tmpHeightY - (x * tmpHeight)) - fastZ;
          blocks.create(xx, yy + 400, "sheet", "J-Block");
        }
      }
    }

  },
  update: function() {

  },
  render: function() {
    game.debug.text(game.time.fps, 2, 14, "#00ff00");
  }
};
