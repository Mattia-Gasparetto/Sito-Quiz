let timerInterval;
let timeLeft = localStorage.getItem('timeLeft') ? parseInt(localStorage.getItem('timeLeft')) : 300;

// Funzione per aggiornare il timer sul display
function updateTimerDisplay() {
    const timerDiv = document.querySelector('.timer');
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDiv.textContent = `Tempo rimasto: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Funzione per avviare il timer
function startTimer() {
    updateTimerDisplay(); // Aggiorna il display appena parte il timer
    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimerDisplay();
        } else {
            clearInterval(timerInterval);
            alert("Tempo scaduto!");
            window.location.href = "homepage.html"; // Torna alla homepage se il tempo finisce
        }
    }, 1000);
}

// Funzione per salvare le domande aperte e il tempo rimanente
function salvaDomandeAperte() {
    const form = document.getElementById('domandeAperte');
    const formData = new FormData(form);
    const risposteAperte = {};

    formData.forEach((value, key) => {
        risposteAperte[key] = value;
    });

    console.log("Risposte Aperte:", risposteAperte); // DEBUG
    localStorage.setItem('risposteAperte', JSON.stringify(risposteAperte));
    localStorage.setItem('timeLeft', timeLeft); // Salva il tempo rimanente

    alert("Risposte aperte salvate.");
    clearInterval(timerInterval); // Ferma il timer attuale
    window.location.href = "domandeChiuse.html"; // Passa alla pagina successiva
}

// Funzione per salvare le domande chiuse e finali
function salvaDomandeChiuse() {
    const form = document.getElementById('domandeChiuse');
    const formData = new FormData(form);
    const risposteAperte = JSON.parse(localStorage.getItem('risposteAperte')) || {};
    const risposteTotali = { ...risposteAperte };

    formData.forEach((value, key) => {
        risposteTotali[key] = value;
    });

    console.log("Risposte Totali:", risposteTotali); // DEBUG
    salvaFile("risultati_finali.txt", risposteTotali);
    localStorage.clear();
}

// Funzione per salvare i dati in un file
function salvaFile(nomeFile, dati) {
    const blob = new Blob([JSON.stringify(dati, null, 2)], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = nomeFile;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    alert("Risposte salvate. Tornando alla homepage.");
    window.location.href = "homepage.html";
}

// Avvia il timer quando la pagina è caricata
document.addEventListener('DOMContentLoaded', startTimer);
