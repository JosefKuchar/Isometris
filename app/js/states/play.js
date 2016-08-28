var play = function(game) {};

play.prototype = {
  create: function() {
    game.time.advancedTiming = true;

    //Create new world instance
    var world = new World();

    //Set world to play to be accessible in this state
    this.world = world;

    //Create new world instance
    this.brickgen = new BrickGenerator();

    //Block size in pixels
    var blockWidth = 42;
    var blockHeight = 42;

    //Define block container
    var blocks = this.game.add.group();

    //Calculate sprite positions
    var tmpWidth = (blockWidth - 2) / 2;
    var tmpHeight = (blockHeight / 2 - 1) / 2;
    var tmpZ = (blockHeight / 2);
    var zIndex = 19;
    for (var z = 0; z < world.height; z++) {
      var fastZ = tmpZ * z;
      for (var y = 0; y < world.width; y++) {
        var tmpHeightY = y * tmpHeight;
        var tmpWidthY = y * tmpWidth;
        for (var x = 1 - 1; x >= 0; x--) {
          var xx = Math.floor((x * tmpWidth) + tmpWidthY);
          var yy = Math.floor(tmpHeightY - (x * tmpHeight)) - fastZ;
          var sprite = game.add.sprite(xx + this.game.world.centerX / 2 - (this.world.width * 22 + 22) / 2, yy + this.world.height * 21 - 21, "sheet");
          sprite.visible = false;
          world.array[y][zIndex].sprite = sprite;
          blocks.add(sprite);
        }
      }
      zIndex--;
    }

    //Set scale of blocks
    blocks.scale.x = 2;
    blocks.scale.y = 2;

    //Create first brick
    this.world.currentBrick = this.brickgen.createBrick();

    //Define sounds
    this.sound = {
      music: game.add.audio('soundtrack'),
      join: game.add.audio('brick'),
      line: game.add.audio("line")
    };

    //Play the soundtrack
    this.sound.music.play();

    //Text style
    var textStyle = {
      font: "bold 35px 04b03",
      fill: "#000"
    };

    //Define texts
    this.text = {
      score: game.add.text((this.game.world.centerX + (blockWidth * this.world.width) / 2) + 30, this.game.world.centerY / 2, "Score: 0", textStyle),
      lines: game.add.text((this.game.world.centerX + (blockWidth * this.world.width) / 2) + 30, this.game.world.centerY / 2 + 50, "Lines: 0", textStyle),
      level: game.add.text((this.game.world.centerX + (blockWidth * this.world.width) / 2) + 30, this.game.world.centerY / 2 + 100, "Level: 1", textStyle),
    }

    //Register keyboard keys
    this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    //Time handlers
    this.lastUpdate = 0;
    this.lastPress = 0;

    //Define fucntions

    this.updateUI = function() {
      this.text.level.text = "Level: " + this.world.level;
      this.text.lines.text = "Lines: " + this.world.lines;
      this.text.score.text = "Score: " + this.world.score;
    }
  },
  update: function() {
    if (this.upKey.isUp && this.downKey.isUp && this.leftKey.isUp && this.rightKey.isUp) {
      this.lastPress = 0;
    }

    //Instant brick down
    if (this.spaceKey.isDown) {
      while (true) {
        if (!this.world.checkCollision(this.world.currentBrick.x, this.world.currentBrick.y + 1)) {
          this.world.currentBrick.y += 1;
        } else {
          this.world.pushBrick(this.brickgen.createBrick());
          break;
        }
      }
    }

    //Key movement
    if (this.time.now - this.lastPress >= 90) {

      //Down arrow
      if (this.downKey.isDown) {
        if (!this.world.checkCollision(this.world.currentBrick.x, this.world.currentBrick.y + 1)) {
          this.world.currentBrick.updatePosition();
        } else {
          this.sound.join.play();
          if (this.world.pushBrick(this.brickgen.createBrick()) > 0) {
            this.sound.line.play();
          }
          this.updateUI();
        }
      }

      //Up arrow
      if (this.upKey.isDown) {
        this.world.currentBrick.rotate();

        if (this.world.checkCollision(this.world.currentBrick.x, this.world.currentBrick.y)) {
          for (var i = 0; i < 3; i++) {
            this.world.currentBrick.rotate();
          }
        }
      }

      //Left arrow
      if (this.leftKey.isDown) {
        if (!this.world.checkCollision(this.world.currentBrick.x - 1, this.world.currentBrick.y)) {
          this.world.currentBrick.x -= 1;
        }
      }
      //Right arrow
      else if (this.rightKey.isDown) {
        if (!this.world.checkCollision(this.world.currentBrick.x + 1, this.world.currentBrick.y)) {
          this.world.currentBrick.x += 1;
        }
      }

      if (this.upKey.isDown || this.downKey.isDown || this.leftKey.isDown || this.rightKey.isDown) {
        this.lastPress = this.time.now;
      }
    }


    //Fall down
    if (this.time.now - this.lastUpdate >= 500) {
      this.lastUpdate = this.time.now;
      if (!this.world.checkCollision(this.world.currentBrick.x, this.world.currentBrick.y + 1)) {
        this.world.currentBrick.updatePosition();
      } else {
        this.sound.join.play();
        if (this.world.pushBrick(this.brickgen.createBrick()) > 0) {
          this.sound.line.play();
        }
        this.updateUI();
      }
    }

    //Update blocks
    this.world.render();
  },
  //Debug text
  render: function() {
    //Show fps
    game.debug.text(game.time.fps, 5, 50, 'black', 'Segoe UI', 50);
  }
};
