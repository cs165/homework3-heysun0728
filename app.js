// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Changing the code in the constructor
// - Adding methods
// - Adding additional fields

class App {
  constructor() {
    //bind function
    this.contentClicked=this.contentClicked.bind(this);
    this.showResults=this.showResults.bind(this);
    this.showMenu=this.showMenu.bind(this);
    this.continue=this.continue.bind(this);
    this.restart=this.restart.bind(this);

    const resultElement = document.querySelector('#results');
    this.results = new ResultsScreen(resultElement,this.showMenu,this.continue,this.restart);

    const menuElement = document.querySelector('#menu');
    this.menu = new MenuScreen(menuElement,this.contentClicked);

    const mainElement = document.querySelector('#main');
    this.flashcards = new FlashcardScreen(mainElement,this.showResults);
  }
  contentClicked(words){ //show menu
    this.menu.hide();
    this.flashcards.show(words);
  }
  showResults(){ //show results
    this.flashcards.hide();
    this.results.show(this.flashcards.correct,this.flashcards.wrong);
  }
  showMenu(){
    this.results.hide();
    this.menu.show();
  }
  continue(){ //click the continue button
    this.results.hide();
    this.flashcards.show();
  }
  restart(){ //click the start over? button
    this.results.hide();
    this.flashcards.show(null,true);
  }
}
