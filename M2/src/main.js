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

    if(!card) return;

    card.classList.toggle('is-flipped');
  });

  showCards();
  
}

async function showCards(filterText=""){

  //mensaje de loading
  ui.showLoading(cardsContainer);

  //obtenemos los datos
  //capturamos aqui todos los errores. De esta forma centralizamos quien pinta el mensaje de error en la pagina web
  try{
    const data = await db.filterCards(filterText);

    //renderizamos las tarjetas
    if(Array.isArray(data)) ui.renderRuneCards(data);
  }catch(error){
    console.error(error.stack);
    ui.showError();
  }
}
