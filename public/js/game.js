class Block {
  constructor(x, y, square, context) {
    this.x = x;
    this.y = y;
    this.square = square;
    this.context = context;
  }

  drawBlock(color) {
    this.context.fillStyle = color;
    this.context.fillRect(this.x, this.y, this.square, this.square);
  }

  drawDot(color, size) {
    if (size > this.square / 2) return;
    this.context.beginPath();
    this.context.fillStyle = color;
    this.context.arc(
      this.x + this.square / 2,
      this.y + this.square / 2,
      size,
      0,
      2 * Math.PI,
    );
    this.context.fill();
    this.context.closePath();
  }

  drawImg(url) {
    const img = document.createElement('img');
    img.src = url;
    this.context.drawImage(
      img,
      this.x + 1,
      this.y + 1,
      this.square - 2,
      this.square - 2,
    );
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

  draw(map, pacman, enemies, isBuff) {
    this.drawBackground();
    this.drawMap(map);
    this.drawObject(pacman, enemies, isBuff);
  }

  drawMap(map) {
    for (let i = 0; i < this.xBlock; i++) {
      for (let j = 0; j < this.yBlock; j++) {
        if (map[i][j] == 'w') this.allBlock[i][j].drawBlock('brown');
        if (map[i][j] == '$')
          this.allBlock[i][j].drawDot('yellow', this.square / 4);
        if (map[i][j] == 'b')
          this.allBlock[i][j].drawDot('blue', this.square / 3);
      }
    }
  }

  drawObject(pacman, enemies, isBuff) {
    if (isBuff) {
      this.allBlock[pacman[0]][pacman[1]].drawImg(
        './public/img/pacman-buff.png',
      );
    } else {
      this.allBlock[pacman[0]][pacman[1]].drawImg('./public/img/pacman.png');
    }
    enemies.forEach(enemy => {
      this.allBlock[enemy[0]][enemy[1]].drawImg('./public/img/ghost.png');
    });
  }

  drawBackground() {
    for (let i = 0; i < this.xBlock; i++) {
      for (let j = 0; j < this.yBlock; j++) {
        this.allBlock[i][j].drawBlock('grey');
      }
    }
  }
}
