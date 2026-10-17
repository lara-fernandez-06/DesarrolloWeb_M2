import * as cache from './cache.js'

const NORSE_URL = "https://raw.githubusercontent.com/ksherbondy/norse-heathenry-pagan-api-dataset/main/JSON-files"
export const elderFuthark = {cacheKey:"elderFuthark", file:"elder-futhark-v3.json"};

export async function getFullFile(fileObj) {

    //si esta en la cache no hacemos fetch
    const cached = cache.getLocalCache(fileObj.cacheKey);
    if(cached) return cached;

    const answer = await fetch(`${NORSE_URL}/${fileObj.file}`);

    // fetch NO rechaza con errores HTTP (404, 500): hay que comprobar ok
    if (!answer.ok) {
    throw new Error(`HTTP ${answer.status}: ${answer.statusText}`);
    }

    const data = await answer.json();

    if (!Array.isArray(data)) {
        throw new Error("The file doesn't contain a valid list");
    }

    cache.setLocalCache(fileObj.cacheKey, data);

    return data;

}
