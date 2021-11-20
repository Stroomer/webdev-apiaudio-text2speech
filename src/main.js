import "./style.scss";
import json from './data.json';

import { capitalize, removeRedundant, filterObjectsArray, getArrayFromObjectsArray, removeDuplicates } from "./functions";
import { getLanguages, getAccents, getGenders, getAgeBrackets, getNames } from "./api";
import { getData } from "./api";

let languages;
let accents;
let genders;
let ages;
let names;

let voices;
let voicesFiltered;

window.addEventListener('load', async () => {
    voices = removeRedundant(json, ['audioSample', 'industryExamples', 'longSoftDescription', 'provider', 'providerFullName', 'supportedStyles', 'tags']);
    voicesFiltered = voices.slice(0);

    createForm();
    initializeForm(voicesFiltered);
});

function initializeForm(data) {
    languages = getLanguages(data);
    accents = getAccents(data);
    genders = getGenders(data);
    ages = getAgeBrackets(data);
    names = getNames(data);

    if (languages.length > 0) populate('language', languages);
    if (accents.length > 0) populate('accent', accents);
    if (genders.length > 0) populate('gender', genders);
    if (ages.length > 0) populate('age', ages);
    if (names.length > 0) populate('name', names);
}

function populate(id, data, selected = null) {
    const combobox = document.getElementById(id);
    const event = new CustomEvent('populate', { detail: { data: data, selected: selected } });
    combobox.dispatchEvent(event);
}

// function unpopulate(id) {
//     const combobox = document.getElementById(id);
//     const event = new CustomEvent('unpopulate');
//     combobox.dispatchEvent(event);
// }

function createForm() {
    const form = document.createElement('form');
    const h1 = document.createElement('h1');

    form.setAttribute('action', '');
    form.setAttribute('method', 'post');
    form.setAttribute('id', 'myform');

    h1.innerHTML = 'Text-to-speech API';

    form.appendChild(h1);
    form.appendChild(createComboBox('language'));
    form.appendChild(createComboBox('accent'));
    form.appendChild(createComboBox('gender'));
    form.appendChild(createComboBox('age'));
    form.appendChild(createComboBox('name'));
    form.appendChild(createTextArea('textarea'));
    form.appendChild(createButton('send'));

    document.getElementById('container').appendChild(form);
}

function createButton(id) {
    const button = document.createElement('button');
    switch (id) {
        case 'send':
            button.setAttribute('id', id);
            button.innerHTML = capitalize(id);
            button.addEventListener('click', async (event) => {
                event.preventDefault();
                const textarea = document.getElementById('textarea');
                const text = textarea.value.trim();
                textarea.value = '';
                textarea.style.backgroundColor = null;
                //if (!blocked) {
                console.log('start');
                //const wav = await getTextConvertedToWav(text);
                console.log('stop');
                //}
            });
            break;
    }
    return button;
}

function createTextArea(id) {
    const div = document.createElement('div');
    const label = document.createElement('label');
    const textarea = document.createElement('textarea');

    textarea.setAttribute('id', id);
    textarea.setAttribute('placeholder', 'Add text here');

    textarea.addEventListener('input', () => {
        console.log('textarea change');
        textarea.style.backgroundColor = textarea.value === '' ? null : '#ddd';
    });

    div.appendChild(label);
    div.appendChild(textarea);
    return div;
}

function createComboBox(id) {
    const div = document.createElement('div');
    const label = document.createElement('label');
    const select = document.createElement('select');
    const option = document.createElement('option');

    label.setAttribute('for', id);
    label.innerHTML = capitalize(id);

    option.setAttribute('value', '');
    option.setAttribute('selected', 'selected');
    option.innerHTML = 'Choose ' + id.toLowerCase();

    select.setAttribute('id', id);
    select.appendChild(option);

    select.addEventListener('mousedown', () => {
        select.style.backgroundColor = null;
        //console.log('mousedown');
    });

    select.addEventListener('populate', (event) => {
        // remove old options (if present), except for the first one (blank)
        const options = Array.from(select.options);
        if (options.length > 1) {
            options.shift();
            options.forEach((option) => {
                option.parentNode.removeChild(option);
            });
        }
        // add options
        const values = event.detail.data;
        const selected = event.detail.selected;
        values.forEach((value) => {
            if (value !== undefined && value !== '') {
                const option = document.createElement('option');
                option.setAttribute('value', value);
                option.innerHTML = capitalize(value);
                select.appendChild(option);
            }
        });
        select.selectedIndex = selected !== null ? selected : select.selectedIndex;
        select.style.backgroundColor = select.selectedIndex === 0 ? null : '#ddd';
    });

    select.addEventListener('change', async (event) => {
        const index = select.selectedIndex;
        const value = select.options[index].value;
        switch (id) {
            case 'language':
                voicesFiltered = voices.slice(0);
                voicesFiltered = index === 0 ? voicesFiltered : filterObjectsArray(voicesFiltered, 'language', value);

                //languages = getLanguages(voicesFiltered);
                //populate('language', languages, index === 0 ? 0 : 1); 

                accents = getAccents(voicesFiltered);
                populate('accent', accents, index === 0 ? 0 : 1);

                names = getNames(voicesFiltered);
                populate('name', names, index === 0 ? 0 : 1);
                break;
            case 'accent':
                //const cb_lang = getComboboxSelected('language');
                //voicesFiltered = cb_lang.index === 0 ? voicesFiltered : filterObjectsArray(voicesFiltered, 'language', cb_lang.value);

                if (getComboboxSelected('language').index === 0) {
                    languages = getLanguages(voicesFiltered);
                    populate('language', languages, 1);
                }

                console.log(getComboboxSelected('language').index);

                names = getNames(voicesFiltered);
                populate('name', names, index === 0 ? 0 : 1);
                break;
            case 'gender':

                break;
            case 'age':

                break;
            case 'name':

                break;
        }
        select.style.backgroundColor = select.selectedIndex === 0 ? null : '#ddd';
    });
    div.appendChild(label);
    div.appendChild(select);
    return div;
}

function getComboboxSelected(id) {
    const cb = document.getElementById(id);
    const index = cb.selectedIndex;
    const value = cb.options[index].value;
    return { index: index, value: value };
}




                // console.log('val', value, langVal);

//searchParams = { language: '', accent: '', gender: '', age: '', name: '' };
    //searchBools = { language: false, accent: false, gender: false, age: false, name: false };


// let f = filtered.length;
    // let p = Object.keys(searchParams).length;

    // let remove;

    // while (f--) {
    //     remove = false;
    //     if (searchBools.language) {
    //         if (searchParams.language !== filtered[f].language) {
    //             remove = true;                      //console.log(`remove ${filtered[f].language}`);
    //         }
    //     }

    //     if (searchBools.accent) {
    //         if (searchParams.accent !== filtered[f].accent) {
    //             remove = true;
    //         }
    //     }

    //     if (searchBools.gender) {
    //         if (searchParams.gender !== filtered[f].gender) {
    //             remove = true;
    //         }
    //     }

    //     if (searchBools.age) {
    //         if (searchParams.age !== filtered[f].age) {
    //             remove = true;
    //         }
    //     }

    //     if (searchBools.name) {
    //         if (searchParams.name !== filtered[f].name) {
    //             remove = true;
    //         }
    //     }

    //     if (remove) {
    //         filtered.splice(f, 1);
    //     }
    // }
















// select.style.backgroundColor = index === 0 ? '#ffcccc' : select.style.backgroundColor;

        // //console.log('change');
        // switch (id) {
        //     case 'language':
        //         //console.log('lang: ' + value);
        //         filtered.options.language = value;
        //         filtered.result = search(filtered.result);
        //         //setOptions('accent', searchResult, document.getElementById('accent'));
        //         break;
        //     case 'accent':
        //         console.log('accent: ' + value);
        //         filtered.options.accent = value;
        //         filtered.result - search(filtered.result);
        //         break;
        //     case 'gender':
        //         //console.log('gender: ' + value);
        //         filtered.options.gender = value;
        //         break;
        //     case 'age':
        //         //console.log('age: ' + value);
        //         filtered.options.age = value;
        //         break;
        //     case 'name':
        //         //console.log('name: ' + value);
        //         filtered.options.name = value;
        //         break;
        // }


//data = await getData();
    // if (data.length > 0) {
    //     data.forEach((object) => {
    //         if (object.alias === '' || object.alias === undefined) {
    //             object.alias = object.voiceName.split('_')[1].toLowerCase();    // if no alias exists, take a slice from the voicename
    //         }

    //         //const warning = object.alias === '' || object.voiceName === '' || object.alias === undefined || object.voiceName === undefined ? 'WARNING' : '';
    //         //const warning = object.alias === 'omazh' || object.alias === 'zahar' ? 'WARNING' : '';
    //         //console.log(`${warning}   alias: ${object.alias}   voicename: ${object.voiceName}`);
    //     });
    // }

    // languages = await getLanguages(data);
    // if (languages.length > 0) {
    //     populate('language', languages);
    // }

    // accents = await getAccents(data);
    // if (accents.length > 0) {
    //     populate('accent', accents);
    // }

    // genders = await getGenders(data);
    // if (genders.length > 0) {
    //     populate('gender', genders);
    // }

    // ages = await getAgeBrackets(data);
    // if (ages.length > 0) {
    //     populate('age', ages);
    // }

    // names = await getNames(data);
    // if (names.length > 0) {
    //     populate('name', names);
    // }



//voices = await getDataListVoices();
    // filtered = { options: {}, result: [] };
    // filtered.options = { language: '', accent: '', gender: '', age: '', name: '' };
    // filtered.result = search(voices);
    // updateCombos(search);

// function search(data) {
//     let temp = data.slice(0);

//     temp = document.getElementById('language').selectedIndex !== 0 ? temp.filter(item => item.language === searchOptions.language) : temp;
//     temp = document.getElementById('accent').selectedIndex !== 0 ? temp.filter(item => item.accent === searchOptions.accent) : temp;
//     temp = document.getElementById('gender').selectedIndex !== 0 ? temp.filter(item => item.gender === searchOptions.gender) : temp;
//     temp = document.getElementById('age').selectedIndex !== 0 ? temp.filter(item => item.age === searchOptions.age) : temp;
//     temp = document.getElementById('name').selectedIndex !== 0 ? temp.filter(item => item.name === searchOptions.name) : temp;

//     // console.log('temp');
//     // console.log(temp.length);
//     // console.log(temp);
//     // console.log('');
//     // console.log('data');
//     // console.log(data.length);

//     return temp;
// }

// const playWaveURL = async (url) => {
//     const context = new AudioContext();
//     const source = context.createBufferSource();
//     const audioBuffer = await fetch(url)
//         .then(res => res.arrayBuffer())
//         .then(ArrayBuffer => context.decodeAudioData(ArrayBuffer));
//     source.buffer = audioBuffer;
//     source.connect(context.destination);
//     source.start();
// };

// function updateCombos() {
//     const combos = ['language', 'accent', 'gender', 'age', 'name'];

//     combos.forEach((combo) => {
//         setOptions(combo, filtered, document.getElementById(combo));
//     });
// }

// function setOptions(type, data, select) {
//     let temp = [];
//     let array = [];
//     switch (type) {
//         case 'language':
//             //console.log();    

//             //temp = [...new Map(data.map(item => [item['language'], item])).values()];                           // make unique
//             temp.forEach(function (obj) {                                                                       // loop thrue languages
//                 if (obj.language !== '' && obj.language !== undefined) {                                        // remove empty, undefined
//                     array.push({ label: obj.language, id: obj.language });                // prepare object for select-options
//                 }
//             });
//             break;
//         case 'accent':
//             temp = [...new Map(data.map(item => [item['accent'], item])).values()];     // make unique
//             //console.log(temp);

//             temp.forEach(function (obj) {                                               // loop thrue languages                        
//                 if (obj.accent !== '' && obj.accent !== undefined) {                   // remove empty, neutral, undefined
//                     array.push({ label: capitalize(obj.accent), id: obj.accent.toLowerCase() });                                    // prepare object for select-options
//                 }
//             });
//             break;
//         case 'gender':
//             array.push({ label: 'Female', id: 'female' });
//             array.push({ label: 'Male', id: 'male' });
//             break;
//         case 'age':
//             array.push({ label: 'Child', id: 'child' });
//             array.push({ label: 'Adult', id: 'adult' });
//             array.push({ label: 'Senior', id: 'senior' });
//             break;
//         case 'name':
//             temp = data;
//             temp.forEach(function (obj) {                                               // loop thrue languages                        
//                 //if (obj.voiceName !== '' && obj.voiceName !== undefined) {                   // remove empty, neutral, undefined
//                 array.push({ label: obj.voiceName, id: obj.voiceName.toLowerCase() });                                    // prepare object for select-options
//                 //}
//             });
//             break;
//     }

//     // array.forEach(obj => {
//     //     const option = document.createElement('option');
//     //     option.setAttribute('value', obj.id);
//     //     option.innerHTML = capitalize(obj.label);
//     //     select.appendChild(option);
//     // });

//     select.style.backgroundColor = select.selectedIndex === 0 ? '#ffcccc' : '#e1eec7';

//     // #ffcccc roodachtig
//     // #e1eec7 groenachtig
// }