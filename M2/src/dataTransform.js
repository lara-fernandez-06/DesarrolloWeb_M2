import * as api from './api.js'
import * as ui from'./ui.js'

export function getAllRuneSymbols(){
    const data = api.getFullFile(api.elderFuthark);

    return data.reduce((acc, iteration) => `${acc} ${iteration['character']}`, "");
}

//en esta funcion nos quedaremos las partes del json que nos interesan para las tarjetas
export async function getRuneCardInfo(){

    try{
        const rawData = await api.getFullFile(api.elderFuthark);

        if(!Array.isArray(rawData)) return;

        return rawData.map(rune => ({
                rune_id: rune.rune_id,
                character: rune.character,
                name: rune.name,
                system: rune.system,
                translation: rune.literal_translation,
                application: rune.practical_application,
                //no todas las runas tienen poemas en old_icelandic
                //algunos incluso solo tienen 1 de 3, asi nos aseguramos de que todas las runas tengan poema                
                poem: rune.sot_poems?.old_icelandic?.translation ?? rune.sot_poems?.old_norwegian?.translation ?? rune.sot_poems?.anglo_saxon?.translation ?? "Verso perdido en el tiempo"
                // Omitimos el resto de propiedades del JSON original
        }));

    }catch(error){
        console.error(error.message);
        ui.showError()
    }
    

}

//especificamente filtra la info ya preparada para las cartas
//dejamos a la funcion de ui que gestione el caso de que no haya nada (no vamos a renderizar nada desde aqui)
export async function filterCards(filterText = ""){
    const unfiltered = await getRuneCardInfo();

    if(!Array.isArray(unfiltered)) return;

    return unfiltered.filter(rune => {
        const query = filterText.toLowerCase();
        const nameMatch = rune.name.toLowerCase().includes(query);
        const translationMatch = rune.translation && rune.translation.toLowerCase().includes(query);
        return nameMatch || translationMatch;
    });
}