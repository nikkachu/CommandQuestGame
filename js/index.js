var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var KEY_LEFT = 37;
var KEY_UP = 38;
var KEY_RIGHT = 39;
var KEY_DOWN = 40;

var $map = document.querySelector('#map');
var $game = document.querySelector('#game');
var $log = document.querySelector('#log');
var $data = document.querySelector('#data');
var map = $map.innerHTML.trim();
var lines = map.split(/[\n\r]+/);
var data = JSON.parse($data.innerHTML);

var centerX = lines[0].length / 2;
var centerY = lines.length / 2;

var _$map$getAttribute$sp = $map.getAttribute('data-player-start').split(',').map(function (a) {
  return parseInt(a, 10);
}),
    _$map$getAttribute$sp2 = _slicedToArray(_$map$getAttribute$sp, 2),
    playerX = _$map$getAttribute$sp2[0],
    playerY = _$map$getAttribute$sp2[1];

var layers = [];

// After the first layer, remove dots
var mapWithoutPlayer = map.replace(/[.@/~]/g, ' ');

// Reset the canvas
$game.innerHTML = '';

// Draw the layers
for (var i = 0; i < 3; i++) {
  var $layer = document.createElement('div');
  $layer.classList.add('layer');
  $layer.innerHTML = i === 0 ? map : mapWithoutPlayer;

  // We could just use opacity, but font colour gives us a bit more flexibility
  // $layer.style.opacity = 1 - (0.3 * (2 - i));
  $layer.style.color = 'hsla(0, 0%, 100%, ' + (1 - 0.3 * (2 - i)) + ')';

  layers.push($layer);
  $game.appendChild($layer);
}

function debounce(callback, wait) {
  var timeout;
  return function () {
    var context = this,
        args = arguments;
    var later = function later() {
      timeout = null;
    };
    var callNow = !timeout;
    if (!timeout) {
      callback.apply(context, args);
      timeout = setTimeout(later, wait);
    }
  };
}

function drawPlayer() {
  // Add the player to the bottom layer
  var linesWithPlayer = lines.join('\n').split('\n');
  linesWithPlayer[playerY] = lines[playerY].substr(0, playerX) + '<span class="actor-player">@</span>' + lines[playerY].substr(playerX + 1);
  layers[0].innerHTML = linesWithPlayer.join('\n');

  // Update transforms
  for (var _i in layers) {
    var $layer = layers[_i];
    $layer.style.transform = 'scale(' + (1 + 0.00 * _i) + ') translateX(' + (centerX - playerX) + 'ch) translateY(' + (centerY - playerY) + 'em)';
  }
}

function terrainAt(x, y) {
  return lines[y].substr(x, 1);
}

function move(xRel, yRel) {
  var targetX = playerX + xRel;
  var targetY = playerY + yRel;
  var newTerrain = terrainAt(targetX, targetY);
  if (newTerrain === '.' || newTerrain === '/') {
    playerX += xRel;
    playerY += yRel;
    drawPlayer();
  } else if (newTerrain === '@') {
    var actor = data.actors.find(function (actor) {
      return actor.x === targetX && actor.y === targetY;
    });
    $log.innerHTML = actor.message;
  }
}

document.body.addEventListener('keydown', debounce(function (e) {
  var key = parseInt(e.which, 10);
  if (key === KEY_LEFT) move(-1, 0);
  if (key === KEY_RIGHT) move(1, 0);
  if (key === KEY_UP) move(0, -1);
  if (key === KEY_DOWN) move(0, 1);
}, 100), false);

drawPlayer();
function exercise(correctValue) {
  // set variables
  var submit = $(".submit");
  var field = $("input.field");
  // give click event to submit button
  submit.click(function () {
    // remove stats element
    $(".stats").remove();
    // store answer status in variables
    var correctStats = '<div class="stats">Correct!</div>';
    var incorrectStats = '<div class="stats">Try Again.</div>';
    // target field value
    var value = field.val();
    // pass correct answer through parameters
    answerValue = correctValue;
    // check status
    var checkStatus = false;
    // set condition
    if (value === answerValue) {
      // show the correct answer
      $("body").append(correctStats);
      checkStatus = true;
    } else {
      // show the incorrect answer
      $("body").append(incorrectStats);
    }
    // set colour for the answers
    field.css({ 'background': checkStatus ? 'green' : 'red', 'color': '#fff' });
    //field.attr('disabled', true);
  });
}
// set the correct value
var answer = "img";
// execute the function
exercise(answer);

/*

function exercise(correctValue) {
  // set variables
  var submit = $(".submit");
  var field = $("input.field");
  // give click event to submit button
  submit.click(function() {
    // remove stats element
    $(".stats").remove();   
    // store answer status in variables
    var correctStats = '<div class="stats">Correct!</div>';
    var incorrectStats = '<div class="stats">Try Again.</div>';
    // target field value
    var value = field.val();
    // pass correct answer through parameters
    answerValue = correctValue;
    // check status
    var checkStatus = false;
    // set condition
    if (value === answerValue) {
      // show the correct answer
      $("body").append(correctStats);
      checkStatus = true;      
    } else {
      // show the incorrect answer
      $("body").append(incorrectStats);      
    }    
    // set colour for the answers
    field.css({'background': checkStatus ? 'green' : 'red', 'color': '#fff' });
    //field.attr('disabled', true);
  });
}
// set the correct value
var answer = "img";
// execute the function
exercise(answer);
*/
