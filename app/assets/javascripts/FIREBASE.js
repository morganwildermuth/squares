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
