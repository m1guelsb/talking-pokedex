export default function getRandomIndex(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomIndex = Math.floor(Math.random() * (max - min)) + min;
  
  return randomIndex;
}