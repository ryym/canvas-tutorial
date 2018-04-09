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
}

draw();
