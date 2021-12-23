
corGuesses = 0;
tempWord = "";
class game{
    //main game code
    static startGame() {
        var gameOver = false;
        var currentGuess = "";
        var guessed = "";
        var lives = 5;

        //Selects a random word from wordbank to init word
        var wordbank = ["testA", "teeestB", "teeeeestC"];
        const word = wordbank[Math.floor(Math.random() * wordbank.length)];
        tempWord = word;

        //finds length of word and puts underscores in place of letters
        const wordLength = word.length;
        for (let i = 0; i < wordLength; i++)
           $(".guessword").append("*");

        //Event Listener for guess input (Enter key) unless game is over
        $('.input').keypress(function(event){
            if(gameOver == true) return;
            var keycode = (event.keycode ? event.keycode : event.which);
            if(keycode == '13'){
                //Store guess and then clear input field
                currentGuess = $('.input').val();
                guessed = guessed + currentGuess;
                $('.input').val('');

                //calls guess related functions
                game.addToGuessed(currentGuess);
                if(game.handleGuess(currentGuess, word, lives) == false) lives--;

                //Checks for win or loss and stops taking input if either are true
                if(corGuesses == wordLength){
                    $('.guessword').text("Winner! The word was " + word);
                    gameOver = true;
                }
                    if(lives == 0){
                    $('.guessword').text("Sorry! The word was " + word);
                    gameOver = true;
                }
            }
        });
    }

    //appends guessed letter to guessed letter list
    static addToGuessed(letter) {
        $(".guessedletters").append(letter);

    }
    
    //checks for number of correct letters from guess and removes life if no correct letters
    static handleGuess(letter, word, lives, tempWord){
        var correct = 0;
        for(var i = 0; i < word.length; i++) {
            if(letter == word.charAt(i)){
                correct++;
                corGuesses++;
            }
        }
        //If guess is false fade out a heart on screen and take away 1 from lives
        if(correct == 0){
            if(lives == 5){
                $('.h5').fadeTo(1, 0.001);
            }
            if(lives == 4){
                $('.h4').fadeTo(1, 0.001);
            }
            if(lives == 3){
                $('.h3').fadeTo(1, 0.001);
            }
            if(lives == 2){
                $('.h2').fadeTo(1, 0.001);
            }
            if(lives == 1){
                $('.h1').fadeTo(1, 0.001);
            }
            return false;
        }




    }
}

$( document ).ready(game.startGame());