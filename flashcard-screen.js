// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Rewriting some of the existing methods, such as changing code in `show()`
// - Adding methods
// - Adding additional fields

class FlashcardScreen {
  constructor(containerElement,showResultsCallBack) {
    this.showResultsCallBack=showResultsCallBack;
    this.containerElement = containerElement;
    //bind
    this.show = this.show.bind(this);
    this.showNextCard = this.showNextCard.bind(this);
    this.showScore = this.showScore.bind(this);
    this.initiallizeCard = this.initiallizeCard.bind(this);
    //value initiallize
    this.initialWords={};
    this.words={};
  }

  copyDictionary(dic1,dic2){ // dictionary1 = dictionary2
    for(var key in dic2){
      dic1[key]=dic2[key];
    }
  }

  showDicitonary(dic1){
    for(var key in dic1){
      console.log(key+" "+dic1[key]);
    }
  }

  show(words=null,restart=false) {
    this.containerElement.classList.remove('inactive');
    //console.log("show is called");
    this.cardIndex=0;
    if(words!=null){ //you got new words
      console.log("***nonull x***")
      this.correct=0;
      this.wrong=0;  
      this.isSecondRun=false;
      this.copyDictionary(this.words,words);
      this.copyDictionary(this.initialWords,words);
      //this.showDicitonary(this.initialWords)
    }else if(restart){ //restart a game(same words)
      console.log("***null true***")
      this.correct=0;
      this.wrong=0;  
      this.isSecondRun=false;
      //this.showDicitonary(this.initialWords);
      this.copyDictionary(this.words,this.initialWords);
    }else{ //continue a game(only incorrect words)
      console.log("***null false***")
      this.isSecondRun=true;
      this.copyDictionary(this.words,this.words);
    }
    this.initiallizeCard();
    console.log("words="+this.words);
    this.showScore();//initiallize the score text
    //console.log(this.cardIndex);
    console.log("length of card"+this.card.length);
    this.card[this.cardIndex].show();
  }

  initiallizeCard(){ 
    this.card=[]
    const flashcardContainer = document.querySelector('#flashcard-container');
    var index = 0;
    //console.log('***initiallizeCard***')
    for(var key in this.words){
      //console.log( key+" "+ this.words[key])
      this.card[index] = new Flashcard(flashcardContainer, key, this.words[key],this.showNextCard,this.showScore);
      index+=1;
    }
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }

  showNextCard(delta){
    //scoring
    if(delta>0){
      this.correct+=1;
      if(this.isSecondRun) this.wrong-=1;
      //remove correct word of words
      delete this.words[this.card[this.cardIndex].frontText];
    }
    else{
      if(!this.isSecondRun) this.wrong+=1;
    }
    //console.log(this.correct+" "+this.wrong);
    this.showScore();
    //show next card
    this.card[this.cardIndex].hide();
    this.cardIndex+=1;
    if(this.cardIndex<this.card.length){
      this.card[this.cardIndex].show();
    }else{
      this.showResultsCallBack();
    }
  }

  showScore(correctX=0,wrongX=0){
    var correctDiv= document.getElementsByClassName("correct")[0];
    var wrongDiv=document.getElementsByClassName("incorrect")[0];
  
    if(this.isSecondRun && (correctX>0 || wrongX>0)){
      if(wrongX==1){
        correctDiv.innerHTML=(this.correct-1)+" ";
        wrongDiv.innerHTML=(this.wrong+1)+" "; 
      }else{
        correctDiv.innerHTML=(this.correct+1)+" ";
        wrongDiv.innerHTML=(this.wrong-1)+" "; 
      }
    }else{
      correctDiv.innerHTML=(this.correct+correctX)+" ";
      wrongDiv.innerHTML=(this.wrong+wrongX)+" "; 
    }
  }
}
