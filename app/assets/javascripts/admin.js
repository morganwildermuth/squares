var loadUsers = function(){
	var db = new Firebase('https://fb-squares.firebaseio.com/')
	var room = window.location.href.match(/\/([\w-]+)(?=\/admin)/)[0]
	var price = 0

	db.child(room).child('settings').child('price').once('value', function(snapshot){
		price = snapshot.val()
	})

	db.child(room).child('users').on('value', function(snapshot){
		clearUserTable()
		buildUserTable(snapshot.val(), price)
		bindConfirmButtons()
		bindRemoveButtons()
	})
}

var clearUserTable = function(){
	$('.user-list').children().remove()
}

var buildUserTable = function(usersData, price){
	$.each(usersData, function(name, data){
		var numSelectedSquares = Object.keys(data.locations).length

		$('.user-list').append(
			$('<div>', {class: name}).append(
				$('<button>', {class: 'remove'}).text('remove'),
				$('<p>').text(name + ' owes $' + price*numSelectedSquares),
				$('<button>', {class: 'confirm'}).text('confirm')
				)
			)
	})
}

var bindConfirmButtons = function(){
	$('.confirm').on('click', function(){
		var user = $(this).closest('div').attr('class')
		confirmUserPaid(user)
	})
}

var confirmUserPaid = function(user){
	var db = new Firebase('https://fb-squares.firebaseio.com/')
	var room = window.location.href.match(/\/([\w-]+)(?=\/admin)/)[0]
	db.child(room).child('users').child(user).child('payment').set('paid')
}

var bindRemoveButtons = function(){
	$('.remove').on('click', function(){
		var user = $(this).closest('div').attr('class')
		removeUser(user)
	})
}

var removeUser = function(user){
	var db = new Firebase('https://fb-squares.firebaseio.com/')
	var room = window.location.href.match(/\/([\w-]+)(?=\/admin)/)[0]
	db.child(room).child('users').child(user).remove()
}

$(document).ready(function(){
	loadUsers()
})
