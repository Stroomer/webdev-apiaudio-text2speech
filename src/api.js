import apiaudio from "apiaudio";
import { removeDuplicatesArray, removeDuplicatesObjectsArray, requireExistence } from "./functions";

const api_key = process.env.API_KEY;
const url = 'https://v1.api.audio/voice';
const options = { method: 'GET', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } };

// get array with all data from API, unfiltered, 256 objects
const getData = async () => {
    const result = fetch(url, options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
    return result;
}

// get all languages, remove duplicates
const getLanguages = async (data) => {
    const raw = data['voices'];
    const languages = raw.map((item) => item.language);
    return removeDuplicatesArray(languages);
}

// get all accents, remove duplicates
const getAccents = async (data) => {
    const raw = data['voices'];
    const accents = raw.map((item) => item.accent);
    return removeDuplicatesArray(accents);
}

// get all genders
const getGenders = async (data) => {
    const raw = data['voices'];
    const genders = raw.map((item) => item.gender);
    return removeDuplicatesArray(genders);
}

// get array with all ages
const getAgeBrackets = async (data) => {
    const raw = data['voices'];
    const age = raw.map((item) => item.ageBracket);
    return removeDuplicatesArray(age);
}

// get array with all names
const getNames = async (data) => {
    const raw = data['voices'];
    const name = raw.map((item) => item.alias);
    return removeDuplicatesArray(name);
}

// function process(language = null, accent = null, gender = null, age = null, name = null) {
//     return;
// }


export { getData, getLanguages, getAccents, getGenders, getAgeBrackets, getNames };












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