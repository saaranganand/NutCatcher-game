import readline from "readline";
import keypress from "keypress";

// Define game variables
let playerX = 0;
let playerY = 0;
const mapWidth = 10;
const mapHeight = 10;

// Define game loop function
function gameLoop() {
  // Clear the terminal
  console.clear();

  // Draw the game map
  for (let y = 0; y < mapHeight; y++) {
    let row = "";
    for (let x = 0; x < mapWidth; x++) {
      let cell = ".";
      if (x === playerX && y === playerY) {
        cell = "P";
      }
      row += `[${cell}]`;
    }
    console.log(row);
  }

  // Read player input
  keypress(process.stdin);
  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.on("keypress", (ch, key) => {
    if (key && key.ctrl && key.name === "c") {
      process.exit();
    } else {
      switch (key.name) {
        case "up":
          if (playerY > 1) {
            playerY--;
          }
          break;
        case "down":
          if (playerY < mapHeight - 1) {
            playerY++;
          }
          break;
        case "left":
          if (playerX > 0) {
            playerX--;
          }
          break;
        case "right":
          if (playerX < mapWidth - 1) {
            playerX++;
          }
          break;
        default:
          break;
      }
    }
  });

  // Call the game loop again
  setTimeout(gameLoop, 100);
}

// Start the game loop
gameLoop();
