const left = 'ArrowLeft',
  right = 'ArrowRight',
  up = 'ArrowUp',
  down = 'ArrowDown';
const wall = 'w';

class Enemy {
  constructor(map) {
    this.position = [11, 15];
    this.direction = up;
    this.map = map;
  }

  move() {
    while (this.reachWall()) {
      this.direction = this.randomDirection();
    }
    this.position = this.positionAfterMove();
  }

  positionAfterMove() {
    if (this.direction === left)
      return [this.position[0], this.position[1] - 1];
    if (this.direction === right)
      return [this.position[0], this.position[1] + 1];
    if (this.direction === up) 
      return [this.position[0] - 1, this.position[1]];
    if (this.direction === down)
      return [this.position[0] + 1, this.position[1]];
  }

  randomDirection() {
    const random_0to3 = Math.floor(Math.random() * 4);
    if (random_0to3 === 0) return left;
    if (random_0to3 === 1) return right;
    if (random_0to3 === 2) return up;
    if (random_0to3 === 3) return down;
  }

  reachWall() {
    const [x, y] = this.positionAfterMove();
    return this.map[x][y] === wall;
  }
}

module.exports = Enemy;
