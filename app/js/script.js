let cardsQuantity = 0; // TROCAR PARA 0 DEPOIS.
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
    
    // cardsInGame = [];
    // Separar as cartas que farão parte do jogo em um vetor e embaralhar esse vetor.
    for(let i = 0; i < cardsQuantity / 2; i++){
        cardsInGame.push(allCards[i]);
        cardsInGame.push(allCards[i]);
    }

    cardsInGame.sort(comparator);

    // Zerar o HTML das cartas.
    const main = document.querySelector("main");
    main.innerHTML = "";

    // Colocar o vetor de cartas no HTML
    for(let i = 0; i < cardsQuantity; i++){
        main.innerHTML += `
            <div class="card" onclick="turnCard(this)">
                <div class="face front-face">
                    <img src="app/gifs/${cardsInGame[i]}" alt="Frente da carta">
                </div>
                <div class="face back-face">
                    <img src="app/images/front.png" alt="Verso da carta">
                </div>
            </div>
        `;
    }
    
    timeInterval = setInterval(raiseTime, 1000);

}


function turnCard(card){
    if(card.classList.contains("flip")){// Se carta já estiver ok
        console.log("ja tem flip");
    }
    else if(cardsTurned.length === 0){// Se não tiver nenhuma carta virada
        card.classList.add("flip");// Vira
        cardsTurned[0] = card; // Insere no vetor
    }else if (cardsTurned.length === 1){// Se tiver uma carta virada
        card.classList.add("flip"); // Vira outra
        cardsTurned[1] = card; // Insere outra no vetor

        compareCards();
    }else{// Se já tiver duas cartas viradas
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
    // restartGame();
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

function stopTime(){

}

setTimeout(insertCards, 500); // TROCAR PARA 1500 DEPOIS