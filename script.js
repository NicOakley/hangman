

class game{
    //main game code
    static startGame() {
        var gameOver = false;
        //variables storing current guess, previously guessed, and current lives
        var currentGuess = "";
        var guessed = "";
        var lives = 5;
        var correctGuesses = 0;

        //Selects a random word from wordbank to init word
        var wordbank = ["testA", "teeestB", "teeeeestC"];
        const word = wordbank[Math.floor(Math.random() * wordbank.length)];

        //finds length of word and puts underscores in place of letters
        const wordLength = word.length;
        for (let i = 0; i < wordLength; i++) {
           $(".guessword").append("X")
        }

        //Event Listener for guess input (Enter key) unless game is over
        $('.input').keypress(function(event){
            if(gameOver == true){
                return;
            }
            var keycode = (event.keycode ? event.keycode : event.which);
            if(keycode == '13'){

                //Store guess and then clear input field
                currentGuess = $('.input').val();
                guessed = guessed + currentGuess;
                $('.input').val('');

                //calls guess related functions
                game.addToGuessed(currentGuess);
                if(game.checkGuess(currentGuess, word, lives) == false) lives--;
                if(game.checkWin() == true){
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
    

    static checkGuess(letter, word, lives){
        var correct = 0;
        for(var i = 0; i < word.length; i++) {
            if(letter == word.charAt(i)){
                correct++;
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
        return true;
    }

    static checkWin(word){
        var check = $(".guessedletters").text();
        for(var i = 0; i < check.length; i++){
        
        }
    }

}

$( document ).ready(game.startGame());