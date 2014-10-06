var key_rightDown = false;
var key_leftDown = false;

function onKeyDown(evt) {
  if (evt.keyCode == 39) key_rightDown = true;
  else if (evt.keyCode == 37) key_leftDown = true;
}

function onKeyUp(evt) {
  if (evt.keyCode == 39) key_rightDown = false;
  else if (evt.keyCode == 37) key_leftDown = false;
}

$(document).keydown(onKeyDown);
$(document).keyup(onKeyUp);
