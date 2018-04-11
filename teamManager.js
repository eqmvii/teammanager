// teamManager.js

var inquirer = require('inquirer');


function Player(name, position, offense, defense) {
    this.name = name;
    this.position = position;
    this.offense = Math.floor(Math.random() * 10) + 1;
    this.defense = Math.floor(Math.random() * 10) + 1;
    this.goodGame = function () {
        this.offense += Math.floor(Math.random() * 2); // concise way to increase offense by 0 or 1
        this.defense += Math.floor(Math.random() * 2); // concise way to increase defense by 0 or 1
    };
    this.badGame = function () {
        this.offense -= Math.floor(Math.random() * 2); // concise way to decrease offense by 0 or 1
        this.defense -= Math.floor(Math.random() * 2); // concise way to decrease defense by 0 or 1
    }
    this.printStats = function () {
        console.log(`${this.name} | Pstn: ${this.position}  | Off: ${this.offense}  | Def: ${this.defense}`);
    };
}

// var myPlayer = new Player("Eric", "1st base coach");
// myPlayer.printStats();
// myPlayer.goodGame();
// myPlayer.printStats();
// myPlayer.goodGame();
// myPlayer.printStats();
// myPlayer.goodGame();
// myPlayer.printStats();

var playersArray = [];
playersArray.score = 0; // let's give the array a property. NEVER DO THIS.
playersArray.gamesPlayed = 0; // let's give the array a property. NEVER DO THIS.

function makeAPlayer() {
    var playerNumber = playersArray.length + 1;
    var position = "starter";
    if (playerNumber === 3) {
        position = "sub    ";
    }
    inquirer.prompt([
        {
            name: "name",
            message: `Name of player #${playerNumber}, who is a ${position}`
        }
        // ,{
        //     type: "list",
        //     name: "position",
        //     message: "Position?",
        //     choices: ["starter", "alt"]
        // }
        // ,{
        //     name: "offense",
        //     message: "Offense?"
        // },
        // {
        //     name: "defense",
        //     message: "Defense??"
        // }
    ]).then(ans => {
        //console.log(ans);
        newPlayer = new Player(ans.name, position);
        playersArray.push(newPlayer);
        if (playersArray.length < 3) {
            makeAPlayer();
        } else {
            playersArray.offense = 0; // let's give the array a property. NEVER DO THIS.
            playersArray.defense = 0; // let's give the array a property. NEVER DO THIS.
            // console.log("Printing all your players!");
            for (let i = 0; i < playersArray.length - 1; i++) { // sub is the end of the array
                playersArray[i].printStats();
                playersArray.offense += playersArray[i].offense;
                playersArray.defense += playersArray[i].defense;
            }
            // console.log("Players array: ");
            // console.log(playersArray);
            // console.log(playersArray.length);
            console.log(`Total Offense: ${playersArray.offense}; Total Defense: ${playersArray.defense}`);
            playGame();
        }
    });
}

function playGame() {
    var swapPlayers = false;
    console.log("Time to play a game!");
    var randOne = Math.floor(Math.random() * 20) + 1;
    var randTwo = Math.floor(Math.random() * 20) + 1;
    console.log(`1: ${randOne}; 2: ${randTwo}`);
    if (randOne < playersArray.offense) {
        console.log("Offense was good enough, +1 point!");
        playersArray.score++;
        swapPlayers = true;
    }
    if (randTwo > playersArray.defense) {
        console.log("Defense blew it, -1 point!");
        playersArray.score--;
        swapPlayers = true;
    }
    inquirer.prompt([{
        type: "list",
        name: "pos",
        message: "swap a player?",
        choices: ["0", "1", "Do not substitute"]
    }]).then(ans => {
        console.log(ans);
        console.log("Next game starts in 2 seconds");
        if (playersArray.gamesPlayed < 5) {
            playersArray.gamesPlayed++;
            setTimeout(playGame, 2 * 1000);
        } else {
            console.log(`Score: ${playersArray.score}`);
        }
    })
}

makeAPlayer();

/*
  * Run 5 times. Each time the function runs:
    * Two random numbers between 1 and 20 are rolled and compared against the starters' offensive and defensive stats
      * If the first number is lower than the sum of the team's offensive stat, add one point to the team's score.
      * If the second number is higher than the sum of the team's defensive stat, remove one point from the team's score.
    * After the score has been changed, prompt the user to allow them to substitute 1 player from within the starters array with the player from within the subs array.
  * After the game has finished (been run 5 times):
    * If the score is positive, run `goodGame` for all of the players currently within the starters array.
    * If the score is negative, run `badGame` for all of the players currently within the starters array.
    * If the score is equal to zero, do nothing with the starters.
    * Give the user a message about if they won, and the status of their starters.
    * After printing the results, ask the user if they would like to play again.
      * Run `playGame` from the start once more if they do.
      * End the program if they don't.

* HINT: Remember to use recursion when looping with inquirer! Otherwise your program might not return the prompts as you expect.

* HINT: It has been a while since we have worked with random numbers explicitly. If you are having troubles, look up Math.random on Google and you should find some resources to help.


*/
