const canvasContainer = document.querySelector('.canvas-container');
if (!canvasContainer) {
  throw new Error('canvas container not found');
}

function makeAndDraw(id, drawer) {
  const canvas = document.createElement('canvas');
  canvas.id = id;
  canvas.width = canvas.height = 150;
  canvasContainer.appendChild(canvas);
  drawer(canvas, canvas.getContext('2d'));
}

function draw() {
  if (!document.createElement('canvas').getContext) {
    console.log('Canvas not supported');
    return;
  }

  makeAndDraw('intersecting-rectangles', (canvas, ctx) => {
    ctx.fillStyle = 'rgb(200, 0, 0)';
    ctx.fillRect(10, 10, 50, 50);
    ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
    ctx.fillRect(30, 30, 50, 50);
  });
}

draw();
