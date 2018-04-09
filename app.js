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

function drawGrid(ctx, unit = 10) {
  const {strokeStyle} = ctx;

  const markedUnit = unit * 5;
  for (let i = unit; i < 150; i += unit) {
    ctx.beginPath();
    ctx.strokeStyle =
      i % markedUnit === 0
        ? 'rgba(200, 0, 0, 0.5)'
        : 'rgba(100, 100, 100, 0.5)';

    ctx.moveTo(0, i);
    ctx.lineTo(150, i);
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 150);
    ctx.stroke();
  }

  // Mark center
  ctx.beginPath();
  ctx.strokeStyle = 'rgba(200, 0, 0, 0.5)';
  ctx.arc(75, 75, 1, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = strokeStyle;
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

  makeAndDraw('rectangle-fill-clear-stroke', (canvas, ctx) => {
    ctx.fillRect(25, 25, 100, 100);
    ctx.clearRect(45, 45, 60, 60);
    ctx.strokeRect(50, 50, 50, 50);
  });

  makeAndDraw('draw-triangles-using-paths', (canvas, ctx) => {
    ctx.beginPath();
    ctx.moveTo(75, 50);
    ctx.lineTo(100, 75);
    ctx.lineTo(100, 25);
    ctx.fill();

    ctx.moveTo(25, 50);
    ctx.lineTo(50, 75);
    ctx.lineTo(50, 25);
    ctx.closePath(); // ctx.lineTo(25, 50);
    ctx.stroke();
  });

  const PI = Math.PI;

  // 円の描画は右端の点からスタートするっぽい。
  // 最後の boolean で時計回りかどうかを指定できる。
  // trueなら反時計周り (anticlockwise)。
  makeAndDraw('circles', (canvas, ctx) => {
    ctx.beginPath();
    ctx.arc(75, 75, 70, 0, PI * 2); // A circle
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(75, 75, 60, 0, PI * 1); // 半円
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(75, 75, 50, 0, PI * 1.5); // 右上以外
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(75, 75, 40, 0, PI * 1.5, true); // 右上のみ
    ctx.stroke();
  });

  makeAndDraw('smily', (canvas, ctx) => {
    drawGrid(ctx);

    ctx.beginPath();

    ctx.arc(75, 75, 50, 0, PI * 2); // Outer circle

    ctx.moveTo(75 + 35, 75);
    ctx.arc(75, 75, 35, 0, PI); // Mouth

    ctx.moveTo(65, 65);
    ctx.arc(60, 65, 5, 0, PI * 2); // Left eye (75 - 15)

    ctx.moveTo(95, 65);
    ctx.arc(90, 65, 5, 0, PI * 2); // Right eye (75 + 15)

    ctx.stroke();
  });
}

draw();
