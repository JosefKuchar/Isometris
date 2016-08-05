class Brick {
  constructor(blocks = Array(4).fill().map(() => Array(4).fill(0))) {
    this.blocks = blocks;
    this.x = 0;
    this.y = 0;
    this.width = 4;
    this.height = 4;
  }

  updatePosition() {
    this.y++;
  }

  rotate() {
    //Clone array, because javascript references
    var cloned = JSON.parse(JSON.stringify(this.blocks));;
    //Rotate array
    for (var y = 0; y < this.width; y++) {
      for (var x = 0; x < this.height; x++) {
        this.blocks[x][y] = cloned[y][(this.width - 1) - x];
      }
    }
  }
}
