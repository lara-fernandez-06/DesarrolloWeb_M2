const DEFAULT_EXPIRATION = 60 * 60 * 1000; 

// Mapa de dependencias: si la clave base expira o se borra, barremos también sus derivadas
const DEPENDENCIES = {
    'elderFuthark': ['runeCardInfoKey']
};

export function setLocalCache(key, data, ttl = DEFAULT_EXPIRATION) {
    const item = {
        value: data,
        timestamp: Date.now(),
        ttl: ttl
    };

    try {
        localStorage.setItem(key, JSON.stringify(item));
    } catch (error) {
        // Detectar error de cuota excedida en diferentes navegadores
        const isQuotaError = 
            error.name === 'QuotaExceededError' ||
            error.name === 'NS_ERROR_DOM_QUOTA_REACHED' ||
            error.code === 22 ||
            error.code === 1014;

        if (isQuotaError) {
            console.warn("LocalStorage quota exceeded. Performing emergency cleanup...");
            clearExpiredCache(); // Limpiamos todo lo caducado primero
            
            try {
                // Reintentamos guardar tras la limpieza
                localStorage.setItem(key, JSON.stringify(item));
            } catch (retryError) {
                // Si aun así sigue lleno, vaciamos toda la caché de la app como último recurso
                localStorage.clear();
                localStorage.setItem(key, JSON.stringify(item));
            }
        } else {
            throw error; // Si es otro tipo de error, lo propagamos
        }
    }
}

export function getLocalCache(key) {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;

    try {
        const item = JSON.parse(itemStr);


        //si el item no existe, no es un objeto, 
        // o su timestamp no es un número finito válido, consideramos la caché corrupta y la limpiamos.
        if (!item || typeof item !== 'object' || !Number.isFinite(item.timestamp)) {
            removeLocalCache(key);
            return null;
        }

        const ttl = Number.isFinite(item.ttl) ? item.ttl : DEFAULT_EXPIRATION;
        const isExpired = Date.now() - item.timestamp > ttl;

        if (isExpired) {
            removeLocalCache(key); // Borra el item y sus dependencias en cascada
            return null;
        }

        return item.value;
    } catch (e) {
        // Si el JSON está corrupto, limpiamos la clave
        removeLocalCache(key);
        return null;
    }
}

export function removeLocalCache(key) {
    localStorage.removeItem(key);

    // Evitamos desincronización borrando también las claves derivadas (cascada)
    if (DEPENDENCIES[key]) {
        DEPENDENCIES[key].forEach(depKey => {
            localStorage.removeItem(depKey);
        });
    }
}

function clearExpiredCache() {
    Object.keys(localStorage).forEach(key => {
        getLocalCache(key); // Comprueba y borra si ha expirado
    });
}