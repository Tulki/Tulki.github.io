// Main game loop.
function draw() {
  mainScreen.clear();
  mainScreen.draw(ball);
  mainScreen.draw(paddle);
}

mainInterval = init();
paddle.init_paddle();
