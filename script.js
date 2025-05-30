// Moon-Ladybugs Game Logic

const game = document.getElementById("game");
const player = document.getElementById("player");

let playerPos = 375;
const lasers = [];
const enemies = [];

// Move player left/right
function movePlayer(dir) {
  playerPos += dir * 20;
  playerPos = Math.max(0, Math.min(750, playerPos));
  player.style.left = playerPos + "px";
}

// Shoot a laser
function shoot() {
  const laser = document.createElement("div");
  laser.classList.add("laser");
  laser.style.left = (playerPos + 22) + "px";
  laser.style.bottom = "70px";
  game.appendChild(laser);
  lasers.push(laser);
}

// Spawn ladybug enemy
function spawnEnemy() {
  const enemy = document.createElement("div");
  enemy.classList.add("enemy");
  const x = Math.floor(Math.random() * 760);
  enemy.style.left = x + "px";
  enemy.style.top = "0px";
  game.appendChild(enemy);
  enemies.push(enemy);
}

// Move lasers upward
function updateLasers() {
  for (let i = lasers.length - 1; i >= 0; i--) {
    let laser = lasers[i];
    let bottom = parseInt(laser.style.bottom);
    bottom += 10;
    if (bottom > 600) {
      laser.remove();
      lasers.splice(i, 1);
    } else {
      laser.style.bottom = bottom + "px";
    }
  }
}

// Move enemies downward
function updateEnemies() {
  for (let i = enemies.length - 1; i >= 0; i--) {
    let enemy = enemies[i];
    let top = parseInt(enemy.style.top);
    top += 2;
    if (top > 550) {
      alert("Ladybugs conquered the Moon! 🐞🌕💀");
      location.reload();
    } else {
      enemy.style.top = top + "px";
    }
  }
}

// Check collisions
function checkCollisions() {
  for (let i = enemies.length - 1; i >= 0; i--) {
    const e = enemies[i];
    const eRect = e.getBoundingClientRect();
    for (let j = lasers.length - 1; j >= 0; j--) {
      const l = lasers[j];
      const lRect = l.getBoundingClientRect();
      if (
        lRect.left < eRect.right &&
        lRect.right > eRect.left &&
        lRect.top < eRect.bottom &&
        lRect.bottom > eRect.top
      ) {
        e.remove();
        l.remove();
        enemies.splice(i, 1);
        lasers.splice(j, 1);
        break;
      }
    }
  }
}

// Key bindings
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") movePlayer(-1);
  else if (e.key === "ArrowRight") movePlayer(1);
  else if (e.key === " ") shoot();
});

// Game loop
setInterval(() => {
  updateLasers();
  updateEnemies();
  checkCollisions();
}, 30);

// Enemy spawner
setInterval(() => {
  spawnEnemy();
}, 1000);
