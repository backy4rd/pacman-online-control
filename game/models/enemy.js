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
    if (this.reachCrossRoad()) {
      this.direction = this.randomDirection();
      while (this.reachWall()) {
        this.direction = this.randomDirection();
      }
    }
    this.position = this.positionAfterMove(this.direction);
  }

  positionAfterMove(direction) {
    if (direction === left) return [this.position[0], this.position[1] - 1];
    if (direction === right) return [this.position[0], this.position[1] + 1];
    if (direction === up) return [this.position[0] - 1, this.position[1]];
    if (direction === down) return [this.position[0] + 1, this.position[1]];
  }

  randomDirection() {
    const random_0to3 = Math.floor(Math.random() * 4);
    if (random_0to3 === 0) return left;
    if (random_0to3 === 1) return right;
    if (random_0to3 === 2) return up;
    if (random_0to3 === 3) return down;
  }

  reachCrossRoad() {
    let ways = 0;
    const pleft = this.positionAfterMove(left);
    const pright = this.positionAfterMove(right);
    const pup = this.positionAfterMove(up);
    const pdown = this.positionAfterMove(down);
    if (this.map[pleft[0]][pleft[1]] !== 'w') ways++;
    if (this.map[pright[0]][pright[1]] !== 'w') ways++;
    if (this.map[pup[0]][pup[1]] !== 'w') ways++;
    if (this.map[pdown[0]][pdown[1]] !== 'w') ways++;
    return ways > 2;
  }

  reachWall() {
    const [x, y] = this.positionAfterMove(this.direction);
    return this.map[x][y] === wall;
  }
}

module.exports = Enemy;
