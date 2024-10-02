var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var grid = 16;
var count = 0;

var snake = {
  x: 160,
  y: 160,
  dx: grid,
  dy: 0,
  cells: [],
  maxCells: 4
};
var apple = {
  x: 320,
  y: 320
};

var score = 0;
var highScore = 0;
var gameRunning = false;
var gamePaused = false;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function loop() {
  if (!gameRunning || gamePaused) return;

  requestAnimationFrame(loop);

  if (++count < 4) {
    return;
  }

  count = 0;
  context.clearRect(0, 0, canvas.width, canvas.height);

  snake.x += snake.dx;
  snake.y += snake.dy;

  if (snake.x < 0) {
    snake.x = canvas.width - grid;
  } else if (snake.x >= canvas.width) {
    snake.x = 0;
  }

  if (snake.y < 0) {
    snake.y = canvas.height - grid;
  } else if (snake.y >= canvas.height) {
    snake.y = 0;
  }

  snake.cells.unshift({ x: snake.x, y: snake.y });

  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop();
  }

  context.fillStyle = 'red';
  context.fillRect(apple.x, apple.y, grid - 1, grid - 1);

  context.fillStyle = 'green';
  snake.cells.forEach(function (cell, index) {
    context.fillRect(cell.x, cell.y, grid - 1, grid - 1);

    if (cell.x === apple.x && cell.y === apple.y) {
      snake.maxCells++;
      score++;

      document.getElementById('score').textContent = "Score: " + score;

      if (score > highScore) {
        highScore = score;
        document.getElementById('highScore').textContent = "High Score: " + highScore;
      }

      apple.x = getRandomInt(0, 25) * grid;
      apple.y = getRandomInt(0, 25) * grid;
    }

    for (var i = index + 1; i < snake.cells.length; i++) {
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        gameOver();
      }
    }
  });
}

function gameOver() {
  gameRunning = false;
  document.getElementById('playAgainButton').style.display = 'block';
  document.getElementById('pauseButton').style.display = 'none';
  document.getElementById('resumeButton').style.display = 'none';
  canvas.style.display = 'none';
  document.getElementById('username').disabled = false;  
}

function resetGame() {
  snake.x = 160;
  snake.y = 160;
  snake.cells = [];
  snake.maxCells = 4;
  snake.dx = grid;
  snake.dy = 0;
  score = 0;
  document.getElementById('score').textContent = "Score: " + score;
  apple.x = getRandomInt(0, 25) * grid;
  apple.y = getRandomInt(0, 25) * grid;
}

document.getElementById('startButton').addEventListener('click', function () {
  document.getElementById('startButton').style.display = 'none';
  document.getElementById('playAgainButton').style.display = 'none';
  document.getElementById('pauseButton').style.display = 'inline-block';
  document.getElementById('resumeButton').style.display = 'none';
  canvas.style.display = 'block';
  gameRunning = true;
  gamePaused = false;
  resetGame();
  document.getElementById('username').disabled = true;  
  requestAnimationFrame(loop);
});

document.getElementById('playAgainButton').addEventListener('click', function () {
  document.getElementById('playAgainButton').style.display = 'none';
  document.getElementById('pauseButton').style.display = 'inline-block';
  document.getElementById('resumeButton').style.display = 'none';
  canvas.style.display = 'block';
  gameRunning = true;
  gamePaused = false;
  resetGame();
  document.getElementById('username').disabled = true;  
  requestAnimationFrame(loop);
});

document.getElementById('pauseButton').addEventListener('click', function () {
  gamePaused = true;
  document.getElementById('pauseButton').style.display = 'none';
  document.getElementById('resumeButton').style.display = 'inline-block';
});

document.getElementById('resumeButton').addEventListener('click', function () {
  gamePaused = false;
  document.getElementById('pauseButton').style.display = 'inline-block';
  document.getElementById('resumeButton').style.display = 'none';
  requestAnimationFrame(loop);
});

document.getElementById('username').addEventListener('input', function(e) {
  var name = e.target.value || "Player";
  document.getElementById('displayName').textContent = "Username: " + name;
});

document.addEventListener('keydown', function(e) {
  if (!gameRunning || gamePaused) return;

  if (e.which === 37 && snake.dx === 0) {
    snake.dx = -grid;
    snake.dy = 0;
  } else if (e.which === 38 && snake.dy === 0) {
    snake.dy = -grid;
    snake.dx = 0;
  } else if (e.which === 39 && snake.dx === 0) {
    snake.dx = grid;
    snake.dy = 0;
  } else if (e.which === 40 && snake.dy === 0) {
    snake.dy = grid;
    snake.dx = 0;
  }
});
