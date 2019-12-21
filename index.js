require('dotenv').config();
const express = require('express');
const app = express();
const server = app.listen(process.env.PORT, err => {
  if (err) throw err;
  console.log('server listening port ' + process.env.PORT);
});

const io = require('socket.io')(server);

const Game = require('./game/game');

app.use('/public', express.static('public'));

app.get('/', (request, response) => {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/control', (request, response) => {
  response.sendFile(__dirname + '/views/control.html');
});

const game = new Game();

io.on('connection', socket => {
  socket.on('start game', () => {
    game.endGame();
    game.startGame(dataEvery500miliseconds => {
      io.emit('enemies move', dataEvery500miliseconds);
      if (game.pacman.isDead(game.enemies)) {
        io.emit('game over');
        console.log('game over');
      }
    });
    console.log(socket.id + ' has started game');
  });

  socket.on('direct pacman', direction => {
    game.pacmanMove(direction, dataWhenPacmanMove => {
      io.emit('pacman move', dataWhenPacmanMove);
      if (game.pacman.isDead(game.enemies)) {
        io.emit('game over');
        console.log('game over');
      }
    });
  });

  socket.on('end gane', () => game.endGame());
});
