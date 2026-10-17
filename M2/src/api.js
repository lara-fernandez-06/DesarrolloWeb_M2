import * as cache from './cache.js'
import * as ui from './ui.js'

const NORSE_URL = "https://raw.githubusercontent.com/ksherbondy/norse-heathenry-pagan-api-dataset/main/JSON-files"
export const elderFuthark = {cacheKey:"elderFuthark", file:"elder-futhark-v3.json"};

export async function getFullFile(fileObj) {

    //si esta en la cache no hacemos fetch
    const cached = cache.getLocalCache(fileObj.cacheKey);
    if(cached) return cached;

    try {
        const answer = await fetch(`${NORSE_URL}/${fileObj.file}`);

        // fetch NO rechaza con errores HTTP (404, 500): hay que comprobar ok
        if (!answer.ok) {
        throw new Error(`HTTP ${answer.status}: ${answer.statusText}`);
        }

        const data = await answer.json();

        if (!Array.isArray(data)) {
            throw new Error("El archivo no contiene una lista válida.");
        }

        cache.setLocalCache(fileObj.cacheKey, data);

        return data;

    }catch (error){
        console.error("No se pudo cargar el archivo", error.message);
        const container = document.querySelector('#runes-container');
        ui.showError(container);
        return [];
    }
}
