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
  var theNumbers = []
  for (var i = 0; i <= 9; i++) {
    popNewRandomInt(theNumbers, getRandomInt, 0, 9)
  }
  return theNumbers
}

var buildRow = function(rowNum){
  return $('<div>', {class: 'row' + rowNum})
}

var buildCell = function(rowNum, colNum, txt){
  return $('<span>', {class: 'col' + colNum}).append(
          $('<a>', {class: 'header','data-row': rowNum, 'data-col': colNum}).text(txt)

        )
}

// ToDo: re-use code from board.js by recombining
var DisplayNumbers = function() {
  var row = buildRow(-1)
  var randValues = assignNumbers()

  $('.board').prepend(row)

  for (var colNum = 0; colNum <= 9; colNum++) {
    var col = buildCell(-1, colNum, randValues[colNum])
    row.prepend(col)
  }

  var morRands = assignNumbers()

  for (var rowNum = 0; rowNum <= 9; rowNum++) {
    var row = $('.board', {class: 'row' + rowNum})
    console.log(row)
    var cell = buildCell(rowNum, -1, morRands[rowNum])
    row.prepend(cell)
  }

}
