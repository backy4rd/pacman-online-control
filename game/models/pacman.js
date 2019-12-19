const left = 'ArrowLeft',
  right = 'ArrowRight',
  up = 'ArrowUp',
  down = 'ArrowDown';
const wall = 'w',
  coin = '$',
  buff = 'b',
  none = '.';

class Pacman {
  constructor(map) {
    this.map = map;
    this.position = [14, 5];
    this.isBuff = true;
  }

  move(direction) {
    if (this.reachWall(direction)) return;
    this.position = this.positionAfterMove(direction);
  }

  eatCoin() {
    const [x, y] = this.position;
    return this.map[x][y] === coin;
  }

  eatBuff() {
    const [x, y] = this.position;
    return this.map[x][y] === buff;
  }

  eatEnemy(enemies) {
    return (
      enemies.some(
        enemy => enemy.position.toString() === this.position.toString()
      ) && this.isBuff === true
    );
  }

  isDead(enemies) {
    return (
      enemies.some(
        enemy => enemy.position.toString() === this.position.toString()
      ) && this.isBuff === false
    );
  }

  positionAfterMove(direction) {
    if (direction === left) return [this.position[0], this.position[1] - 1];
    if (direction === right) return [this.position[0], this.position[1] + 1];
    if (direction === up) return [this.position[0] - 1, this.position[1]];
    if (direction === down) return [this.position[0] + 1, this.position[1]];
  }

  reachWall(direction) {
    const [x, y] = this.positionAfterMove(direction);
    return this.map[x][y] === wall;
  }
}

module.exports = Pacman;
