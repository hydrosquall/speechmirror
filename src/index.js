import "./styles.css";

// Based on
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API

// DOM Utilities
const reverseString = str =>
  str
    .split("")
    .reverse()
    .join("");

/* Get object for interfacing with browser speech recognition API */
const getSpeechRecognition = () => {
  const SpeechRecognition = // Cross browser compatibility
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = new SpeechRecognition();

  // Configure
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  return recognition;
};

// DOM elements
const listenButton = document.getElementById("listenButton");
const transcriptionBox = document.getElementById("transcription");
const reversedBox = document.getElementById("reversed");

// Speech Globals
const RECOGNITION = getSpeechRecognition();
const SYNTH = window.speechSynthesis;
const VOICES = SYNTH.getVoices();
console.log(`There are ${VOICES.length} voices available.`);
const DEFAULT_VOICE = VOICES[0]; // can select other voices later

// Has side effect
const speakText = (message, voice = DEFAULT_VOICE, synth = SYNTH) => {
  const utterance = new window.SpeechSynthesisUtterance(message);
  utterance.voice = voice;
  // Can optionally control pitch, rate on the utterance too
  // utterance.pitch, utterance.rate (0.5 - 2)
  utterance.rate = 0.6;
  synth.speak(utterance);
};

listenButton.onclick = () => {
  RECOGNITION.start();
  console.log("Listening...");
};

// Has side effects to both DOM and to the computer audio
const presentRecognitionResults = event => {
  const lastResult = event.results[event.results.length - 1];
  const { transcript, confidence } = lastResult[0];

  // Side effects that pull from the global objects...
  transcriptionBox.innerHTML = transcript;

  const reversedTranscript = reverseString(transcript);
  reversedBox.innerHTML = reversedTranscript;

  // speakText(transcript);
  speakText(reversedTranscript);

  // Diagnostic info
  console.log("Confidence: " + confidence);
};

RECOGNITION.onresult = presentRecognitionResults;
