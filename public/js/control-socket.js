const socket = io(
  window.location.href.slice(0, window.location.href.indexOf('/control'))
);

window.addEventListener('keydown', ({ key }) => {
  if (/Arrow/.test(key)) {
    socket.emit('direct pacman', key);
  }
});

document.getElementById('up').addEventListener('click', () => {
  console.log('move');
  socket.emit('direct pacman', 'ArrowUp');
});

document.getElementById('down').addEventListener('click', () => {
  socket.emit('direct pacman', 'ArrowDown');
});

document.getElementById('left').addEventListener('click', () => {
  socket.emit('direct pacman', 'ArrowLeft');
});

document.getElementById('right').addEventListener('click', () => {
  socket.emit('direct pacman', 'ArrowRight');
});

document.getElementById('start').addEventListener('click', () => {
  socket.emit('start game');
});
