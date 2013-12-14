$( document ).ready(function() {
  addSubmitListener()
})

var Sync = (function() {

  var database = new Firebase('https://fb-squares.firebaseio.com/');
  var room = window.location.href.match(/\/([\w-]+)(?=\/signup)/)[0]

  return {
    addUserToFirebase: function() {
      database.child(room).child('users').child(User.name).set( {'payment': 'unpaid', 'locations' : 'none'} );
    },
    assignCell: function(row, col) {
      database.child(room).child('users').child(User.name).child('locations').child(row + '-' + col).set('true')
    },
  }

})()

var addSubmitListener = function() {
  $('#input').on('click',addUser)
}

var addUser = function() {
  var userName = $('#textfield').val()
  User.setName(userName)
  Sync.addUserToFirebase(userName)
}
