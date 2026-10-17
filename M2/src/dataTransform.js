import * as api from './api.js'
import * as cache from './cache.js'

//la ui gestiona que ocurre si esto da error
export async function getAllRuneSymbols(){
    try{
        const data = await api.getFullFile(api.elderFuthark);

        return data.reduce((acc, iteration) => {acc.push(iteration['character']); return acc;}, []); //utilizamos reduce

    }catch(error){
        console.error(error.stack);
    }
    
}

//en esta funcion nos quedaremos las partes del json que nos interesan para las tarjetas
export async function getRuneCardInfo(){

    //guardamos esta transformacion tambien en la cache para no hacerla cada vez que cargarmos las cartas
    const cached = cache.getLocalCache('runeCardInfoKey');
    if(cached) return cached;

    const rawData = await api.getFullFile(api.elderFuthark);

    if(!Array.isArray(rawData)) throw new Error("El archivo no contiene una lista válida.");;

    const poemSources = [
        { key: 'old_icelandic', origin: 'Old Icelandic poem' },
        { key: 'old_norwegian', origin: 'Old Norwegian poem' },
        { key: 'anglo_saxon', origin: 'Anglo saxon poem' }
    ];

    const transformedData =  rawData.map(rune => {

        const availablePoem = poemSources.find(
            source => rune?.sot_poems?.[source.key]?.translation
        );

        return({
            rune_id: rune.rune_id,
            character: rune.character,
            name: rune.name,
            system: rune.system,
            translation: rune.literal_translation,
            application: rune.practical_application,
            //no todas las runas tienen poemas en old_icelandic
            //algunos incluso solo tienen 1 de 3, asi nos aseguramos de que todas las runas tengan poema                
            poem: availablePoem ? rune.sot_poems[availablePoem.key].translation : "Verso perdido en el tiempo",
            poemOrigin: availablePoem ? availablePoem.origin : "Tradición Rúnica"
            // Omitimos el resto de propiedades del JSON original
        })

    });

    cache.setLocalCache('runeCardInfoKey', transformedData);

    return transformedData;    

}

//especificamente filtra la info ya preparada para las cartas
//dejamos a la funcion de ui que gestione el caso de que no haya nada (no vamos a renderizar nada desde aqui)
export async function filterCards(filterText = ""){
    const unfiltered = await getRuneCardInfo();

    if(!Array.isArray(unfiltered)) throw new Error("El archivo no contiene una lista válida.");;

    return unfiltered.filter(rune => {
        const query = filterText?.toLowerCase();
        const nameMatch = rune.name?.toLowerCase().includes(query);
        const translationMatch = rune.translation && rune.translation?.toLowerCase().includes(query);
        return nameMatch || translationMatch;
    });
}