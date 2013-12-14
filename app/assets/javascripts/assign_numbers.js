function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// ToDo: Compress the while and if into a single conditional
function popNewRandomInt(arrG, func, min, max) {
  var length0 = arrG.length
  while (arrG.length < length0 + 1) {
    var randM = func(min, max)
    if ( arrG.indexOf(randM) < 0) {
      arrG.push(randM)
    }
  }
}

var assignNumbers = function() {
  var across = []
  var down = []
  for (var i = 0; i <= 9; i++) {
    popNewRandomInt(across, getRandomInt, 0, 9)
    popNewRandomInt(down, getRandomInt, 0, 9)
  }
  console.log( across )
  console.log( down )
}
