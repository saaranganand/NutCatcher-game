import keypress from "keypress";
import chalk from "chalk";

// Define game variables
let playerX = 0;
let playerY = 6; // Start at 7th row from the top
const mapWidth = 37;
const mapHeight = 19;

let score = 0;

// Define game sprite
const playerSprite = [
  "  \\ /  ",
  " (+.+) ",
  "(=^=^=)",
  " (> <) "
];

// Define sprite dimensions
const spriteWidth = 7;
const spriteHeight = 4;

// Define game objects
const objects = [];

let fallingXs = [];

// Read player input
keypress(process.stdin);
process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.on("keypress", (ch, key) => {
  if (key && key.ctrl && key.name === "c") {
    process.exit();
  } else {
    switch (key.name) {
      case "left":
        if (playerX > 0) {
          playerX--;
        }
        break;
      case "right":
        if (playerX < mapWidth - spriteWidth) {
          playerX++;
        }
        break;
      default:
        break;
    }
  }
});

// Define game loop function
function gameLoop() {
  // Clear the terminal
  console.clear();

  // Spawn new objects randomly
  if (Math.random() < 0.1) {
    const obj = {
      x: Math.floor(Math.random() * (mapWidth - 1)),
      y: 0
    };
    objects.push(obj);
  }

  // Spawn new 'x's randomly
  if (Math.random() < 0.1) {
    const xObj = {
      x: Math.floor(Math.random() * (mapWidth - 1)),
      y: 0
    };
    fallingXs.push(xObj);
  }

  // Update object positions
  for (let i = objects.length - 1; i >= 0; i--) {
    const obj = objects[i];
    obj.y++;
    if (obj.y >= mapHeight) {
      // Object has fallen off the screen
      objects.splice(i, 1);
    } else if (obj.y >= mapHeight - spriteHeight && obj.y < mapHeight && obj.x >= playerX && obj.x < playerX + spriteWidth) {
      // Object has collided with the player
      objects.splice(i, 1);
      score++;
    }
  }

  // Update 'x' positions and check for collisions
  for (let i = fallingXs.length - 1; i >= 0; i--) {
    const xObj = fallingXs[i];
    xObj.y++;
    if (xObj.y >= mapHeight) {
      // 'x' has fallen off the screen
      fallingXs.splice(i, 1);
    } else if (xObj.y >= mapHeight - spriteHeight && xObj.y < mapHeight && xObj.x >= playerX && xObj.x < playerX + spriteWidth) {
      // 'x' has collided with the player
      fallingXs.splice(i, 1);
      if(score > 0)
        score--;
    }
  }

  // Draw the game map
// Draw the game map
for (let y = 0; y < mapHeight; y++) {
  let row = "";
  for (let x = 0; x < mapWidth; x++) {
    let cell = ".";
    if (x === 0 || x === 1 || x === 2 || x === 3 || x === mapWidth - 1 || x === mapWidth - 2 || x === mapWidth - 3 || x === mapWidth - 4)
      {cell = "|";}
    if (y >= mapHeight - spriteHeight && y < mapHeight && x >= playerX && x < playerX + spriteWidth) {
      const spriteRow = y - (mapHeight - spriteHeight);
      const spriteCol = x - playerX;
      if (spriteRow >= 0 && spriteRow < playerSprite.length && spriteCol >= 0 && spriteCol < playerSprite[spriteRow].length) {
        cell = playerSprite[spriteRow][spriteCol];
      }
    }
    for (let i = 0; i < objects.length; i++) {
      const obj = objects[i];
      if (x === obj.x && y === obj.y) {
        cell = "o";
        if (obj.y == mapHeight - 1)
          cell = "-";
      }
    }
    for (let i = 0; i < fallingXs.length; i++) {
      const xObj = fallingXs[i];
      if (x === xObj.x && y === xObj.y) {
        cell = "x";
      }
    }
    row += `${cell}`;
  }
  console.log(row);
}

  // Call the game loop again
  setTimeout(gameLoop, 100);
    console.log(chalk.bgBlue('Score: ' + (chalk.bgRed(score))));
  
  if(score == 5)
  {
    console.log(chalk.bgGreen(`Good job making it to ${score}! Hope you enjoyed :)`));
    console.log(chalk.bgCyan(`Edit the score variable in this 'if' statement to change the difficulty!`));
    process.exit();
  }
}

// Start the game loop
gameLoop();
