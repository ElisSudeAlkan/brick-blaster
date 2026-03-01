// Brick Blaster (Breakout-style) — vanilla JS + Canvas
console.log("game loaded");

const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");

const scoreEl = document.getElementById("score");
const livesEl = document.getElementById("lives");
const statusEl = document.getElementById("status");

const W = canvas.width;
const H = canvas.height;

let left = false;
let right = false;

const state = {
  running: true,
  started: false,
  paused: false,
  score: 0,
  lives: 3,
};

const paddle = {
  w: 110,
  h: 14,
  x: (W - 110) / 2,
  y: H - 30,
  speed: 8,
};

const ball = {
  r: 8,
  x: W / 2,
  y: H - 60,
  vx: 0,
  vy: 0,
  speed: 5,
};

const bricks = {
  rows: 5,
  cols: 10,
  w: 70,
  h: 18,
  gap: 8,
  top: 60,
  left: 45,
  alive: [],
};

function initBricks() {
  bricks.alive = Array.from({ length: bricks.rows }, () =>
    Array.from({ length: bricks.cols }, () => true)
  );
}

function resetBall() {
  ball.vx = 0;
  ball.vy = 0;
  state.started = false;
  statusEl.textContent = "Waiting to serve (Space)";
}

function serve() {
  if (state.started) return;
  state.started = true;
  statusEl.textContent = "Playing";

  // Slight random angle
  const dir = Math.random() < 0.5 ? -1 : 1;
  ball.vx = dir * (ball.speed * 0.7);
  ball.vy = -ball.speed;
}

function setPaused(p) {
  state.paused = p;
  statusEl.textContent = p
    ? "Paused"
    : state.started
      ? "Playing"
      : "Waiting to serve (Space)";
}

function loseLife() {
  state.lives -= 1;
  livesEl.textContent = String(state.lives);

  if (state.lives <= 0) {
    state.running = false;
    statusEl.textContent = "Game Over (refresh)";
    return;
  }

  resetBall();
}

function addScore(n) {
  state.score += n;
  scoreEl.textContent = String(state.score);
}

function rectIntersectCircle(rx, ry, rw, rh, cx, cy, cr) {
  const closestX = Math.max(rx, Math.min(cx, rx + rw));
  const closestY = Math.max(ry, Math.min(cy, ry + rh));
  const dx = cx - closestX;
  const dy = cy - closestY;
  return dx * dx + dy * dy <= cr * cr;
}

function update() {
  // Paddle movement
  if (left) paddle.x = Math.max(0, paddle.x - paddle.speed);
  if (right) paddle.x = Math.min(W - paddle.w, paddle.x + paddle.speed);

  // Before serve: keep the ball on the paddle
  if (!state.started) {
    ball.x = paddle.x + paddle.w / 2;
    ball.y = paddle.y - ball.r - 2;
    return;
  }

  // Ball movement
  ball.x += ball.vx;
  ball.y += ball.vy;

  // Wall collisions
  if (ball.x - ball.r <= 0 || ball.x + ball.r >= W) ball.vx *= -1;
  if (ball.y - ball.r <= 0) ball.vy *= -1;

  // Bottom (lose life)
  if (ball.y - ball.r > H) loseLife();

  // Paddle collision
  if (
    rectIntersectCircle(paddle.x, paddle.y, paddle.w, paddle.h, ball.x, ball.y, ball.r) &&
    ball.vy > 0
  ) {
    ball.vy *= -1;

    // Change angle depending on where the ball hits the paddle
    const hit = (ball.x - (paddle.x + paddle.w / 2)) / (paddle.w / 2);
    ball.vx = hit * ball.speed;
  }

  // Brick collisions
  for (let r = 0; r < bricks.rows; r++) {
    for (let c = 0; c < bricks.cols; c++) {
      if (!bricks.alive[r][c]) continue;

      const bx = bricks.left + c * (bricks.w + bricks.gap);
      const by = bricks.top + r * (bricks.h + bricks.gap);

      if (rectIntersectCircle(bx, by, bricks.w, bricks.h, ball.x, ball.y, ball.r)) {
        bricks.alive[r][c] = false;
        addScore(10);
        ball.vy *= -1;
        return; // one collision per frame
      }
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, W, H);

  // Paddle
  ctx.fillRect(paddle.x, paddle.y, paddle.w, paddle.h);

  // Ball
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
  ctx.fill();

  // Bricks
  for (let r = 0; r < bricks.rows; r++) {
    for (let c = 0; c < bricks.cols; c++) {
      if (!bricks.alive[r][c]) continue;
      const x = bricks.left + c * (bricks.w + bricks.gap);
      const y = bricks.top + r * (bricks.h + bricks.gap);
      ctx.fillRect(x, y, bricks.w, bricks.h);
    }
  }
}

function loop() {
  if (!state.running) {
    draw();
    return;
  }

  if (!state.paused) update();
  draw();
  requestAnimationFrame(loop);
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") left = true;
  if (e.key === "ArrowRight") right = true;

  if (e.code === "Space") serve();
  if (e.key.toLowerCase() === "p") setPaused(!state.paused);
});

document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowLeft") left = false;
  if (e.key === "ArrowRight") right = false;
});

// Boot
initBricks();
resetBall();
livesEl.textContent = String(state.lives);
scoreEl.textContent = String(state.score);
requestAnimationFrame(loop);