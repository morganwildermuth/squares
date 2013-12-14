$( document ).ready(function() {
  addSubmitListener()
  addInitListener()
})

var Sync = (function() {

  var database = new Firebase('https://fb-squares.firebaseio.com/');
  var room = window.location.href.match(/\/([\w-]+)(?=\/signup)/)[0]
  var username

  return {
    addUserToFirebase: function(name) {
      username = name;
      database.child(room).child(name).set( {'payment': 'unpaid', 'locations' : 'none'} );
    },
    assignCell: function(row, col) {
      database.child(room).child(username).child('locations').child(row + '-' + col).set('true')
    },
  }

})()

var addSubmitListener = function() {
  $('#input').on('click',addUser)
}

var addUser = function() {
  var $userName = $('#textfield').val()
  Sync.addUserToFirebase($userName)
}

var addInitListener = function() {
  $('#assign').on('click',DisplayNumbers.build())
}
