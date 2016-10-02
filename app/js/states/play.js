var play = function(game) {};

play.prototype = {
  create: function() {
    game.time.advancedTiming = true;

    //Create new world instance
    var world = 0;

    if (Settings.state === 0) {
      world = new World();
    } else {
      world = Settings.state;
    }

    this.world = world;

    //Create new world instance
    this.brickgen = new BrickGenerator();

    //Block size in pixels
    var blockWidth = 42;
    var blockHeight = 42;

    // Define block container
    var blocks = this.game.add.group();

    // Calculate sprite positions

    //Precalculate variables
    var tmpWidth = (blockWidth - 2) / 2;
    var tmpHeight = (blockHeight / 2 - 1) / 2;
    var tmpZ = (blockHeight / 2);
    var zIndex = 19;


    // Ground
    for (var i = 0; i < world.width; i++) {
      var sprite = game.add.sprite(i * tmpWidth + this.game.world.centerX / 2 - (this.world.width * 22 + 22) / 2, i * tmpHeight + this.world.height * 21, "sheet", "Ground");
      blocks.add(sprite);
    }

    // Blocks
    for (var z = 0; z < world.height; z++) {
      var fastZ = tmpZ * z;
      for (var y = 0; y < world.width; y++) {
        var tmpHeightY = y * tmpHeight;
        var tmpWidthY = y * tmpWidth;
        for (var x = 1 - 1; x >= 0; x--) {
          var xx = Math.floor(tmpWidthY);
          var yy = Math.floor(tmpHeightY) - fastZ;
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
    if (Settings.state === 0) {
      this.world.currentBrick = this.brickgen.createBrick();
    }


    //Define sounds
    this.sound = {
      music: game.add.audio('soundtrack'),
      join: game.add.audio('brick'),
      line: game.add.audio("line")
    };

    //Play the soundtrack
    if (Settings.audio.music) {
      this.sound.music.loopFull();
    }

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
    };

    //Register keyboard keys
    this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    //Time handlers
    this.lastUpdate = 0;
    this.lastPress = 0;

    //Define functions

    this.updateUI = function() {
      this.text.level.text = "Level: " + this.world.level;
      this.text.lines.text = "Lines: " + this.world.lines;
      this.text.score.text = "Score: " + this.world.score;
    };

    this.stopButtonClick = function() {
      //game.state.start("Menu");
      Settings.running = !Settings.running;
      var value = Settings.running ? "Stop" : "Start";
      stop._onOutFrame = value;
      stop._onOverFrame = value;
      stop._onDownFrame = value;
    };

    var stop = this.game.add.button(50, 50, "sheet", this.stopButtonClick, this, "Stop", "Stop", "Stop");
    stop.anchor.setTo(0, 0);
    stop.scale.x = 5;
    stop.scale.y = 5;

    this.backButtonClick = function() {
      Settings.running = true;
      Settings.state = this.world;
      game.state.start("Menu");
      this.sound.music.stop();
    };

    var back = this.game.add.button(50, 150, "sheet", this.backButtonClick, this, "Start", "Start", "Start");
    back.anchor.setTo(1, 1);
    back.scale.x = -5;
    back.scale.y = -5;

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
    this.additionalSpeed = 0;
  },
  update: function() {
    if (Settings.running) {
      if (this.upKey.isUp && this.downKey.isUp && this.leftKey.isUp && this.rightKey.isUp && this.spaceKey.isUp) {
        this.lastPress = 0;
      }

      if (this.downKey.isUp) {
        this.additionalSpeed = 0;
      }

      if (this.time.now - this.lastPress >= 200) {
        //Instant brick down
        if (this.spaceKey.isDown) {
          while (true) {
            if (!(this.world.checkCollision(this.world.currentBrick.x, this.world.currentBrick.y + 1) !== 0)) {
              this.world.currentBrick.y += 1;
            } else {
              var currentScore = this.world.score;
              var linecount = this.world.pushBrick(this.brickgen.createBrick());
              if (Settings.end) {
                this.game.state.start("End", true, false, currentScore);
              }
              if (Settings.audio.sfx) {
                this.sound.join.play();
                if (linecount > 0) {
                  this.sound.line.play();
                }
              }
              this.updateUI();
              break;
            }
          }
        }

        //Up arrow
        if (this.upKey.isDown) {
          this.world.currentBrick.rotate();

          if (this.world.currentBrick.x < 0 && this.world.currentBrick.edge !== 4) {
            if (this.world.checkCollision(this.world.currentBrick.x + Math.floor(this.world.currentBrick.edge / 2), this.world.currentBrick.y) === 0) {
              this.world.currentBrick.x += Math.floor(this.world.currentBrick.edge / 2);
            }
          } else if (this.world.currentBrick.x + Math.ceil(this.world.currentBrick.edge / 2) >= this.world.width && this.world.currentBrick.edge !== 4) {
            if (this.world.checkCollision(this.world.currentBrick.x - Math.floor(this.world.currentBrick.edge / 2), this.world.currentBrick.y) === 0) {
              this.world.currentBrick.x -= Math.floor(this.world.currentBrick.edge / 2);
            }
          } else if (this.world.currentBrick.edge === 4 && this.world.currentBrick.x + 3 >= this.world.width) {
            if (this.world.currentBrick.x + 3 === this.world.width) {
              this.world.currentBrick.x -= 1;
            } else {
              this.world.currentBrick.x -= 2;
            }
          } else if (this.world.currentBrick.edge === 4 && this.world.currentBrick.x < 0) {
            if (this.world.currentBrick.x === -1) {
              this.world.currentBrick.x += 1;
            } else {
              this.world.currentBrick.x += 2;
            }
          }


          if (this.world.checkCollision(this.world.currentBrick.x, this.world.currentBrick.y)) {
            for (var i = 0; i < 3; i++) {
              this.world.currentBrick.rotate();
            }
          }
        }

        if (this.upKey.isDown || this.spaceKey.isDown) {
          this.lastPress = this.time.now;
        }
      }

      //Key movement
      if (this.time.now - this.lastPress >= 90) {

        //Down arrow
        if (this.downKey.isDown) {
          this.additionalSpeed = 350;
        }

        //Left arrow
        if (this.leftKey.isDown) {
          if (!(this.world.checkCollision(this.world.currentBrick.x - 1, this.world.currentBrick.y) !== 0)) {
            this.world.currentBrick.x -= 1;
          }
        }
        //Right arrow
        else if (this.rightKey.isDown) {
          if (!(this.world.checkCollision(this.world.currentBrick.x + 1, this.world.currentBrick.y) !== 0)) {
            this.world.currentBrick.x += 1;
          }
        }

        if (this.downKey.isDown || this.leftKey.isDown || this.rightKey.isDown) {
          this.lastPress = this.time.now;
        }
      }


      //Fall down
      if (this.time.now - this.lastUpdate >= this.world.speed - this.additionalSpeed) {
        this.lastUpdate = this.time.now;
        if (!(this.world.checkCollision(this.world.currentBrick.x, this.world.currentBrick.y + 1) !== 0)) {
          this.world.currentBrick.updatePosition();
        } else {
          var currentScore = this.world.score;
          var linecount = this.world.pushBrick(this.brickgen.createBrick());
          if (Settings.end) {
            this.game.state.start("End", true, false, currentScore);
          }
          if (Settings.audio.sfx) {
            this.sound.join.play();
            if (linecount > 0) {
              this.sound.line.play();
            }
          }
          this.updateUI();
        }
      }

      //Update blocks
      this.world.render();
    }
  }
};
