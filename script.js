//////////////////////////////////////////////////////////////
const wordList = ["robinet","douche","lavabo", "baignoire"]

var newGameButton = document.getElementById("newGameButton")
var affichageGuessWordHidden = document.getElementById("guessWord")
var life = document.getElementById("lifeStatus")
var letterButtons = document.getElementsByClassName('alphabetLetter')
//////////////////////////////////////////////////////////////

var guessWordList = []
var nbr_life = 6
var guessWordListHidden = []

for (var button in letterButtons) {
    letterButtons[button].disabled = true
}

function randomWord() {
    return wordList[Math.floor(Math.random() * wordList.length)].toUpperCase()
}

function guessWordFunction() {
    var guessWord = randomWord()
    guessWordListHidden = []
    guessWordList = []
    nbr_life = 6

    for ( var letter in guessWord) {
        guessWordList.push(guessWord[letter])
    }
    
    guessWordListHidden.push(guessWordList[0])

    var wordLenght = guessWord.length - 2
    for (var i=0; i<wordLenght; i++) {
        guessWordListHidden.push("_")
    }

    guessWordListHidden.push(guessWordList[guessWordList.length -1])

    affichageGuessWordHidden.innerHTML = guessWordListHidden.join(' ')
}

function newGame() {
    guessWordFunction()
    nbr_life = 6
    life.innerHTML = nbr_life
    for (var button in letterButtons) {
        letterButtons[button].disabled = false
    } 

}

newGameButton.addEventListener('click', newGame)

for(var b of letterButtons){
    b.addEventListener('click', function (e) {

        var attemptSucced = false

        for (var letter in guessWordList) {

            if (e.target.innerHTML == guessWordList[letter]) {
                guessWordListHidden[guessWordList.indexOf(letter)] = e.target.innerHTML
                attemptSucced = true
                guessWordListHidden[letter] = guessWordList[letter]
                affichageGuessWordHidden.innerHTML = guessWordListHidden.join(' ')
                console.log(guessWordList, guessWordListHidden)

                if (guessWordListHidden.includes("_")) {
                    console.log("TEST")
                }
                else {
                    life.innerHTML = "VICTOIRE"

                    for (var button in letterButtons) {
                        letterButtons[button].disabled = true
                    }
                }
            }
        }

        if (attemptSucced == false) {
            nbr_life --
            life.innerHTML = nbr_life

            if (nbr_life == 0) {
                affichageGuessWordHidden.innerHTML = guessWordList.join(' ')
                life.innerHTML = "PERDU"

                for (var button in letterButtons) {
                    letterButtons[button].disabled = true
                }
            }

        }

        e.target.disabled = true

    })
}