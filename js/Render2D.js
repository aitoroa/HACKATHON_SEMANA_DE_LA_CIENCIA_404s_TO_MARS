"use strict";
class Render2D {
  #canvas;
  #ctx;

  constructor(id, width, height, color) {
    this.#canvas = document.getElementById(id);
    this.#canvas.width = width;
    this.#canvas.height = height;
    this.#canvas.style.backgroundColor = color;
    this.#ctx = this.#canvas.getContext("2d");
  }

  clear() {
    this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
  }

  drawEntity(entity) {
    if (!entity || !entity.isAlive) return;

    if (entity.constructor.name === "Player") {
      this.#ctx.fillStyle = entity.color;
      this.#ctx.fillRect(entity.x, entity.y, entity.width, entity.height);
      return;
    }

    if (entity.constructor.name === "Shot") {
      this.#ctx.fillStyle = entity.color;

      const radius = Math.min(entity.width, entity.height) / 2;

      this.#ctx.beginPath();
      this.#ctx.arc(
        entity.x + entity.width / 2,
        entity.y + entity.height / 2,
        radius,
        0,
        Math.PI * 2
      );
      this.#ctx.fill();
      return;
    }

    const pattern = [
      [1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0],
      [1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0],
      [1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0],
      [1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0],
      [0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0],
      [0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0],
    ];

    const rows = pattern.length;
    const cols = pattern[0].length;

    const pixelW = entity.width / cols;
    const pixelH = entity.height / rows;

    this.#ctx.fillStyle = entity.color;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (pattern[r][c] === 1) {
          this.#ctx.fillRect(
            entity.x + c * pixelW,
            entity.y + r * pixelH,
            pixelW,
            pixelH
          );
        }
      }
    }
  }

  gui(score, lives) {
    this.#ctx.save();
    this.#ctx.fillStyle = "white";
    this.#ctx.font = "16px monospace";
    this.#ctx.textBaseline = "top";

    const scoreText = `SCORE: ${score}`;
    const livesText = `LIVES: ${lives}`;

    this.#ctx.fillText(scoreText, 10, 10);
    const livesWidth = this.#ctx.measureText(livesText).width;
    this.#ctx.fillText(livesText, this.#canvas.width - livesWidth - 10, 10);

    this.#ctx.restore();
  }

  #drawOverlayBackground() {
    this.#ctx.save();
    this.#ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    this.#ctx.fillRect(0, 0, this.#canvas.width, this.#canvas.height);
    this.#ctx.restore();
  }

  #draw404PixelArt() {
    const size = 10; // tamaño de cada cuadradito
    const padding = 2; // separación entre cuadraditos
    const pattern = [
      [1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0],
      [1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0],
      [1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0],
      [1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0],
      [0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0],
      [0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0],
    ];

    const rows = pattern.length;
    const cols = pattern[0].length;

    const totalWidth = cols * (size + padding) - padding;
    const totalHeight = rows * (size + padding) - padding;

    const startX = (this.#canvas.width - totalWidth) / 2;
    const startY = (this.#canvas.height - totalHeight) / 2 - 60;

    this.#ctx.save();
    this.#ctx.fillStyle = "white";

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (pattern[row][col]) {
          const x = startX + col * (size + padding);
          const y = startY + row * (size + padding);
          this.#ctx.fillRect(x, y, size, size);
        }
      }
    }

    this.#ctx.restore();
  }

  menu(title, subtitle) {
    this.#drawOverlayBackground();

    // if (title && title.toString().includes("404")) {
    //   this.#draw404PixelArt();
    // }

    this.#ctx.save();
    this.#ctx.fillStyle = "white";
    this.#ctx.textBaseline = "middle";

    const maxWidth = this.#canvas.width - 40;
    const wrapText = (text, fontSize, yStart) => {
      this.#ctx.font = `bold ${fontSize}px monospace`;
      const words = text.split(" ");
      let line = "";
      let y = yStart;
      for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + " ";
        const testWidth = this.#ctx.measureText(testLine).width;
        if (testWidth > maxWidth && i > 0) {
          this.#ctx.fillText(
            line,
            (this.#canvas.width - this.#ctx.measureText(line).width) / 2,
            y
          );
          line = words[i] + " ";
          y += fontSize + 10;
        } else {
          line = testLine;
        }
      }
      this.#ctx.fillText(
        line,
        (this.#canvas.width - this.#ctx.measureText(line).width) / 2,
        y
      );
      return y + fontSize + 20;
    };

    let y = this.#canvas.height / 2 - 40;
    y = wrapText(title, 28, y);
    wrapText(subtitle, 20, y);

    this.#ctx.restore();
  }
}
