class World {
  constructor(width = 10, height = 20) {
    this.height = height;
    this.width = width;
    this.array = Array(this.width).fill().map(() => Array(this.height).fill(false));
  }
}
