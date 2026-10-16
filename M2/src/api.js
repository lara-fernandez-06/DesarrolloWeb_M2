const NORSE_URL = "https://raw.githubusercontent.com/ksherbondy/norse-heathenry-pagan-api-dataset/main/JSON-files"
const RUNES = "elder-futhark-v3.json"

const data = getFullFile(RUNES);

export async function getFullFile(file) {
  try {
    const answer = await fetch(`${NORSE_URL}/${file}`);

    // fetch NO rechaza con errores HTTP (404, 500): hay que comprobar ok
    if (!answer.ok) {
      throw new Error(`HTTP ${answer.status}: ${answer.statusText}`);
    }

    const data = await answer.json();

    if (!Array.isArray(data)) {
        throw new Error("El archivo no contiene una lista válida.");
    }

    

    return data;

  }catch (error){
    console.error("No se pudo cargar el archivo", error.message);
    return [];
  }
}


function checkFile(data, expectedKeys) {
   
    // Validamos el primer elemento (o recorremos todos) para asegurar que tiene las claves correctas
    const firstObj = data[0];

    const hasAllKeys = expectedKeys.every(key => key in firstObj);

    if (!hasAllKeys) {
        return false;
    }

    return true; 
}

export function checkRunesFile(data){
    const objKeys = ['rune_id', 'system', 'era', 'character', 'name', 'phonetic', 'literal_translation', 'sot_poems', 'practical_application', 'ceremony_roadmap', 'source_reference'];
    return checkFile(data, objKeys);
}

