import apiaudio from "apiaudio";
import { removeDuplicates, requireExistence } from "./functions";

const api_key = process.env.API_KEY;
const url = 'https://v1.api.audio/voice';
const options = { method: 'GET', headers: { Accept: 'application/json', 'x-api-key': api_key } };

// get array with all data from API, unfiltered, 256 objects
const getData = async () => {
    const result = fetch(url, options)
        .then(response => response.json())
        .then(response => response['voices'])
        .catch(err => console.error(err));
    return result;
}

// get array with all languages, remove duplicates
const getLanguages = async () => {
    const result = fetch(url, options)
        .then(response => response.json())
        .then(response => removeDuplicates(response['voices'], 'language').map((data) => data.language))
        .catch(err => console.error(err));
    return result;
}

// get array with all accents, remove duplicates
const getAccents = async () => {
    const result = fetch(url, options)
        .then(response => response.json())
        .then(response => removeDuplicates(response['voices'], 'accent').map((data) => data.accent))
        .catch(err => console.error(err));
    return result;
}

// get array with accents for a specific language, remove duplicates
const getAccentsForLanguage = async (language) => {
    const result = fetch(url, options)
        .then(response => response.json())
        .then(response => removeDuplicates(requireExistence(response['voices'], 'language', language), 'accent').map((data) => data.accent))
        .catch(err => console.error(err));
    return result;
}

// get array with all genders
const getGenders = async () => {
    const result = fetch(url, options)
        .then(response => response.json())
        .then(response => removeDuplicates(response['voices'], 'gender').map((data) => data.gender))
        .catch(err => console.error(err));
    return result;
}

// get array with all ages
const getAgeBrackets = async () => {
    const result = fetch(url, options)
        .then(response => response.json())
        .then(response => removeDuplicates(response['voices'], 'ageBracket').map((data) => data.ageBracket))
        .catch(err => console.error(err));
    return result;
}

// get array with all names
const getName = async () => {
    const result = fetch(url, options)
        .then(response => response.json())
        .then(response => removeDuplicates(response['voices'], 'ageBracket').map((data) => data.ageBracket))
        .catch(err => console.error(err));
    return result;
}

// function process(language = null, accent = null, gender = null, age = null, name = null) {
//     return;
// }


export { getData, getLanguages, getAccents, getAccentsForLanguage, getGenders, getAgeBrackets, getName }












// export const getTextConvertedToWav = async (text, voice = null) => {
//     try {
//         apiaudio.reset();
//         apiaudio.configure({ apiKey: api_key });

//         const id = "data";
//         const voice = voice === null ? "aria" : voice;
//         const script = await apiaudio.Script.create({ scriptText: `<<soundSegment::ambience>> <<sectionName::${id}>> ${text}`, scriptName: id, projectName: id, moduleName: id });
//         const speech = await apiaudio.Speech.create({ scriptId: script["scriptId"], voice: voice });

//         //const audio = new Audio(speech.data.url);

//         //audio.play();

//         //blocked = false;
//         //console.log('blocked: ' + blocked);

//         console.log("Success: " + speech.data.url);

//         return speech.data.url;
//     }
//     catch (error) {
//         console.log(`Error: ${error}`);
//         return null;
//     }
// }

// export const getDataListVoices = async () => {
//     const options = { method: 'GET', headers: { Accept: 'application/json', 'x-api-key': api_key } };
//     const response = await fetch('https://v1.api.audio/voice', options)
//         .then(data => data.json())
//         .then(data => {
//             return (data['voices']).slice(0, 46);
//         })
//         .catch(err => console.error(err));
//     return response;
// }