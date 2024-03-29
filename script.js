
corGuesses = 0;
tempWord = "";
class game{
    
    //main game code
    static startGame() {
        var gameOver = false;
        var currentGuess = "";
        var guessed = "";
        var lives = 7;

        //Selects a random word from wordbank to init word
        var wordbank = ["VINEYARD"];

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
                //Store guess
                currentGuess = $('.input').val().toUpperCase();

                //If guess has already been made or is blank then return
                for (let i = 0; i < guessed.length; i++)
                    if(currentGuess == guessed[i] || currentGuess.length == 0) return;

                //Clear input field
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

                //Replace * in tempWord with currentGuess character and overwrite .guessword
                if(gameOver == false){
                    tempWord = $('.guessword').text();
                    for(var i = 0; i < wordLength; i++){
                        if(currentGuess == word[i])
                            tempWord = tempWord.substring(0, i) + currentGuess + tempWord.substring(i + 1);
                    }
                    $('.guessword').text(tempWord);
                }
            }
        });
    }

    //appends guessed letter to guessed letter list
    static addToGuessed(letter) { $(".guessedletters").append(letter); }
    
    //checks for number of correct letters from guess and removes life if no correct letters
    static handleGuess(letter, word, lives){
        var correct = 0;
        for(var i = 0; i < word.length; i++) {
            if(letter == word.charAt(i)){
                correct++;
                corGuesses++;
            }
        }

        //If guess is false fade out a heart on screen and take away 1 from lives
        if(correct == 0){

            if(lives == 7)
                $('.h7').fadeTo(200, 0.1);

            if(lives == 6)
                $('.h6').fadeTo(200, 0.1);
            
            if(lives == 5)
                $('.h5').fadeTo(200, 0.1);
            
            if(lives == 4)
                $('.h4').fadeTo(200, 0.1);
            
            if(lives == 3)
                $('.h3').fadeTo(200, 0.1);
            
            if(lives == 2)
                $('.h2').fadeTo(200, 0.1);
            
            if(lives == 1)
                $('.h1').fadeTo(200, 0.1);
            
            return false;
        }
    }
}
//start game on load
$( document ).ready(game.startGame());