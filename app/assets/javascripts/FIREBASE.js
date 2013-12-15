$( document ).ready(function() {
  addSubmitListener()
  if( $('.board').length > 0 ) {
    Sync = createSync()
    Sync.createRoomConnection()
   }
})

var createSync = function() {

  var database = new Firebase('https://fb-squares.firebaseio.com/');
  var room = window.location.href.match(/\/([\w-]+)(?=\/signup)/)[0]
  var roomNode

  var createBoardTransformation = function(data){
      var results = {}
      var firebaseObject = data.val()
      var firebaseKeys = Object.keys(firebaseObject)
      for(i=0;i<firebaseKeys.length; i++) {
        var user = firebaseKeys[i]
        if (firebaseObject[user]['locations'].length != 4){
          var locations = Object.keys(firebaseObject[user]['locations'])
          results[user] = locations
        }
      }
      return results
  }

  var createColorsObject = function(usersObject) {
    var users = usersObject.val()
    var names = Object.keys(users)
    var results = {}

    for(i=0;i<names.length;i++) {
      var name = names[i]
      var color = users[name].color
      results[name] = color
    }
    return results
  }

  return {
    addUserToFirebase: function() {
      roomNode.child('users').child(User.name).set( {'payment': 'unpaid', 'locations' : 'none'} );
    },
    assignCell: function(row, col) {
      roomNode.child('users').child(User.name).child('locations').child(row + '-' + col).set('true')
    },
    createRoomConnection: function() {
      roomNode = database.child(room)
      roomNode.on('value', function(data) {
        var usersObject = data.child('users')
        Sync.updateBoard(usersObject)
        Sync.checkForCompletion(data, usersObject)
      })
    },
    updateBoard: function(usersObject){
      Board.resetBoard()
      var transformedData = createBoardTransformation(usersObject)
      Board.updateDOM(transformedData)
    },
    checkForCompletion: function(database,usersObject) {
      var locData = createBoardTransformation(usersObject)
      var count = 0
      var users = Object.keys(locData)
      for(i=0;i<users.length;i++) {
        user = users[i]
        count += locData[user].length
      }
      if(count === 100) {
        var row = database.val().settings.headers.rows
        var col = database.val().settings.headers.cols
        Board.displayAllHeaders(row,col)


        $('.header').addClass('cell')
        $('.blank').addClass('cell')
      }
    }
  }

}

var addSubmitListener = function() {
  $('#input').on('click',addUser)
}

var addUser = function() {
  var userName = $('#textfield').val()
  User.setName(userName)
  Sync.addUserToFirebase(userName)
}
