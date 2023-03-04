import readline from "readline";
import keypress from "keypress";

// Define game variables
let playerX = 18;
let playerY = 18;
const mapWidth = 37;
const mapHeight = 19;

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
        if (playerY === mapHeight - 1 && playerX > 0) {
          playerX--;
        }
        break;
      case "right":
        if (playerY === mapHeight - 1 && playerX < mapWidth - 1) {
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

  // Draw the game map
  for (let y = 0; y < mapHeight; y++) {
    let row = "";
    for (let x = 0; x < mapWidth; x++) {
      let cell = ".";
      if (x === playerX && y === playerY) {
        cell = "P";
      }
      row += `${cell}`;
    }
    console.log(row);
  }

  // Call the game loop again
  setTimeout(gameLoop, 100);
}

// Start the game loop
gameLoop();
