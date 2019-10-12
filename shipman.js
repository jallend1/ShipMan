// DOM elements
const wordDisplay = document.querySelector('#word');
const victory = document.querySelector("#victory");
const wrong = document.querySelector('#wrong');
const button = document.querySelector('button');

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
        if((!word.includes(e.key) && !wrongGuesses.includes(e.key))){ // Pushes wrong guesses to array
            wrongGuesses.push(e.key);
            wrong.innerText = wrongGuesses.join(" ");
        }
    }
});
button.addEventListener('click', () => reset());