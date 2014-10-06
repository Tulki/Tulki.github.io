
function circle(canvas, x, y, r) {
  canvas.beginPath();
  canvas.arc(x, y, r, 0, Math.PI*2, true);
  canvas.closePath();
  canvas.fill();
}

function rect(canvas, x, y, w, h) {
  canvas.beginPath();
  canvas.rect(x,y,w,h);
  canvas.closePath();
  canvas.fill();
}
