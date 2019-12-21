const socket = io(window.location.href);

const canvas = document.getElementById('game-field');

const context = canvas.getContext('2d');

const game = new Game(31, 28, 20, context);
game.initialization();

socket.on('enemies move', ({ map, pacman, enemies }) => {
  game.draw(map, pacman, enemies);
});

socket.on('pacman move', ({ map, pacman, enemies }) => {
  game.draw(map, pacman, enemies);
  console.log(map);
});

socket.on('game over', () => {
  alert('game over');
});
