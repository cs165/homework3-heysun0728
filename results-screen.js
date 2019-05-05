// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class ResultsScreen {
  constructor(containerElement,showMenuCallback,continueCallback,restartCallback) {
    this.containerElement = containerElement;
    this.showMenuCallback = showMenuCallback;
    this.continueCallback = continueCallback;
    this.restartCallback = restartCallback;
    this.show = this.show.bind(this);
    this.showMenu = this.showMenu.bind(this);
    this.continue = this.continue.bind(this);
  }

  show(correct, wrong) {
    this.containerElement.classList.remove('inactive');
    //setting the view
    var percentSpan=this.containerElement.querySelector('.percent');
    var correctSpan=this.containerElement.querySelector('.correct');
    var wrongSpan=this.containerElement.querySelector('.incorrect');
    var continueBtn=this.containerElement.querySelector('.continue');
    var toMenuBtn = this.containerElement.querySelector('.to-menu');
    var percent = Math.round((correct/(correct+wrong))*100);
    percentSpan.innerHTML=percent;
    correctSpan.innerHTML=correct+" ";
    wrongSpan.innerHTML=wrong+" ";
    if(wrong==0){
      continueBtn.innerHTML="Start over?";
    }
    else{
      continueBtn.innerHTML="Continue";
    }
    this.wrong=wrong;
    continueBtn.addEventListener('click',this.continue);
    toMenuBtn.addEventListener('click',this.showMenu);
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }

  continue(){
    if(this.wrong==0){
      this.restartCallback();
    }else{
      this.continueCallback();
    }
  }

  showMenu(){
    this.showMenuCallback();
  }

}
