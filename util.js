const makeCanvasMaker = (container, {defaultWidth, defaultHeight}) => (
  name,
  draw,
  {width = defaultWidth, height = defaultHeight} = {},
) => {
  const canvas = document.createElement('canvas');
  canvas.dataset.name = name;
  canvas.width = width;
  canvas.height = height;
  container.appendChild(canvas);
  draw(canvas, canvas.getContext('2d'));
};

const makeGridDrawer = ({defaultWidth, defaultHeight}) => (
  ctx,
  {unit = 10, width = defaultWidth, height = defaultHeight} = {},
) => {
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
};

function assertCanvasIsSupported() {
  if (!document.createElement('canvas').getContext) {
    throw new Error('Canvas not supported');
  }
}

export class Util {
  constructor({defaultWidth = 150, defaultHeight = 150} = {}) {
    this.defaultWidth = defaultWidth;
    this.defaultHeight = defaultHeight;
  }

  generate({containerSelector = '.canvas-container'} = {}) {
    const canvasContainer = document.querySelector(containerSelector);
    if (!canvasContainer) {
      throw new Error('canvas container not found');
    }

    const {defaultWidth, defaultHeight} = this;
    return {
      makeAndDraw: makeCanvasMaker(canvasContainer, {
        defaultWidth,
        defaultHeight,
      }),
      drawGrid: makeGridDrawer({defaultWidth, defaultHeight}),
      assertCanvasIsSupported,
    };
  }
}
