import apiaudio from "apiaudio";
const api_key = 'apikey_hier_plaatsen';




export const getWav = async (text, voice = null) => {
    try {
        if (apiaudio.apiKey !== undefined) {
            apiaudio.reset();
        }
        apiaudio.configure({ apiKey: api_key });

        const id = "data";
        const voice = voice === null ? "aria" : voice;
        const script = await apiaudio.Script.create({ scriptText: `<<soundSegment::ambience>> <<sectionName::${id}>> ${text}`, scriptName: id, projectName: id, moduleName: id });
        const speech = await apiaudio.Speech.create({ scriptId: script["scriptId"], voice: voice });

        const wavdata = await fetch(speech.data.url, { mode: 'no-cors', cache: 'no-cache' });



        console.log(speech.data.url);



        //console.log();
    }
    catch (error) {
        console.log(`Something went wrong: ${error}`);
    }
}



const getVoices = () => {

}

const getGenders = () => {

}

