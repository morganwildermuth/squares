var loadUsers = function(){
	var db = new Firebase('https://fb-squares.firebaseio.com/')
	var room = window.location.href.match(/\/([\w-]+)(?=\/admin)/)[0]
	var price = 0

	db.child(room).child('settings').child ('price').once('value', function(snapshot){
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
	$('.pending-list').children().remove()
	$('.confirmed-list').children().remove()
}

var buildUserTable = function(usersData, price){
	$.each(usersData, function(name, data){
		var numSelectedSquares = 0

		if (data.locations != 'none') {
		  var numSelectedSquares = Object.keys(data.locations).length
    }

		if(data.payment === 'unpaid'){
			$('.pending-list').append(
				$('<div>', {class: name}).append(
					$('<button>', {class: 'remove'}).text('remove'),
					$('<p>').text(name + ' owes $' + price*numSelectedSquares),
					$('<button>', {class: 'confirm'}).text('confirm')
					)
				)
		} else {
			$('.confirmed-list').append(
				$('<div>', {class: name}).append(
					$('<p>').text(name + ' paid $' + price*numSelectedSquares)
					)
				)
		}
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

var setLink = function(){
	var link = window.location.href.match(/(^.+)(?=admin)/)[0] + 'signup'
	$('.board-link').text(link)
}

var bindScoreButtons = function(){
	$('.score').on('click', function(){
		var $self = $(this)
		if($self.attr('data-conf') === 'nfc'){
			var score = Number($self.attr('data-val')) + Number($('.nfc-score').text())
			updateScore({'nfc': score, 'afc': Number($('.afc-score').text())})
		} else {
			var score = Number($self.attr('data-val')) + Number($('.afc-score').text())
			updateScore({'afc': score, 'nfc': Number($('.nfc-score').text())})
		}
	})
}

var updateScore = function(scores){
	var db = new Firebase('https://fb-squares.firebaseio.com/')
	var room = window.location.href.match(/\/([\w-]+)(?=\/admin)/)[0]
	db.child(room).child('settings').child('score').set(scores)
}

var getScore = function(){
	var db = new Firebase('https://fb-squares.firebaseio.com/')
	var room = window.location.href.match(/\/([\w-]+)(?=\/admin)/)[0]

	db.child(room).child('settings').child('score').on('value', function(snapshot){
		var scores = snapshot.val()
		$('.nfc-score').text(scores.nfc)
		$('.afc-score').text(scores.afc)
	})
}

$(document).ready(function() {
	if( $('.board-link').length != 0 ) {
		loadUsers()
		setLink()
		getScore()
		bindScoreButtons()
	}
})
