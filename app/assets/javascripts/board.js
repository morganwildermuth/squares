var Board = (function() {

  var buildRow = function(rowNum){
    return $('<div>', {class: 'row' + rowNum})
  }

  var buildCell = function(rowNum, colNum){
    if (rowNum === -1 && colNum === -1) {
      return $('<a>', {class: 'blank','data-row': rowNum, 'data-col': colNum})
    }
    if (rowNum === -1 || colNum === -1) {
      return $('<a>', {class: 'header','data-row': rowNum, 'data-col': colNum})
    }
    return $('<a>', {class: 'cell','data-row': rowNum, 'data-col': colNum}).text(' open ')
  }

  var updateCell = function(name,location) {
    var row = location[0]
    var col = location[2]
    var $cell = $('.cell[data-row=' + row + '][data-col=' + col + ']')
    $cell.addClass('taken')
    $cell.text(name)
  }

  var setHeaders = function(headerCells,headers) {
      $.each(headerCells,function(index,cell) {
        cell.innerText = headers[index]
      })
    }


  return {
    build: function(){
      for (var rowNum = -1; rowNum <= 9; rowNum++) {
        var row = buildRow(rowNum)
        $('.board').append(row)

        for (var colNum = -1; colNum <= 9; colNum++) {
          var col = buildCell(rowNum, colNum)
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
    },
    displayAllHeaders: function(row,col) {
      var rowCells = $('.header[data-row=-1]')
      var colCells = $('.header[data-col=-1]')
      setHeaders(rowCells,row)
      setHeaders(colCells,col)
    },
    resetBoard: function() {
      $('.cell').text('open').removeClass('taken')
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



