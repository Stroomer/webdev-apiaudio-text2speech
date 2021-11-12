
const init = async () => {
    const data = await getDataFromAPI();
}

const getDataFromAPI = () => {
    // hier haal ik met fetch/then/catch de data op uit de API
    const url = 'https://urltomyfavoriteapi.com';

    const result = fetch(url)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));

    return result;
}

init();

// Verschillende namen die allemaal naar een function verwijzen
// - Function
// - Method
// - Handler
// - Procedure

// is allemaal hetzelfde!



