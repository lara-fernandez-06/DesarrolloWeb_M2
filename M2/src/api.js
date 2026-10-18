const NORSE_URL = "https://raw.githubusercontent.com/ksherbondy/norse-heathenry-pagan-api-dataset/main/JSON-files"

export async function getFullFile(file) {

    const answer = await fetch(`${NORSE_URL}/${file}`);

    // fetch NO rechaza con errores HTTP (404, 500): hay que comprobar ok
    if (!answer.ok) {
    throw new Error(`HTTP ${answer.status}: ${answer.statusText}`);
    }

    const data = await answer.json();

    if (!Array.isArray(data)) {
        throw new Error("The file doesn't contain a valid list");
    }

    return data;

}
