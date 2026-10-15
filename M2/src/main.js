const NORSE_URL = "https://raw.githubusercontent.com/ksherbondy/norse-heathenry-pagan-api-dataset/main/JSON-files/aesir-gods.json"

prueba();

async function prueba() {
  const resp = await fetch(NORSE_URL);

  console.log(resp);

  if(!resp.ok){
    console.error("Nope");
  }else{
    console.log("yayy");
    console.log(resp.json()['name']);
  }
}
