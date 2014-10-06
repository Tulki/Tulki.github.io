var mainScreen = {
  canvas: null,
  width: 0,
  height: 0,
  
  draw: function(object) {
    object.draw(this);
  },
  
  clear: function() {
    this.canvas.clearRect(0, 0, this.width, this.height);
  }
};

function init() {
  mainScreen.canvas = $('#mainScreen')[0].getContext("2d");
  mainScreen.width = $("#mainScreen").width();
  mainScreen.height = $("#mainScreen").height();
  return setInterval(draw, 10);
}

function clear() {
  mainScreen.clear();
}
