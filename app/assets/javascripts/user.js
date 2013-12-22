var User = {
  setName: function(textInput) {
    this.name = textInput;
  },
  establishColor: function(data) {
    var name = User.name
    var counter = data.val().settings.colors
    var userColor = data.val().users[name].color
    if (!userColor) {
      userColor = "color" + counter
      Sync.setUserColor(counter)
      counter += 1
      Sync.setCounter(counter)

    }
    User.color = userColor
  }
}