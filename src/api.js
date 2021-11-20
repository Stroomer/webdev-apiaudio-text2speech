import apiaudio from "apiaudio";
import { removeDuplicates, removeDuplicatesObjectsArray } from "./functions";

const api_key = process.env.API_KEY;
const url = 'https://v1.api.audio/voice';
const options = { method: 'GET', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } };

const getData = async () => {
    const result = fetch(url, options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
    return result;
}

const getLanguages = (data) => {
    const languages = data.map((item) => item.language);
    return removeDuplicates(languages);
}

const getAccents = (data) => {
    const accents = data.map((item) => item.accent);
    return removeDuplicates(accents);
}

const getGenders = (data) => {
    const genders = data.map((item) => item.gender);
    return removeDuplicates(genders);
}

const getAgeBrackets = (data) => {
    const ages = data.map((item) => item.ageBracket);
    return removeDuplicates(ages);
}

const getNames = (data) => {
    const names = data.map((item) => item.alias);
    return removeDuplicates(names);
}

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