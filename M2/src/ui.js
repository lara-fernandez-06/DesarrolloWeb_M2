
export function renderHeaderCarousel(runesList){

}

//recibe las runas ya filtradas
export function renderRuneCards(runesArray) {
    const container = document.querySelector('#runes-container');
    if (!container) return;

    //Limpiamos el contenedor
    container.replaceChildren();

    //Si no hay resultados del filtro:
    if (runesArray.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'No se han hallado runas bajo este designio.';
        emptyMessage.classList.add('empty-message');
        container.append(emptyMessage);
        return;
    }

    //Aplicamos .map() para transformar los objetos de datos en elementos del DOM
    const cardNodes = runesArray.map(rune => {

        //contenedor para hacer el giro
        const cardContainer = document.createElement('div');
        cardContainer.classList.add('rune-card-container');

        const card = document.createElement('div');
        card.classList.add('rune-card');

        /*--CARA DELANTERA--*/
        const frontFace = document.createElement('div');
        frontFace.classList.add('card-face', 'card-face-front');

        const symbolDiv = document.createElement('div');
        symbolDiv.classList.add('card-symbol');
        symbolDiv.textContent = rune.character;

        const title = document.createElement('h3');
        title.classList.add('card-title');
        title.textContent = rune.name;

        const system = document.createElement('p');
        system.classList.add('card-description');
        system.textContent = rune.system;

        const translation = document.createElement('span');
        translation.classList.add('card-tag');
        translation.textContent =  rune.translation;

        frontFace.append(symbolDiv, title, system, translation);

        /*--CARA TRASERA--*/
        const backFace = document.createElement('div');
        backFace.classList.add('card-face', 'card-face-back')

        // Ensamblamos la tarjeta
        card.append(frontFace, backFace);
        cardContainer.append(card);

        return cardContainer;
    });

    // 4. Inyectamos todas las tarjetas de golpe en el contenedor flex
    container.append(...cardNodes);
}

