let cardsQuantity = 0;
let cardsInGame = [];
const allCards = [
    "unicornparrot.gif",
    "metalparrot.gif",
    "tripletsparrot.gif",
    "revertitparrot.gif",
    "fiestaparrot.gif",
    "explodyparrot.gif",
    "bobrossparrot.gif"
];


function comparador() { 
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

    cardsInGame.sort(comparador);

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
    card.classList.toggle("flip");
}



insertCards();
