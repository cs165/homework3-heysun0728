// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class Flashcard {
  constructor(containerElement, frontText, backText,showNextCardCallback,showScoreCallback) {
    this.containerElement = containerElement;
    this.showNextCardCallback = showNextCardCallback;
    this.showScoreCallback = showScoreCallback;
    //bind the function
    this._flipCard = this._flipCard.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.onDragMove = this.onDragMove.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.hide = this.hide.bind(this);
    this.show = this.show.bind(this);
    this.showNextCard = this.showNextCard.bind(this);
    this.frontText=frontText;

    //initiallize class element
    this.dragStart = false;
    this.originX = null;
    this.originY = null;
    this.time = 0;
    this.isPositive = false;   

    //create card
    this.flashcardElement = this._createFlashcardDOM(frontText, backText);
    this.containerElement.append(this.flashcardElement);
    this.flashcardElement.addEventListener('pointerup', this._flipCard);
  }

  // Creates the DOM object representing a flashcard with the given
  // |frontText| and |backText| strings to display on the front and
  // back of the card. Returns a reference to root of this DOM
  // snippet. Does not attach this to the page.
  //
  // More specifically, this creates the following HTML snippet in JS
  // as a DOM object:
  // <div class="flashcard-box show-word">
  //   <div class="flashcard word">frontText</div>
  //   <div class="flashcard definition">backText</div>
  // </div>
  // and returns a reference to the root of that snippet, i.e. the
  // <div class="flashcard-box">
  _createFlashcardDOM(frontText, backText) {
    this.cardContainer = document.createElement('div');
    this.cardContainer.classList.add('flashcard-box');
    this.cardContainer.classList.add('show-word');
    const wordSide = document.createElement('div');
    wordSide.classList.add('flashcard');
    wordSide.classList.add('word');
    wordSide.textContent = frontText;

    const definitionSide = document.createElement('div');
    definitionSide.classList.add('flashcard');
    definitionSide.classList.add('definition');
    definitionSide.textContent= backText;

    this.cardContainer.addEventListener('pointerdown', this.onDragStart);
    this.cardContainer.addEventListener('pointermove', this.onDragMove);
    this.cardContainer.addEventListener('pointerup', this.onDragEnd);

    this.cardContainer.appendChild(wordSide);
    this.cardContainer.appendChild(definitionSide);

    //get the initial position of cardContainer 
    this.pos = this.cardContainer.getBoundingClientRect();

    //hide all flashcards until flashcard-screen calls show()
    this.hide();
    return this.cardContainer;
  }

  _flipCard(event) {
    this.flashcardElement.classList.toggle('show-word');
  }

  onDragStart(event) {
    event.preventDefault();
    if(this.time==0){
      this.originX = event.clientX;
      this.originY = event.clientY;
    }
    this.time= 1;
    this.dragStart = true;
    this.cardContainer.style.transitionDuration = "0s";
  }
    
  onDragMove(event) {
    if (!this.dragStart) {
      return;
    }
    
    const currentX = event.clientX;
    const currentY = event.clientY;
    
    const delta = currentX - this.originX;
    const delta2 = currentY - this.originY;
  
    if(currentX > this.originX) this.isPositive=true;
    else this.isPositive=false;

    var body = document.getElementsByTagName("BODY")[0];

    //console.log(delta);
    this.cardContainer.style.transform = 'translate(' + delta + 'px,'+delta2+'px) '+'rotate(' + 0.2 * delta + 'deg)';

    if(Math.abs(delta)>150){
      body.style.backgroundColor="#97b7b7";
      if(delta>0){
        this.showScoreCallback(1,0);
      }
      else this.showScoreCallback(0,1);
    }else{
      body.style.backgroundColor="#d0e6df";
      this.showScoreCallback();
    } 

  }
    
  onDragEnd(event) {
    //console.log(this.originX+" "+this.originY+" "+this.lastX+" "+this.lastY);

    this.dragStart = false;
    
    const currentX = event.clientX;
    const delta = currentX - this.originX;

    //change background
    var body = document.getElementsByTagName("BODY")[0];
    body.style.backgroundColor="#d0e6df";

    if(Math.abs(delta)>150){      
      //tell flashcard-screen to call next card
      this.showNextCard(delta);
    }else{
      this.cardContainer.style.transform = 'translate(' + this.pos.left + 'px,'+ this.pos.top+'px)';
      this.cardContainer.style.transitionDuration = "0.6s";
    } 
  }

  hide(){
    this.cardContainer.style.display = "none";
    //回到原始位置，避免第二次呼叫的時候位置不對
    this.cardContainer.style.transform = 'translate(' + this.pos.left + 'px,'+ this.pos.top+'px)';
  }

  show(){
    this.cardContainer.style.display = "block";
  }

  showNextCard(delta){
    this.showNextCardCallback(delta);
  }
    
}
