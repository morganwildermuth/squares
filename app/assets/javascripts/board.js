

var Board = (function() {

  var buildRow = function(rowNum){
    return $('<div>', {class: 'row' + rowNum})
  }

  var buildColumn = function(rowNum, colNum){
    return $('<span>', {class: 'col' + colNum}).append(
            $('<a>', {class: 'cell','data-row': rowNum, 'data-col': colNum}).text(' open ')

          )
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
    updateCells: function() {

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
    $cell.text('taken')

    var row = $cell.attr('data-row')
    var col = $cell.attr('data-col')
    Sync.assignCell(row,col)
  }

}


$(document).ready(function(){
  Board.build()
  addClickListener()
})



