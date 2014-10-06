var ball = {
  x: 150,
  y: 100,
  dx: -1,
  dy: 1,
  
  r: 10,
  
  draw: function(screen) {
    circle(screen.canvas, this.x, this.y, this.r);
	this.move(0+this.r, 0+this.r, screen.width-this.r, screen.height-this.r);
  },
  
  // Move the ball: this contains a failure condition if the ball misses the paddle.
  move: function(min_x, min_y, max_x, max_y) {
    if (this.x + this.dx < min_x || this.x + this.dx > max_x) {
	  this.dx = -1*this.dx;
    }
    if (this.y + this.dy < min_y) {
	  this.dy = -1*this.dy;
    }
	else if (this.y + this.dy > max_y) {
	  if (this.x + this.r > paddle.x && this.x - this.r < paddle.x + paddle.w) {
	    this.dy = -1*this.dy;
      }
	  // Game over if the ball misses the paddle.
	  else {
	    clearInterval(mainInterval);
	  }
    }
    
	this.x += this.dx;
	this.y += this.dy;
  }
};

var paddle = {
  x: 0,
  h: 0,
  w: 0,
  
  init_paddle: function() {
    this.x = mainScreen.width / 2;
    this.h = 10;
    this.w = 75;
  },
  
  draw: function(screen) {
    rect(screen.canvas, this.x, screen.height - this.h, this.w, this.h);
	this.move(0, screen.width-this.w);
  },
  
  move: function(min_x, max_x) {
    var dx = 0;
    if (key_rightDown) dx = 3;
	else if (key_leftDown) dx = -3;
    
	if (this.x + dx > max_x || this.x + dx < min_x) {
	  // do nothing
    }
	else {
	  this.x += dx;
    }
  }
};

var bricks = {
  rows: 5,
  cols: 5,
  total_width: 0,
  total_height: 0,
  brick_width: 0,
  brick_height: 0,
  
  init_bricks: function() {
    this.total_width = mainScreen.width;
	this.total_height = mainScreen.height / 3;
	// more stuff to do
  }
};
