$( document ).ready(function() {
  addSubmitListener()
})

var Sync = (function() {

  var database = new Firebase('https://fb-squares.firebaseio.com/');
  var room = window.location.href.match(/\/([\w-]+)(?=\/signup)/)[0]

  return {
    addUserToFirebase: function(name) {
      this.name = name;
      database.child(room).child(name).set( {'payment': 'unpaid', 'locations' : 'none'} );
    },
    assignCell: function(row, col) {
      database.child(room).child(this.name).child('locations').child(row + '-' + col).set('true')
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
