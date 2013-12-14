var handleSubmitClick = function(){
	$('.create-board').on('click', function(){
		if($('.board-name').attr('hidden') === 'hidden'){
			showSettingInputs()
		} else {
			createBoard(getSettingInputs())
		}
	})
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
		var ref = new Firebase('https://fb-squares.firebaseIO.com')
		this.board = ref.push()
	}
}

var createBoard = function(attrs){
	sync.init()

	sync.board.child('name').set(attrs.boardName)
	sync.board.child('price').set(attrs.squarePrice)
}

$(document).ready(function(){
	handleSubmitClick()
})