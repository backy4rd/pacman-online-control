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
    this.gameOver = true;
    this.map;
    this.pacman;
    this.enemies;
    this.score;
  }

  startGame(callback = () => {}) {
    //initialization
    this.gameOver = false;
    this.map = JSON.parse(JSON.stringify(map));
    this.pacman = new Pacman(this.map);
    this.enemies = new Array(5).fill().map(() => new Enemy(this.map));
    this.score = 0;

    //enemies move every 500 miliseconds
    this.intervalId = setInterval(() => {
      this.enemies.forEach(enemy => enemy.move());

      if (this.pacman.eatEnemy(this.enemies)) {
        this.enemies.splice(
          this.enemies.findIndex(
            enemy =>
              enemy.position.toString() === this.pacman.position.toString()
          ),
          1
        );
        setTimeout(() => {
          this.enemies.push(new Enemy(this.map));
        }, 30000);
        this.score += 10;
      }

      callback({
        map: this.map,
        pacman: this.pacman.position,
        enemies: this.enemies.map(enemy => enemy.position),
        isBuff: this.pacman.isBuff,
        score: this.score
      });

      if (this.pacman.isDead(this.enemies)) {
        this.endGame();
      }
    }, 500);
  }

  endGame() {
    clearInterval(this.intervalId);
    this.gameOver = true;
  }

  pacmanMove(direction, callback = () => {}) {
    if (this.gameOver) return;
    this.pacman.move(direction);
    const [pacmanX, pacmanY] = this.pacman.position;

    if (this.pacman.eatBuff()) {
      this.pacman.isBuff++;

      setTimeout(() => {
        this.pacman.isBuff--;
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
      setTimeout(() => {
        this.enemies.push(new Enemy(this.map));
      }, 30000);
      this.score += 10;
    }

    callback({
      map: this.map,
      pacman: this.pacman.position,
      enemies: this.enemies.map(enemy => enemy.position),
      isBuff: this.pacman.isBuff,
      score: this.score
    });

    if (this.pacman.isDead(this.enemies)) {
      this.endGame();
    }
  }
}

module.exports = Game;
