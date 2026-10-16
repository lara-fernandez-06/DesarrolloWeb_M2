import * as api from './api.js'
const NORSE_URL = "https://raw.githubusercontent.com/ksherbondy/norse-heathenry-pagan-api-dataset/main/JSON-files"
const AESIR = "aesir-gods.json"
const RUNES = "elder-futhark-v3.json"

prueba();
async function prueba() {
  const resp = await fetch(`${NORSE_URL}/${RUNES}`);

  console.log(resp);

  if(!resp.ok){
    console.error("Nope");
  }else{
    console.log("yayy");
    const data = await resp.json(); //solo se puede leer una vez
    console.log(Object.keys(data[0]));
    console.log(api.checkRunesFile(data));  
    //document.querySelector('header').textContent=  data.reduce((acc, iteration) => `${acc} ${iteration['character']}`, "");

  }
}
