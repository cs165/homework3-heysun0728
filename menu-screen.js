// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class MenuScreen {
  constructor(containerElement,onClickedCallback) {
    this.containerElement = containerElement;
    this.onClickedCallback = onClickedCallback;
    this.onClick = this.onClick.bind(this);
    //show menu item
    //create div
    var contents=[];
    for(var index in FLASHCARD_DECKS){
        //console.log(FLASHCARD_DECKS[index])
        contents[index]=new MenuContent(
          FLASHCARD_DECKS[index]["title"],
          FLASHCARD_DECKS[index]["words"],
          this.onClick
        )
    }
  }

  show() {
    this.containerElement.classList.remove('inactive');
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }

  onClick = function(words){
    //console.log("menu contentOnClick ");
    this.onClickedCallback(words);
  }
}
