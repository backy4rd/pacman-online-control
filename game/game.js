const Pacman = require('./models/pacman.js');
const Enemy = require('./models/enemy.js');
const map = require('./models/map');

const wall = 'w',
  coin = '$',
  buff = 'b',
  none = '.';

class Game {
  constructor() {
    this.intervalId = 0;
  }

  startGame(callback = () => {}) {
    //initialization
    this.map = [...map];
    this.pacman = new Pacman(this.map);
    this.enemies = new Array(5).fill().map(() => new Enemy(this.map));
    this.score = 0;

    //enemies move every 500 miliseconds
    this.intervalId = setInterval(() => {
      this.enemies.forEach(enemy => enemy.move());

      if (this.pacman.isDead(this.enemies)) {
        console.log('game over');
        this.endGame();
      }

      if (this.pacman.eatEnemy(this.enemies)) {
        this.enemies.splice(
          this.enemies.findIndex(
            enemy =>
              enemy.position.toString() === this.pacman.position.toString()
          ),
          1
        );
        this.score += 10;
      }

      callback({
        map: this.map,
        pacman: this.pacman.position,
        enemies: this.enemies.map(enemy => enemy.position)
      });
    }, 500);
  }

  endGame() {
    clearInterval(this.intervalId);
    this.map = undefined;
    this.pacman = undefined;
    this.enemies = undefined;
    this.score = 0;
  }

  pacmanMove(direction, callback = () => {}) {
    this.pacman.move(direction);
    const [pacmanX, pacmanY] = this.pacman.position;

    if (this.pacman.eatBuff()) {
      this.pacman.isBuff = true;

      setTimeout(() => {
        this.pacman.isBuff = false;
      }, 10000);

      this.map[pacmanX][pacmanY] = none;
    }

    if (this.pacman.eatCoin()) {
      this.map[pacmanX][pacmanY] = none;
      this.score++;
    }

    if (this.pacman.eatEnemy(this.enemies)) {
      this.enemies.splice(
        this.enemies.findIndex(
          enemy => enemy.position.toString() === this.pacman.position.toString()
        ),
        1
      );
      this.score += 10;
    }

    if (this.pacman.isDead(this.enemies)) {
      console.log('game over');
      this.endGame();
    }

    callback({
      map: this.map,
      pacman: this.pacman.position,
      enemies: this.enemies.map(enemy => enemy.position)
    });
  }
}

module.exports = Game;
