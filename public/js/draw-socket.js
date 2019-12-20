const socket = io('http://localhost:5000');

const canvas = document.getElementById('game-field');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const context = canvas.getContext('2d');

const game = new Game(31, 28, 20, context);
game.initialization();

socket.on('enemies move', ({ map, pacman, enemies }) => {
  game.draw(map, pacman, enemies);
});

socket.on('pacman move', ({ map, pacman, enemies }) => {
  game.draw(map, pacman, enemies);
});

socket.on('game over', () => {
  alert('game over');
});

window.addEventListener('keydown', ({ key }) => {
  if (/Arrow/.test(key)) {
    socket.emit('direct pacman', key);
    console.log('move');
  }
});
