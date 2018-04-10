import {Util} from './util.js';

function draw() {
  const {
    makeAndDraw,
    drawGrid,
    assertCanvasIsSupported,
  } = new Util().generate();

  assertCanvasIsSupported();

  const {PI} = Math;

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

  makeAndDraw('color-circles', ctx => {
    for (let a = 0; a < 6; a++) {
      const blue = Math.floor(255 - 42.5 * a);
      for (let b = 0; b < 6; b++) {
        const green = Math.floor(255 - 42.5 * b);
        ctx.strokeStyle = `rgb(0, ${green}, ${blue})`;
        ctx.beginPath();
        ctx.arc(12.5 + a * 25, 12.5 + b * 25, 10, 0, PI * 2);
        ctx.stroke();
      }
    }
  });

  makeAndDraw('semi-transparent-circles', ctx => {
    [
      ['#fd0', 0, 0],
      ['#6c0', 75, 0],
      ['#09f', 0, 75],
      ['#f30', 75, 75],
    ].forEach(([color, x, y]) => {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, 75, 75);
    });

    ctx.fillStyle = '#fff';
    ctx.globalAlpha = 0.2;

    // 中心を共有する円を徐々に大きくして描画する。
    // 中心部分ほど繰り返し描画されるので、透明度が下がる。
    for (let i = 0; i < 7; i++) {
      ctx.beginPath();
      ctx.arc(75, 75, 10 + 10 * i, 0, PI * 2);
      ctx.fill();
    }
  });
}

draw();
