const canvasContainer = document.querySelector('.canvas-container');
if (!canvasContainer) {
  throw new Error('canvas container not found');
}

function makeAndDraw(id, drawer, {width = 150, height = 150} = {}) {
  const canvas = document.createElement('canvas');
  canvas.id = id;
  canvas.width = width;
  canvas.height = height;
  canvasContainer.appendChild(canvas);
  drawer(canvas, canvas.getContext('2d'));
}

function drawGrid(ctx, {unit = 10, width = 150, height = 150} = {}) {
  const {strokeStyle} = ctx;

  const markedUnit = unit * 5;
  const maxSize = Math.max(width, height);
  for (let i = unit; i < maxSize; i += unit) {
    ctx.beginPath();
    ctx.strokeStyle =
      i % markedUnit === 0
        ? 'rgba(200, 0, 0, 0.5)'
        : 'rgba(100, 100, 100, 0.5)';

    ctx.moveTo(0, i);
    ctx.lineTo(maxSize, i);
    ctx.moveTo(i, 0);
    ctx.lineTo(i, maxSize);
    ctx.stroke();
  }

  // Mark center
  ctx.beginPath();
  ctx.strokeStyle = 'rgba(200, 0, 0, 0.5)';
  ctx.arc(width / 2, height / 2, 1, 0, Math.PI * 2);
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

  makeAndDraw('two-triangles', (canvas, ctx) => {
    drawGrid(ctx);

    ctx.beginPath();
    ctx.moveTo(20, 20);
    ctx.lineTo(100, 20);
    ctx.lineTo(20, 100);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(110, 110);
    ctx.lineTo(110, 30);
    ctx.lineTo(30, 110);
    ctx.closePath();
    ctx.stroke();
  });

  makeAndDraw(
    'circles2',
    (canvas, ctx) => {
      const radius = 20;
      const startAngle = 0;
      for (let a = 0; a < 4; a++) {
        for (let b = 0; b < 3; b++) {
          ctx.beginPath();
          const x = 25 + b * 50;
          const y = 25 + a * 50;
          const endAngle = PI + PI * b / 2;
          const anticlockwise = a % 2 !== 0;
          ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);

          a < 2 ? ctx.stroke() : ctx.fill();
        }
      }
    },
    {width: 150, height: 200},
  );

  // 今は全然わからない。たぶん普通はイラストソフトでもっとインタラクティブに
  // 作成するものでは。
  makeAndDraw('quadratic-curve-balloon', (canvas, ctx) => {
    drawGrid(ctx);
    ctx.beginPath();
    ctx.moveTo(75, 25);
    ctx.quadraticCurveTo(25, 25, 25, 62.5);
    ctx.quadraticCurveTo(25, 100, 50, 100);
    ctx.quadraticCurveTo(50, 120, 30, 125);
    ctx.quadraticCurveTo(60, 120, 65, 100);
    ctx.quadraticCurveTo(125, 100, 125, 62.5);
    ctx.quadraticCurveTo(125, 25, 75, 25);
    ctx.stroke();
  });
  makeAndDraw('cubic-curve-heart', (canvas, ctx) => {
    drawGrid(ctx);
    ctx.beginPath();
    ctx.moveTo(75, 40);
    ctx.bezierCurveTo(75, 37, 70, 25, 50, 25);
    ctx.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
    ctx.bezierCurveTo(20, 80, 40, 102, 75, 120);
    ctx.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
    ctx.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
    ctx.bezierCurveTo(85, 25, 75, 37, 75, 40);
    ctx.fill();
  });
}

draw();
