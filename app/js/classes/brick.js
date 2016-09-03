class Brick {

  constructor(blocks = Array(4).fill().map(() => Array(4).fill(0)), edge = 4) {
    this.blocks = blocks;
    this.x = 0;
    this.y = 0;
    this.edge = edge;
    console.log(this.edge);
  }

  updatePosition() {
    this.y++;
  }

  rotate() {
    //Clone array, because javascript references
    var cloned = JSON.parse(JSON.stringify(this.blocks));
    //Rotate array
    for (var y = 0; y < this.edge; y++) {
      for (var x = 0; x < this.edge; x++) {
        this.blocks[x][y] = cloned[y][(this.edge - 1) - x];
      }
    }
  }
}
