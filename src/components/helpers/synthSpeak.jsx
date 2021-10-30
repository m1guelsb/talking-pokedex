
console.log('voice lang')

let synth = window.speechSynthesis;

export default function synthSpeak(string = '', lang) {
  let utterance = new SpeechSynthesisUtterance(string);
  utterance.voice = lang;
  synth.speak(utterance);
}