//return a random index
export function randomIndex(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomIndex = Math.floor(Math.random() * (max - min)) + min;
  
  return randomIndex;
}


//filter specials characters from the string
export function cleanString(string = '') {
  let cleaningString = string;
  let findN = '\n'; //remove \n
  let reN = new RegExp(findN, 'g');
  cleaningString = cleaningString.replace(reN, ' ');
  let findF = '\f'; //remove \f
  let reF = new RegExp(findF, 'g');
  let cleanedString = cleaningString.replace(reF, ' ');

  return cleanedString;
}



//voice output
let synth = window.speechSynthesis;
export function synthSpeak(string = '', lang) {
  let utterance = new SpeechSynthesisUtterance(string);
  utterance.voice = lang;
  synth.speak(utterance);
}