class World {
  constructor(width = 10, height = 20, speed = 1000) {
    this.height = height;
    this.width = width;
    this.speed = speed;
    this.level = 1;
    this.lines = 0;
    this.score = 0;
    this.array = Array(this.width).fill().map(() => Array(this.height));
    this.currentBrick = new Brick();

    for (var x = 0; x < this.width; x++) {
      for (var y = 0; y < this.height; y++) {
        this.array[x][y] = new Block();
      }
    }
  }

  removeRows() {
    var cloned = this.array.slice(0);
    var count = 0;

    for (var r = 0; r < this.height; r++) {
      var full = true;

      for (var c = 0; c < this.width; c++) {
        if (this.array[c][r].type === 0) {
          full = false;
        }
      }

      if (full) {
        for (var y = r - 1; y > 0; y--) {
          for (var x = 0; x < this.width; x++) {
            this.array[x][y + 1].type = cloned[x][y].type;
          }
        }
        count++;
      }
    }
    return count;
  }

  checkCollision(xx, yy) {
    var collision = false;

    for (var x = 0; x < this.currentBrick.edge; x++) {
      for (var y = 0; y < this.currentBrick.edge; y++) {
        if ((this.currentBrick.blocks[x][y] > 0) &&
          ((y + yy >= this.height) || (x + xx < 0) || (x + xx >= this.width) ||
            (this.array[x + xx][y + yy].type > 0))) {
          collision = true;
        }
      }
    }
    return collision;
  }

  joinBrick() {
    for (var x = 0; x < this.currentBrick.edge; x++) {
      for (var y = 0; y < this.currentBrick.edge; y++) {
        if (y + this.currentBrick.y < 20 && this.currentBrick.blocks[x][y] > 0) {
          this.array[x + this.currentBrick.x][y + this.currentBrick.y].type = this.currentBrick.blocks[x][y];
        }
      }
    }
  }

  pushBrick(brick) {
    this.joinBrick();
    this.currentBrick = brick;
    if (this.checkCollision(this.currentBrick.x, this.currentBrick.y)) {
      this.clearGame();
      console.log("End of fucking game");
      this.currentBrick = brick;
    }
    var rowCount = this.removeRows();
    this.lines += rowCount;
    this.calculateScore(rowCount);
    this.level = Math.floor(this.lines / 10) + 1;
    return rowCount;
  }

  calculateScore(rowCount) {
    switch (rowCount) {
      case 1:
        this.score += this.level * 40 + 40;
        break;
      case 2:
        this.score += this.level * 100 + 100;
        break;
      case 3:
        this.score += this.level * 300 + 300;
        break;
      case 4:
        this.score += this.level * 1200 + 1200;
        break;
    }
  }

  calculatePointer() {
    var tmpX = this.currentBrick.x;
    var tmpY = this.currentBrick.y;

    while (!this.checkCollision(tmpX, tmpY + 1)) {
      tmpY += 1;
    }

    return tmpY;
  }

  clearGame() {
    for (var x = 0; x < this.width; x++) {
      for (var y = 0; y < this.height; y++) {
        this.array[x][y].type = 0;
      }
    }

    this.score = 0;
    this.level = 1;
    this.lines = 0;
  }

  render() {
    var json = game.cache.getJSON("bricks-defs");
    for (var x = 0; x < this.width; x++) {
      for (var y = 0; y < this.height; y++) {
        var visible = this.array[x][y].type !== 0;
        if (visible) {
          this.array[x][y].sprite.frameName = findByType(this.array[x][y].type, json).name;
          this.array[x][y].sprite.alpha = 1;
        }
        this.array[x][y].sprite.visible = visible;

        var pointerY = this.calculatePointer();
        for (var bx = 0; bx < this.currentBrick.edge; bx++) {
          for (var by = 0; by < this.currentBrick.edge; by++) {
            if (x === bx + this.currentBrick.x && y === by + pointerY && this.currentBrick.blocks[bx][by] !== 0) {
              this.array[x][y].sprite.frameName = findByType(this.currentBrick.blocks[bx][by], json).name;
              this.array[x][y].sprite.visible = true;
              this.array[x][y].sprite.alpha = 0.6;
            }
          }
        }

        for (var bx = 0; bx < this.currentBrick.edge; bx++) {
          for (var by = 0; by < this.currentBrick.edge; by++) {
            if (x === bx + this.currentBrick.x && y === by + this.currentBrick.y && this.currentBrick.blocks[bx][by] !== 0) {
              this.array[x][y].sprite.frameName = findByType(this.currentBrick.blocks[bx][by], json).name;
              this.array[x][y].sprite.visible = true;
              this.array[x][y].sprite.alpha = 1;
            }
          }
        }
      }
    }
  }
}
