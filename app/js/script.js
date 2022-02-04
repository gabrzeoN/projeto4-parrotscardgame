let cardsQuantity = 4; // TROCAR PARA 0 DEPOIS.
let cardsInGame = [];
let cardsTurned = [];
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
    while( (cardsQuantity < 4) || (cardsQuantity > 14) || (cardsQuantity % 2 !== 0) ){
        cardsQuantity = prompt("Deseja jogar com quantas cartas? (Número par entre 4 e 14)");
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
    if(cardsTurned[0].innerHTML === cardsTurned[1].innerHTML){
        cardsTurned.length = 0;
    }else{
        setTimeout(untapCards, 1500);
    }
}

function untapCards(){
    cardsTurned[0].classList.remove("flip");
    cardsTurned[1].classList.remove("flip");
    cardsTurned.length = 0;
}
setTimeout(insertCards, 1); // TROCA PARA 1500 DEPOIS