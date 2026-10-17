import * as db from './dataTransform.js'
import * as ui from './ui.js'

const input = document.querySelector('#rune-search');
const cardsContainer = document.querySelector('#runes-container');

startWeb();

async function startWeb(){

  input.addEventListener('keydown', function(event) {
    //Comprobamos si la tecla presionada es enter
    if (event.key === 'Enter') {
      // Evitamos el comportamiento por defecto (por si está dentro de un <form>)
      event.preventDefault(); 

      showCards(input.value);

    }  
  });

  cardsContainer.addEventListener('click', (e) => {

    const card = e.target.closest('.rune-card');
    card.classList.toggle('is-flipped');
  });

  showCards();
  
}

async function showCards(filterText=""){

  //obtenemos los datos
  const data = await db.filterCards(filterText);

  //renderizamos las tarjetas
  ui.renderRuneCards(data);
}
