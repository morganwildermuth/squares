var handleSubmitClick = function(){
	$('.create-board').on('click', function(){
		if($('.board-name').attr('hidden') === 'hidden'){
			showSettingInputs()
		} else {
			createBoard(getSettingInputs())
			boardReady(goToAdminPage)
		}
	})
}

var goToAdminPage = function(){
	location.href='/' + sync.board.name() + '/admin'
}

var showSettingInputs = function(){
	$('.board-name').removeAttr('hidden')
	$('.square-price').removeAttr('hidden')
}

var getSettingInputs = function(){
	return {
		boardName: $('.board-name').val(),
		squarePrice: $('.square-price').val()
	}
}

var sync = {
	init: function(){
		var ref = new Firebase('https://fb-squares.firebaseIO.com/')
		this.board = ref.push()
	}
}

var createBoard = function(attrs){
	sync.init()

	sync.board.child('users').set('')
	var settings = sync.board.child('settings')
	settings.child('name').set(attrs.boardName)
	settings.child('price').set(attrs.squarePrice)
	settings.child('score').set( {'nfc': '0', 'afc': '0'} )
	settings.child('headers').child('cols').set(Randomizer.assignNumbers())
	settings.child('headers').child('rows').set(Randomizer.assignNumbers())
	settings.child('colors').set(1)
}

var boardReady = function(callback){
	sync.board.on('child_added', function(snapshot){
		callback()
	})
}

$(document).ready(function(){
	handleSubmitClick()
})