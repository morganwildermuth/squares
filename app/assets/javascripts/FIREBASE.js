$( document ).ready(function() {
  addSubmitListener()
  // Sync.addChangeCallback()
})

var Sync = (function() {

  var database = new Firebase('https://fb-squares.firebaseio.com/');
  var room = window.location.href.match(/\/([\w-]+)(?=\/signup)/)[0]

  // var getCells = function(database) {
  //   return 'this is working'
  // };

  return {
    addUserToFirebase: function(name) {
      this.name = name;
      database.child(room).child(name).set( {'payment': 'unpaid', 'locations' : 'none'} );
    },
    assignCell: function(row, col) {
      database.child(room).child(this.name).child('locations').child(row + '-' + col).set('true')
    },
    // addChangeCallback: function() {
    //   var cellArray = getCells(database)
    //   database.on('child_added',Board.updateCells)
    // }
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





