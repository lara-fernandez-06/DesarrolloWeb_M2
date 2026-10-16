

export function getLocalCache(cacheKey) {
    try {
        const cachedData = localStorage.getItem(cacheKey);
        return cachedData ? JSON.parse(cachedData) : null;
    } catch (error) {
        console.error('Error al leer la caché local:', error);
        return null;
    }
}

export function setLocalCache(data, cacheKey) {
    try {
        localStorage.setItem(cacheKey, JSON.stringify(data));
    } catch (error) {
        console.warn('No se pudo guardar en la caché local:', error);
    }
}


export function clearLocalCache(cacheKey) {
    localStorage.removeItem(cacheKey);
}