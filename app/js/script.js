let cardsQuantity = 0;
let cardsInGame = [];
let cardsTurned = [];
let movesMade = 0;
let time = 0;
let timeInterval = null;
const minCardsInGame = 4;
const maxCardsInGame = 14;
const allCards = [
    "unicornparrot.gif",
    "metalparrot.gif",
    "tripletsparrot.gif",
    "revertitparrot.gif",
    "fiestaparrot.gif",
    "explodyparrot.gif",
    "bobrossparrot.gif"
];

function comparator() { 
	return Math.random() - 0.5; 
}

function insertCards(){
    while( (cardsQuantity < minCardsInGame) || (cardsQuantity > maxCardsInGame) || (cardsQuantity % 2 !== 0) ){
        cardsQuantity = prompt("Deseja jogar com quantas cartas? (Número PAR entre 4 e 14)");
    }
    
    for(let i = 0; i < cardsQuantity / 2; i++){
        cardsInGame.push(allCards[i]);
        cardsInGame.push(allCards[i]);
    }

    cardsInGame.sort(comparator);
    const main = document.querySelector("main");
    main.innerHTML = "";

    for(let i = 0; i < cardsQuantity; i++){
        main.innerHTML += `
            <div class="card" onclick="turnCard(this)" data-identifier="card">
                <div class="face front-face" data-identifier="front-face">
                    <img src="app/gifs/${cardsInGame[i]}" alt="Frente da carta">
                </div>
                <div class="face back-face" data-identifier="back-face">
                    <img src="app/images/front.png" alt="Verso da carta">
                </div>
            </div>
        `;
    }
    timeInterval = setInterval(raiseTime, 1000);
}


function turnCard(card){
    if(card.classList.contains("flip")){// If card and it's pair is already flipped.
        console.log("ja tem flip");
    }
    else if(cardsTurned.length === 0){// If no card is flipped.
        card.classList.add("flip");
        cardsTurned[0] = card;
    }else if (cardsTurned.length === 1){// If one card is flipped.
        card.classList.add("flip");
        cardsTurned[1] = card;
        compareCards();
    }else{// If there is two cards already flipped.
        console.log("ja tem 2 apertada");
    }
}

function compareCards(){
    movesMade += 2;
    if(cardsTurned[0].innerHTML === cardsTurned[1].innerHTML){
        cardsTurned.length = 0;
        compareAllFlipped();
    }else{
        setTimeout(untapCards, 1500);
    }
}

function untapCards(){
    cardsTurned[0].classList.remove("flip");
    cardsTurned[1].classList.remove("flip");
    cardsTurned.length = 0;
}

function compareAllFlipped(){
    const allCardsInGame = document.querySelectorAll(".card");
    for(let i = 0; i < cardsInGame.length; i++){
        if(!allCardsInGame[i].classList.contains("flip")){
            return;
        }
    }
    setTimeout(gameOver, 1000);
}

function gameOver(){
    clearInterval(timeInterval);
    console.log(alert(`Parabéns, você ganhou em ${movesMade} jogadas e em ${time} segundos!`));
    restartGame();
}

function restartGame(){
    const restartGameAnswer = prompt("Gostaria de reiniciar a partida? (s / n)");
    if( restartGameAnswer === "s" || restartGameAnswer === "S"){
        setTime();
        cardsQuantity = 0;
        cardsInGame = [];
        movesMade = 0;
        insertCards();
    }else{
        alert("Obrigado por jogar Parrot Card Game!");
    }
}

function setTime(){
    const timer = document.querySelector(".clock p");
    timer.innerHTML = 0;
    time = 0;
}

function raiseTime(){
    time++;
    const timer = document.querySelector(".clock p");
    timer.innerHTML = time;  
}

setTimeout(insertCards, 500);