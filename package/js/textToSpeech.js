let synth = window.speechSynthesis;
let utterance = null;
let isReading = false;
let settingsModel = null;

export const initTextToSpeech = (oSettingsModel) => {
    settingsModel = oSettingsModel;
};

export const startReading = () => {
    if (isReading) return;
    stopReading();
    const text = document.body.innerText;
    utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = settingsModel?.getProperty("/ttsRate") || 1;
    utterance.volume = settingsModel?.getProperty("/ttsVolume") || 1;
    synth.speak(utterance);
    isReading = true;
    utterance.onend = () => { isReading = false; };
};

export const stopReading = () => {
    if (synth.speaking) synth.cancel();
    isReading = false;
};

export const setTTSRate = (rate) => {
    settingsModel?.setProperty("/ttsRate", rate);
};

export const setTTSVolume = (volume) => {
    settingsModel?.setProperty("/ttsVolume", volume);
};

let hoverActive = false;
function hoverHandler(e) {
    if (e.target && e.target.innerText) {
        stopReading();
        utterance = new SpeechSynthesisUtterance(e.target.innerText);
        utterance.rate = settingsModel?.getProperty("/ttsRate") || 1;
        utterance.volume = settingsModel?.getProperty("/ttsVolume") || 1;
        synth.speak(utterance);
    }
}

export const enableHoverRead = () => {
    if (!hoverActive) {
        document.body.addEventListener("mouseover", hoverHandler);
        hoverActive = true;
    }
};

export const disableHoverRead = () => {
    if (hoverActive) {
        document.body.removeEventListener("mouseover", hoverHandler);
        hoverActive = false;
    }
}; 