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
  " (o.o) ",
  "(=^=^=)",
  " (> <) "
];

// Define sprite dimensions
const spriteWidth = 7;
const spriteHeight = 4;

// Define game objects
const objects = [];

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

  // Update object positions
  for (let i = 0; i < objects.length; i++) {
    const obj = objects[i];
    obj.y++;
    if (obj.y >= mapHeight) {
      // Object has fallen off the screen
      objects.splice(i, 1);
      i--;
    } else if (obj.y >= mapHeight - spriteHeight && obj.y < mapHeight && obj.x >= playerX && obj.x < playerX + spriteWidth) {
      // Object has collided with the player
      objects.splice(i, 1);
      i--;
      score++;
    }
  }

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
      } else {
        for (let i = 0; i < objects.length; i++) {
          const obj = objects[i];
          if (x === obj.x && y === obj.y) {
            cell = "o";
          }
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
