import * as dm from './dataManager.js'
import * as ui from './ui.js'

const input = document.querySelector('#rune-search');
const cardsContainer = document.querySelector('#runes-container');

startWeb();

async function startWeb(){
  addEvents();
  await loadContent();  
}

function addEvents(){

  input.addEventListener('keydown', function(event) {
    //Comprobamos si la tecla presionada es enter
    if (event.key === 'Enter') {
      // Evitamos el comportamiento por defecto (por si está dentro de un <form>)
      event.preventDefault(); 

      renderRuneCards(input.value);

    }  
  });

  cardsContainer.addEventListener('click', (e) => {

    const card = e.target.closest('.rune-card');

    if(!card) return;

    card.classList.toggle('is-flipped');
  });

}

async function loadContent(){

  //carousel (no pasa nada si no se renderiza, no se muere la página, por eso solo da warning)
  try{
    ui.renderHeaderCarousel(await dm.getAllRuneSymbols());
  }catch(error){
    console.warn(error.stack);
  }

  renderRuneCards();

}


async function renderRuneCards(filterText=""){

  //mensaje de loading
  ui.showLoading();

  //obtenemos los datos
  //capturamos aqui todos los errores. De esta forma centralizamos quien pinta el mensaje de error en la pagina web
  try{
    const data = await dm.getFilteredCardsInfo(filterText);
    //renderizamos las tarjetas
    if(Array.isArray(data)) ui.renderRuneCards(data);
  }catch(error){
    console.error(error.stack);
    //ponemos loadContent en caso de que haya sido un error de red (ej) el carrousel pueda volver a cargarse
    //ya que el carrousel tiene programado fallar silenciosamente para no cargarse la pagina web, así que lo compensamos aqui
    ui.showError(error.message, renderRuneCards, filterText);
  }
}
