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

const recognition = getSpeechRecognition();

listenButton.onclick = () => {
  recognition.start();
  console.log("Listening...");
};

// Has side effects
recognition.onresult = event => {
  const lastResult = event.results[event.results.length - 1];
  const { transcript, confidence } = lastResult[0];

  // Side effects that pull from the global objects...
  transcriptionBox.innerHTML = transcript;
  reversedBox.innerHTML = reverseString(transcript);

  console.log(`Speech: ${transcript}`);
  console.log("Confidence: " + confidence);
};
