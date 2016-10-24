class BrickGenerator {
  loadBricks() {
    //[id][y][x]
    var json = game.cache.getJSON("bricks");
    var tmp_array = Array(4).fill().map(() => Array(4).fill(false));
    for (var i = 0; i < json.length; i++) {
      for (var y = 0; y < json[0].length; y++) {
        for (var x = 0; x < json[0][0].length; x++) {
          tmp_array[x][y] = json[i][y][x];
        }
      }
      this.patterns.push(tmp_array);

      //Reset tmp array
      tmp_array = Array(4).fill().map(() => Array(4).fill(false));
    }

    for (var i = 0; i < json.length; i++) {
      this.edges.push(json[i][4].edge);
    }
  }

  createBrick() {
    var patternNumber = Math.floor(Math.random() * 7);
    return new Brick(this.patterns[patternNumber], this.edges[patternNumber]);
  }

  constructor() {
    this.patterns = [];
    this.edges = [];
    this.loadBricks();
  }
}
