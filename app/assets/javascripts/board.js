var Board = (function() {

  var buildRow = function(rowNum){
    return $('<div>', {class: 'row' + rowNum})
  }

  var buildColumn = function(rowNum, colNum){
    return $('<span>', {class: 'col' + colNum}).append(
            $('<a>', {class: 'cell','data-row': rowNum, 'data-col': colNum}).text(' open ')

          )
  }

  var updateCell = function(name,location) {
    var row = location[0]
    var col = location[2]
    var $cell = $('.cell[data-row=' + row + '][data-col=' + col + ']')
    $cell.addClass('taken')
    $cell.text(name)
  }

  return {
    build: function(){
      for (var rowNum = 0; rowNum <= 9; rowNum++) {
        var row = buildRow(rowNum)
        $('.board').append(row)

        for (var colNum = 0; colNum <= 9; colNum++) {
          var col = buildColumn(rowNum, colNum)
          row.append(col)
        }
      }
    },
    updateDOM: function(locationsObject) {
      var names = Object.keys(locationsObject)
      for(i=0;i<names.length;i++) {
        var name = names[i]
        var locations = locationsObject[name]
        for(m=0;m<locations.length;m++) {
          updateCell(name,locations[m])
        }
      }
    }
  }
})()

var addClickListener = function() {
  $('.cell').on('click',selectCell)
}

var selectCell = function(clickEvent) {
  var $cell = $( clickEvent.target )
  if ( !$cell.hasClass('taken') ) {

    $cell.addClass('taken')
    $cell.text(User.name)

    var row = $cell.attr('data-row')
    var col = $cell.attr('data-col')
    Sync.assignCell(row,col)
  }

}


$(document).ready(function(){
  Board.build()
  addClickListener()
})



