function draw() {
  const canvas = document.getElementById('tutorial');
  if (!canvas.getContext) {
    console.log('Canvas not supported');
    return;
  }
  const ctx = canvas.getContext('2d');
  console.log(ctx);
}

draw();
