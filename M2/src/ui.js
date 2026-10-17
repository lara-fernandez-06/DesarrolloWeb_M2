
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
        // Contenedor principal de la tarjeta (artículo semántico)
        const card = document.createElement('article');
        card.classList.add('rune-card');

        // Símbolo rúnico grande
        const symbolDiv = document.createElement('div');
        symbolDiv.classList.add('card-symbol');
        symbolDiv.textContent = rune.character;

        // Nombre de la runa
        const title = document.createElement('h3');
        title.classList.add('card-title');
        title.textContent = rune.name;

        //Sistema al que pertenece la runa
        const system = document.createElement('p');
        system.classList.add('card-description');
        system.textContent = rune.system;

        // Traduccion
        const translation = document.createElement('span');
        translation.classList.add('card-tag');
        translation.textContent =  rune.translation;

        // Ensamblamos la tarjeta
        card.append(symbolDiv, title, system, translation);

        return card;
    });

    // 4. Inyectamos todas las tarjetas de golpe en el contenedor flex
    container.append(...cardNodes);
}

