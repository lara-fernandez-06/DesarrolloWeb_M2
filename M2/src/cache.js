const CACHE_DURATION = 60 * 60 * 1000;

export function getLocalCache(key) {
    try {
        const cachedItem = localStorage.getItem(key);
        if (!cachedItem) return null;

        const { data, timestamp } = JSON.parse(cachedItem);
        const now = Date.now();

        // Comprobamos si ha pasado más de 1 hora desde que se guardó
        if (now - timestamp > CACHE_DURATION) {
            localStorage.removeItem(key); // Limpiamos la caché caducada
            return null;
        }

        return data;
    } catch (error) {
        console.error("Error al leer la caché:", error);
        localStorage.removeItem(key);
        return null;
    }
}

export function setLocalCache(key, data) {
    try {
        const cachePayload = {
            data: data,
            timestamp: Date.now() // Guardamos el momento exacto en milisegundos
        };
        localStorage.setItem(key, JSON.stringify(cachePayload));
    } catch (error) {
        console.warn("Error al guardar en la caché:", error);
    }
}


export function clearLocalCache(cacheKey) {
    localStorage.removeItem(cacheKey);
}