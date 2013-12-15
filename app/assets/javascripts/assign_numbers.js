var Randomizer = (function() {

  function pushUniqueRandomInt(min, max, arry) {
    var randInt = Math.floor(Math.random() * (max - min + 1) + min);
    while (arry.indexOf(randInt) != -1) {
      randInt = Math.floor(Math.random() * (max - min + 1) + min);
    }
    arry.push(randInt)
  }

  return {
    assignNumbers: function(min, max, arry) {
      var startingLength = arry.length
      for (var i = min; i <= (max - startingLength); i++) {
        pushUniqueRandomInt(min, max, arry)
      }
      return arry
    }
  }
})()

var buildRow = function(rowNum){
  return $('<div>', {class: 'row' + rowNum})
}

var buildCell = function(rowNum, colNum, txt){
  return $('<span>', {class: 'col' + colNum}).append(
          $('<a>', {class: 'header','data-row': rowNum, 'data-col': colNum}).text(txt)
        )
}

var SetNumbers = function() {
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
