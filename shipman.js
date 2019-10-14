// DOM elements
const wordDisplay = document.querySelector('#word');
const victory = document.querySelector("#victory");
const wrong = document.querySelector('#wrong');
const button = document.querySelector('button');
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const hangman = [
    function(){ // murderStand
        context.moveTo(150, 130);
        context.lineTo(80, 130);
        context.stroke()}, 
    function(){ // murderPost
        context.moveTo(110, 25);
        context.lineTo(110, 130);
        context.stroke()},
    function(){ // murderArm
        context.moveTo(180, 25);
        context.lineTo(110, 25);
        context.stroke()},
    function(){ // rope
        context.moveTo(150, 40);
        context.lineTo(150, 25);
        context.stroke()},
    function () { // Head
        context.beginPath();
        context.arc(150, 50, 10, 0, Math.PI*2);
        context.closePath();
        context.lineWidth = 4;
        context.stroke()},
    function() { // Torso
        context.moveTo(150, 60);
        context.lineTo(150, 100);
        context.stroke()},
    function(){ // rightArm
        context.moveTo(150, 70);
        context.lineTo(170, 60);
        context.stroke()},
    function(){ // leftArm
        context.moveTo(150, 70);
        context.lineTo(130, 60);
        context.stroke()},
    function(){ // rightLeg
        context.moveTo(150, 99);
        context.lineTo(170, 110);
        context.stroke()},
    function(){ // leftLeg
        context.moveTo(150, 99);
        context.lineTo(130, 110);
        context.stroke()}];        

const pickWord = () => {
    const wordPool = ["Enterprise", "Franklin", "Discovery", "Defiant", "Voyager", "Columbia", "Bradbury", "Ride", "Shenzhou", "Gagarin", "Saratoga", "Reliant", "Pegasus", "Cochrane", "Grissom", "Yosemite", "Sutherland", "Farragut", "Prometheus"];
    const randomNum = Math.floor(Math.random() * wordPool.length);
    return Array.from(wordPool[randomNum].toLowerCase());
}

const reset = () => {
    word = pickWord();
    blankWord = word.map(letter => letter = "_");
    wordDisplay.innerText = blankWord.join(" ");
    victory.classList.add('d-none');
    wrongGuesses = [];
    console.log(word);
    wrong.innerText = "";
}

let word = "";
let blankWord = "";
let wrongGuesses = [];
reset();

window.addEventListener('keyup', e => {  
    if((wrongGuesses.length < hangman.length) && (e.keyCode > 64 && e.keyCode < 91)){   // Valid letter and game not over
        word.forEach((letter, index) => {
            if(letter === e.key){               // Updates display to reflect newly guessed letter
                blankWord[index] = e.key;
                wordDisplay.innerText = blankWord.join(" ").toUpperCase();     
            }
            if(!blankWord.includes("_")){       // Victory conditions
                victory.innerText = "MY GOD MAN YOU'VE SAVED HIS LIFE";
                victory.classList.remove("d-none");
                button.innerText = "Wanna try to save another?";
            }
        });
        if((!word.includes(e.key) && !wrongGuesses.includes(e.key))){ // Punishment, but not double punishment
            hangman[wrongGuesses.length - 1]();
            wrongGuesses.push(e.key);
            wrong.innerText = wrongGuesses.join(" ");
            if(wrongGuesses.length === hangman.length){    // Loss Conditions Met
                victory.innerText = "MY GOD MAN YOU'VE KILLED HIM";
                victory.classList.remove('d-none');
                button.innerText = "Wanna maybe kill another guy?";
            }
        }
    }
});
button.addEventListener('click', () => reset());