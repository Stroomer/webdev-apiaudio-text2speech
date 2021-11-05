import "./style.scss";
import { getWav } from "./api";

let cb_language, cb_gender, cb_voice;
let btn_send;
let wav;

window.addEventListener('load', () => {
    cb_language = document.getElementById('language');
    cb_gender = document.getElementById('gender');
    cb_voice = document.getElementById('voice');

    cb_language.focus();

    btn_send = createSendButton();

});

function createSendButton() {
    const btn = document.getElementById('send');
    btn.addEventListener('click', function (event) {
        event.preventDefault();
        const language = document.getElementById('language').value;
        const gender = document.getElementById('gender').value;
        const voice = document.getElementById('voice').value;
        const text = document.getElementById('textarea').value;

        text.trim();

        if (language === "") {
            console.log("language is not specified");
        } else if (gender === "") {
            console.log("gender is not specified");
        } else if (voice === "") {
            console.log("voice is not specified");
        } else if (text === "") {
            console.log("text is not specified")
        } else {
            console.log("fetch audio!");
            getWav(text);
        }
    });
    return btn;
}



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

// const createPlayButton = () => {
//     const form = document.getElementById('myform');
//     const btn = document.createElement('button');
//     const h2 = document.createElement('h2');
//     h2.innerHTML = 'Play';
//     btn.appendChild(h2);
//     btn.id = 'playbutton';
//     form.appendChild(btn);
// }


// createPlayButton();








// const playbutton = document.getElementById('playbutton');
//         playbutton.style.display = 'block';
//         playbutton.addEventListener('click', function (event) {
//             event.preventDefault();
//             console.log('tfoeeee ja ' + speechResult.data);
//             playWaveURL(speechResult.data);
//         });


// const submit = () => {
//     console.log('onsubmit');
//     //return false;
// }



//document.querySelector('#start').onclick = () => audioPlay('music/music.mp3');




//convertTextToWav("Yo, this is mc hammer. You can't touch this.");

//createPlayButton();


