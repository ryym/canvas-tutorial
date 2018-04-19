import {Util} from './util.js';

function draw() {
  const {makeAndDraw, drawGrid, assertCanvasIsSupported} = new Util({
    defaultWidth: 300,
  }).generate();

  assertCanvasIsSupported();

  const {PI} = Math;

  makeAndDraw('drawing-text', ctx => {
    ctx.font = '48px serif';
    ctx.fillText('Hello world', 10, 50);
    ctx.strokeText('Hello world', 10, 100);

    const text = ctx.measureText('Hello');
    console.log(text);
  });
}

draw();
