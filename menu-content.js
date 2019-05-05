class MenuContent {
    constructor(title,words,onClickedCallback) {
        //console.log("menu content created");
        this.onClickedCallback = onClickedCallback;
        //bind
        this.onClick = this.onClick.bind(this);
        //varaible
        this.title = title;
        this.words = words;
        this.containerElement = document.createElement('div');
        this.containerElement.setAttribute("id", "choices");
        this.containerElement.innerHTML=title;
        var choices=document.getElementById("choices");
        choices.appendChild(this.containerElement);  
        this.containerElement.addEventListener("click", this.onClick);
    }


    onClick = function(){
        //console.log("menu contentOnClick "+this.title);
        this.onClickedCallback(this.words);
    }
    
}
