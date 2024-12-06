const video = document.getElementById('video');
const captureButton = document.getElementById('capture');
const output = document.getElementById('output');

// Attiva la fotocamera
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
        video.play();
        console.log("Fotocamera attivata correttamente");
    })
    .catch(err => {
        console.error("Errore nell'accesso alla fotocamera:", err);
        alert("Non è stato possibile accedere alla fotocamera: " + err.message);
    });

// Carica Tesseract.js
import Tesseract from 'tesseract.js';

captureButton.addEventListener('click', () => {
    console.log("Bottone premuto per catturare testo");
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Riconosci il testo dall'immagine
    Tesseract.recognize(canvas.toDataURL(), 'eng', { logger: info => console.log(info) })
        .then(({ data: { text } }) => {
            output.textContent = text; // Mostra il testo rilevato
            console.log("Testo rilevato:", text);
        })
        .catch(err => {
            console.error("Errore durante il riconoscimento del testo:", err);
            alert("Errore nel riconoscimento del testo: " + err.message);
        });
});
