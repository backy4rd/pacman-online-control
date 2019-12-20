class Block {
  constructor(x, y, square, context) {
    this.x = x;
    this.y = y;
    this.square = square;
    this.context = context;
  }

  draw(color) {
    this.context.fillStyle = color;
    this.context.fillRect(this.x, this.y, this.square, this.square);
  }
}

class Game {
  constructor(xBlock, yBlock, square, context) {
    this.xBlock = xBlock;
    this.yBlock = yBlock;
    this.square = square;
    this.context = context;
  }

  initialization() {
    this.allBlock = [];
    for (let i = 0; i < this.xBlock; i++) {
      let row = [];
      for (let j = 0; j < this.yBlock; j++) {
        const y = (this.square + 1) * i;
        const x = (this.square + 1) * j;
        const block = new Block(x, y, this.square, this.context);
        row.push(block);
      }
      this.allBlock.push(row);
    }
  }

  draw(map, pacman, enemies) {
    this.drawMap(map);
    this.drawObject(pacman, enemies);
  }

  drawMap(map) {
    for (let i = 0; i < this.xBlock; i++) {
      for (let j = 0; j < this.yBlock; j++) {
        if (map[i][j] == 'w') this.allBlock[i][j].draw('brown');
        if (map[i][j] == '$') this.allBlock[i][j].draw('yellow');
        if (map[i][j] == 'b') this.allBlock[i][j].draw('blue');
        if (map[i][j] == '.') this.allBlock[i][j].draw('grey');
      }
    }
  }

  drawObject(pacman, enemies) {
    this.allBlock[pacman[0]][pacman[1]].draw('green');
    enemies.forEach(enemy => {
      this.allBlock[enemy[0]][enemy[1]].draw('red');
    });
  }
}
