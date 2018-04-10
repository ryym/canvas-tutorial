import {Util} from './util.js';

function draw() {
  const {
    makeAndDraw,
    drawGrid,
    assertCanvasIsSupported,
  } = new Util().generate();

  assertCanvasIsSupported();

  makeAndDraw('intersecting-rectangles', (ctx, canvas) => {
    ctx.fillStyle = 'rgb(200, 0, 0)';
    ctx.fillRect(10, 10, 50, 50);
    ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
    ctx.fillRect(30, 30, 50, 50);
  });

  makeAndDraw('rectangle-fill-clear-stroke', (ctx, canvas) => {
    ctx.fillRect(25, 25, 100, 100);
    ctx.clearRect(45, 45, 60, 60);
    ctx.strokeRect(50, 50, 50, 50);
  });

  makeAndDraw('draw-triangles-using-paths', (ctx, canvas) => {
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
  makeAndDraw('circles', (ctx, canvas) => {
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

  makeAndDraw('smily', (ctx, canvas) => {
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

  makeAndDraw('two-triangles', (ctx, canvas) => {
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
    (ctx, canvas) => {
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
  makeAndDraw('quadratic-curve-balloon', (ctx, canvas) => {
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
  makeAndDraw('cubic-curve-heart', (ctx, canvas) => {
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

  makeAndDraw('packman', (ctx, canvas) => {
    // drawGrid(ctx);

    // arcTo([本来なら角になる座標], [移動先], radius)
    const roundedRect = (ctx, x, y, width, height, radius) => {
      ctx.beginPath();
      ctx.moveTo(x, y + radius);

      // left top to left bottom
      ctx.lineTo(x, y + height - radius);
      ctx.arcTo(x, y + height, x + radius, y + height, radius);

      // left bottom to right bottom
      ctx.lineTo(x + width - radius, y + height);
      ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);

      // right bottom to right top
      ctx.lineTo(x + width, y + radius);
      ctx.arcTo(x + width, y, x + width - radius, y, radius);

      // right top to left top
      ctx.lineTo(x + radius, y);
      ctx.arcTo(x, y, x, y + radius, radius);

      ctx.stroke();
    };

    roundedRect(ctx, 12, 12, 150, 150, 15);
    roundedRect(ctx, 19, 19, 150, 150, 9);
    roundedRect(ctx, 53, 53, 49, 33, 10);
    roundedRect(ctx, 53, 119, 49, 16, 6);
    roundedRect(ctx, 135, 53, 49, 33, 10);
    roundedRect(ctx, 135, 119, 25, 49, 10);

    // packman
    ctx.beginPath();
    ctx.arc(37, 37, 13, PI / 7, -PI / 7);
    ctx.lineTo(31, 37);
    ctx.fill();

    // dots
    for (let i = 0; i < 8; i++) {
      ctx.fillRect(51 + i * 16, 35, 4, 4);
    }
    for (let i = 0; i < 6; i++) {
      ctx.fillRect(115, 35 + i * 16, 4, 4);
    }
    for (let i = 0; i < 8; i++) {
      ctx.fillRect(51 + i * 16, 99, 4, 4);
    }

    /* enemy (?) */

    ctx.beginPath();
    ctx.moveTo(83, 116);

    // left line
    ctx.lineTo(83, 102);

    // head
    ctx.bezierCurveTo(83, 94, 89, 88, 97, 88);
    ctx.bezierCurveTo(105, 88, 111, 94, 111, 102);

    // right line
    ctx.lineTo(111, 116);

    // ぎざぎざ
    ctx.lineTo(106.333, 111.333);
    ctx.lineTo(101.666, 116);
    ctx.lineTo(97, 111.333);
    ctx.lineTo(92.333, 116);
    ctx.lineTo(87.666, 111.333);
    ctx.lineTo(83, 116);

    ctx.fill();

    ctx.fillStyle = 'white';
    ctx.beginPath();

    // left eye
    ctx.moveTo(91, 96);
    ctx.bezierCurveTo(88, 96, 87, 99, 87, 101);
    ctx.bezierCurveTo(87, 103, 88, 106, 91, 106);
    ctx.bezierCurveTo(94, 106, 95, 103, 95, 101);
    ctx.bezierCurveTo(95, 99, 94, 96, 91, 96);

    // right eye
    ctx.moveTo(103, 96);
    ctx.bezierCurveTo(100, 96, 99, 99, 99, 101);
    ctx.bezierCurveTo(99, 103, 100, 106, 103, 106);
    ctx.bezierCurveTo(106, 106, 107, 103, 107, 101);
    ctx.bezierCurveTo(107, 99, 106, 96, 103, 96);
    ctx.fill();

    ctx.fillStyle = 'black';
    ctx.beginPath();

    // left eye (black)
    ctx.arc(101, 102, 2, 0, Math.PI * 2, true);

    // right eye (black)
    ctx.arc(89, 102, 2, 0, Math.PI * 2, true);
    ctx.fill();
  });

  // Path2D というちょっと新し目のAPIを使うとコードの再利用がしやすい
  makeAndDraw('path2d', (ctx, canvas) => {
    const rect = new Path2D();
    rect.rect(10, 10, 50, 50);

    const circle = new Path2D();
    circle.arc(100, 35, 25, 0, PI * 2);

    ctx.stroke(rect);
    ctx.fill(circle);

    // SVGパスも使える。
    const svgPath = new Path2D('M80 80 h 40 v 40 h -40 Z');
    ctx.stroke(svgPath);
  });
}

draw();
