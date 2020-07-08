window.addEventListener('load', init);


const currentLevel = 6;
let time = currentLevel;
let score = 0;
let isPlaying;

const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');
const okButton = document.querySelector("body > div > div > div > input.submit")
let myVar = setInterval(countdown, 1000);
const words = [
  'hat',
  'river',
  'lucky',
  'statue',
  'generate',
  'stubborn',
  'cocktail',
  'runaway',
  'joke',
  'developer',
  'establishment',
  'hero',
  'javascript',
  'nutrition',
  'revolver',
  'echo',
  'siblings',
  'investigate',
  'horrendous',
  'symptom',
  'laughter',
  'magic',
  'master',
  'space',
  'definition'
];

function init() {
  seconds.innerHTML = currentLevel;
  showWord(words);
  okButton.addEventListener('click', startMatch);
  myVar
}

function startMatch() {
  if (matchWords()) {
    isPlaying = true;
    time = currentLevel - 1;
    showWord(words);
    wordInput.value = '';
    //score++;
  }
}

function matchWords() {
  if (wordInput.value === currentWord.innerHTML && score >= 1) {
    message.innerHTML = 'Well done!';
    scoreDisplay.innerHTML = 2
    let timer = document.querySelector("body > div > div > div > div:nth-child(6) > div:nth-child(1) > h3")
    timer.innerHTML = `<div style="display:inline-block;border:3px solid rgb(116, 198, 65);border-radius:5px;padding:10px;background:linear-gradient(to bottom,rgb(123, 222, 90),rgb(101, 243, 103));color:">Dismiss Alarm</div>`
    myStopFunction()
    return false;
  } else if (wordInput.value === currentWord.innerHTML) {
    message.innerHTML = 'One more!';
    score++;
    scoreDisplay.innerHTML = score
    return true
  } else {
    message.innerHTML = '';
    score--;
    return true;
  }
}
function myStopFunction() {
    clearInterval(myVar);
  }

function showWord(words) {
  const randIndex = Math.floor(Math.random() * words.length);
  currentWord.innerHTML = words[randIndex];
}

function countdown() {
  if (time > 0) {
    time--;
  } else if (time === 0) {
    isPlaying = true;
    showWord(words);
    time = currentLevel

  }
  timeDisplay.innerHTML = time;
}
