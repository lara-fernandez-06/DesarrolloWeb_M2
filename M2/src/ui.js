
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
        emptyMessage.classList.add('status-message', 'empty');
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

        // Cabecera: Nombre y Caracter en la misma línea
        const backHeader = document.createElement('header');
        backHeader.classList.add('back-header');

        const backTitle = document.createElement('h4');
        backTitle.classList.add('back-title');
        backTitle.textContent = rune.name;

        const backSymbol = document.createElement('span');
        backSymbol.classList.add('back-symbol-small');
        backSymbol.textContent = rune.character;

        backHeader.append(backTitle, backSymbol);

        // Contenedor de los dos textos solicitados
        const backContent = document.createElement('div');
        backContent.classList.add('back-content');

        // Bloque 1: Aplicación (Para qué se usaba)
        const appContainer = document.createElement('div');
        appContainer.classList.add('back-section');

        const appLabel = document.createElement('span');
        appLabel.classList.add('back-label');
        appLabel.textContent = 'USO / APLICACIÓN';

        const appText = document.createElement('p');
        appText.classList.add('card-description');
        appText.textContent = rune.application ?? 'Uso tradicional no especificado.';

        appContainer.append(appLabel, appText);

        // Bloque 2: Poema / Frase relacionada (En doradito e cursiva)
        const poemContainer = document.createElement('div');
        poemContainer.classList.add('back-section');

        const poemText = document.createElement('p');
        poemText.classList.add('back-poem');
        poemText.textContent = `"${rune.poem ?? 'Sabiduría oculta en las brumas.'}"`;

        poemContainer.append(poemText);

        backContent.append(appContainer, poemContainer);

        // Ensamblar la cara trasera
        backFace.append(backHeader, backContent);

        // Ensamblamos la tarjeta
        card.append(frontFace, backFace);
        cardContainer.append(card);

        return cardContainer;
    });

    //Inyectamos todas las tarjetas de golpe en el contenedor flex
    container.append(...cardNodes);
}

export function showLoading() {
    const container = document.querySelector('#runes-container');
    if (!container) return;
    
    container.replaceChildren();
    const loadingMsg = document.createElement('p');
    loadingMsg.textContent = 'Invocando las runas... Cargando sabiduría...';
    loadingMsg.classList.add('status-message', 'loading');
    container.append(loadingMsg);
    
}

export function showError() {
    const container = document.querySelector('#runes-container');
    if (!container) return;
    container.replaceChildren();
    const errorMsg = document.createElement('p');
    errorMsg.textContent = 'Se produjo un error';
    errorMsg.classList.add('status-message','error');
    container.append(errorMsg);
}

