import {Util} from './util.js';

function draw() {
  const {
    makeAndDraw,
    drawGrid,
    assertCanvasIsSupported,
  } = new Util().generate();

  assertCanvasIsSupported();

  makeAndDraw('color-rectangles', ctx => {
    for (let a = 0; a < 6; a++) {
      const red = Math.floor(255 - 42.5 * a);
      for (let b = 0; b < 6; b++) {
        const green = Math.floor(255 - 42.5 * b);
        ctx.fillStyle = `rgb(${red}, ${green}, 0)`;
        ctx.fillRect(b * 25, a * 25, 25, 25);
      }
    }
  });
}

draw();
