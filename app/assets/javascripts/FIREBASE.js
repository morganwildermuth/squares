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

  return {
    addUserToFirebase: function() {
      roomNode.child('users').child(User.name).set( {'payment': 'unpaid', 'locations' : 'none'} );
    },
    assignCell: function(row, col) {
      roomNode.child('users').child(User.name).child('locations').child(row + '-' + col).set('true')
    },
    createRoomConnection: function() {
      roomNode = database.child(room)
      roomNode.on('child_added', Sync.updateBoard)
    },
    updateBoard: function(data){
      var transformedData = Sync.createBoardTransformation(data)
      // Board.updateDOM(transformedData)
    },
    createBoardTransformation: function(data){
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
