import readline from "readline";
import keypress from "keypress";

// Define game variables
let playerX = 0;
let playerY = 6; // Start at 7th row from the top
const mapWidth = 37;
const mapHeight = 19;

// Define game sprite
const sprite = [
  "  \\ /  ",
  " (o.o) ",
  "(=^=^=)",
  " (> <) "
];

// Define sprite dimensions
const spriteWidth = 7;
const spriteHeight = 4;

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

  // Draw the game map
  for (let y = 0; y < mapHeight; y++) {
    let row = "";
    for (let x = 0; x < mapWidth; x++) {
      let cell = ".";
      if (y >= mapHeight - spriteHeight && y < mapHeight && x >= playerX && x < playerX + spriteWidth) {
        const spriteRow = y - (mapHeight - spriteHeight);
        const spriteCol = x - playerX;
        if (spriteRow >= 0 && spriteRow < sprite.length && spriteCol >= 0 && spriteCol < sprite[spriteRow].length) {
          cell = sprite[spriteRow][spriteCol];
        }
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