import * as db from './dataTransform.js'
import * as ui from './ui.js'

startWeb();

async function startWeb(){

  //obtenemos los datos
  const data = await db.filterCards();

  //renderizamos las tarjetas
  ui.renderRuneCards(data);
}
