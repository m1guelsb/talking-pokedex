//filter speacials characters from the string
export default function cleanString(string = '') {
  let cleaningString = string;
  let findN = '\n'; //remove \n
  let reN = new RegExp(findN, 'g');
  cleaningString = cleaningString.replace(reN, ' ');
  let findF = '\f'; //remove \f
  let reF = new RegExp(findF, 'g');
  let cleanedString = cleaningString.replace(reF, ' ');

  return cleanedString;
}