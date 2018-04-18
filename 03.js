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

  makeAndDraw('rgba-gradient', ctx => {
    const colors = [
      'rgb(255, 221, 0)',
      'rgb(102, 204, 0)',
      'rgb(0, 153, 255)',
      'rgb(255, 51, 0)',
    ];
    const layerHeight = 150 / colors.length;

    // Background
    colors.forEach((color, i) => {
      ctx.fillStyle = color;
      ctx.fillRect(0, i * layerHeight, 150, layerHeight);
    });

    const width = (150 - 10) / 10;
    for (let i = 0; i < 10; i++) {
      ctx.fillStyle = `rgba(255, 255, 255, ${(i + 1) / 10})`;
      for (let j = 0; j < 4; j++) {
        ctx.fillRect(
          i * width + 5,
          j * layerHeight + 5,
          width,
          layerHeight - 10,
        );
      }
    }
  });

  makeAndDraw('line-width', ctx => {
    for (let i = 0; i < 10; i++) {
      ctx.lineWidth = 1 + i;
      ctx.beginPath();
      ctx.moveTo(5 + i * 14, 5);
      ctx.lineTo(5 + i * 14, 140);
      ctx.stroke();
    }
  });

  // 同じ 1px width でも見た目が違う。
  // 前者がぼやけて見えるのは、実際には 2px の幅があるため。
  // 1px 幅の線をピクセルグリッドに沿って引く場合、
  // グリッド線の左右を 0.5px だけ塗る必要があるが、
  // それはできないから線に含まれない外側の 0.5px は
  // 薄い色を塗る事で擬似的に 1px の線としている。
  // そのためグリッドに沿わず x が _.5 となる位置で
  // 1px の線を引くとちょうど 1px の線が引ける。
  makeAndDraw('line-width2', ctx => {
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(5, 5);
    ctx.lineTo(5, 140);
    ctx.moveTo(10.5, 5);
    ctx.lineTo(10.5, 140);
    ctx.stroke();

    // 2px の線ならグリッドに沿えば両側のピクセルがきれいに塗られる。
    // _.5 を中心に引くと逆にぼやける。
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(20, 5);
    ctx.lineTo(20, 140);
    ctx.moveTo(25.5, 5);
    ctx.lineTo(25.5, 140);
    ctx.stroke();
  });

  makeAndDraw('line-caps', ctx => {
    // guides
    ctx.strokeStyle = '#09f';
    ctx.beginPath();
    ctx.moveTo(10, 10);
    ctx.lineTo(140, 10);
    ctx.moveTo(10, 140);
    ctx.lineTo(140, 140);
    ctx.stroke();

    ctx.strokeStyle = '#000';

    ['butt', 'round', 'square'].forEach((lineCap, i) => {
      ctx.lineWidth = 15;
      ctx.lineCap = lineCap;
      ctx.beginPath();
      ctx.moveTo(25 + i * 50, 10);
      ctx.lineTo(25 + i * 50, 140);
      ctx.stroke();
    });
  });

  makeAndDraw('line-joins', ctx => {
    ctx.lineWidth = 10;
    ['round', 'bevel', 'miter'].forEach((lineJoin, i) => {
      ctx.lineJoin = lineJoin;
      ctx.beginPath();
      ctx.moveTo(-5, 10 + i * 40);
      ctx.lineTo(35, 50 + i * 40);
      ctx.lineTo(75, 10 + i * 40);
      ctx.lineTo(115, 50 + i * 40);
      ctx.lineTo(155, 10 + i * 40);
      ctx.stroke();
    });
  });

  makeAndDraw('linear-gradient', ctx => {
    // グラデーションの位置とサイズ、方向を指定する。これなら (0,0)->(0,150)。
    // 例えば(0,0)->(150,150) にすると右下方向のグラデーションになる。
    const lingrad = ctx.createLinearGradient(0, 0, 0, 150);

    lingrad.addColorStop(0, '#00abeb');
    lingrad.addColorStop(0.5, '#fff');
    lingrad.addColorStop(0.5, '#26c000');
    lingrad.addColorStop(1, '#fff');

    // CSS でいうと background-image にセットするような感じか。
    ctx.fillStyle = lingrad;
    ctx.fillRect(10, 10, 130, 130);

    const lingrad2 = ctx.createLinearGradient(0, 50, 0, 90);
    lingrad2.addColorStop(0.5, '#000');
    lingrad2.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.strokeStyle = lingrad2;
    ctx.strokeRect(50, 50, 50, 50);
  });

  makeAndDraw('radial-gradient', ctx => {
    let radgrad = ctx.createRadialGradient(75, 75, 10, 75, 75, 75);
    radgrad.addColorStop(0, '#f00');
    radgrad.addColorStop(1, '#fff');

    ctx.fillStyle = radgrad;
    ctx.fillRect(0, 0, 150, 150);
  });

  makeAndDraw('radial-gradient2', ctx => {
    const rad = (radgrad, colorStops) => {
      colorStops.forEach(args => {
        radgrad.addColorStop(...args);
      });
      ctx.fillStyle = radgrad;
      ctx.fillRect(0, 0, 150, 150);
    };

    rad(ctx.createRadialGradient(0, 150, 50, 0, 140, 90), [
      [0, '#f4f201'],
      [0.8, '#e4c700'],
      [1, 'rgba(228, 199, 0, 0)'],
    ]);

    rad(ctx.createRadialGradient(95, 15, 15, 102, 20, 40), [
      [0, '#00c9ff'],
      [0.8, '#00b5e2'],
      [1, 'rgba(0, 201, 255, 0)'],
    ]);

    rad(ctx.createRadialGradient(105, 105, 20, 112, 120, 50), [
      [0, '#ff5f98'],
      [0.8, '#ff0188'],
      [1, 'rgba(255, 1, 136, 0)'],
    ]);

    rad(ctx.createRadialGradient(45, 45, 10, 52, 50, 30), [
      [0, '#a7d30c'],
      [0.9, 'rgb(1, 159, 98)'],
      [1, 'rgba(1, 159, 98, 0)'],
    ]);
  });
}

draw();
