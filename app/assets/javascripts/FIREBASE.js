$( document ).ready(function() {
  addSubmitListener()
})


var Sync = (function() {

  var database = new Firebase('https://fb-squares.firebaseio.com/');
  var room = window.location.href.match(/\/([\w-]+)(?=\/signup)/)[0]

  return {
    addUserToFirebase: function(name) {
      database.child(room).child(name).set( {'payment': 'unpaid', 'locations' : 'none'} );
    }
  }

})()

var addSubmitListener = function() {
  $('#input').on('click',addUser)
}

var addUser = function() {
  var $userName = $('#textfield').val()
  Sync.addUserToFirebase($userName)
  console.log('adds to firebase')
  console.log('adds to dom')
}





