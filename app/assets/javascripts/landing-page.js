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

	sync.board.child('settings').child('name').set(attrs.boardName)
	sync.board.child('settings').child('price').set(attrs.squarePrice)
	sync.board.child('settings').child('score').set( {'nfc': '0', 'afc': '0'} )
}

var boardReady = function(callback){
	sync.board.on('child_added', function(snapshot){
		callback()
	})
}

$(document).ready(function(){
	handleSubmitClick()
})