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
            playersArray[2].printStats();
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
    console.log("\n\n");
    console.log(`${playersArray[0].name} and ${playersArray[1].name} play a game!`);
    var randOne = Math.floor(Math.random() * 20) + 1;
    var randTwo = Math.floor(Math.random() * 20) + 1;
    // console.log(`1: ${randOne}; 2: ${randTwo}`);
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
    if (!swapPlayers) {
        console.log("No score so no player swap chance...");
        finishGame();
    } else { // TODO: Remove the prompt to swap players on the last game
        inquirer.prompt([{
            type: "list",
            name: "pos",
            message: "Swap a player for an alternate?",
            choices: ["0", "1", "Do not substitute"]
        }]).then(ans => {
            // console.log(ans);
            if (ans.pos === "Do not substitute") {
                console.log("OK, not substituting");
            } else {
                swapPlayer(parseInt(ans.pos, 10));
            }
            finishGame();
        })
    }
}

function finishGame() {
    console.log("Next game starts in 1 second");
    if (playersArray.gamesPlayed < 5) {
        playersArray.gamesPlayed++;
        setTimeout(playGame, 1 * 1000);
    } else {
        console.log(`Five games have been played! Score: ${playersArray.score}`);
        if (playersArray.score > 0) {
            console.log("Good game! Starter stats go UP!");
            for (let i = 0; i < playersArray.length - 1; i++) {
                playersArray[i].goodGame();
            }
        }
        else if (playersArray.score < 0) {
            console.log("TERRIBLE GAME! Starter stats go DOWN!");
            for (let i = 0; i < playersArray.length - 1; i++) {
                playersArray[i].badGame();
            }
        }
        else {
            console.log("Mediocre game. Starts stay the same");
        }
        inquirer.prompt([{
            type: "list",
            name: "again",
            message: "Play again?",
            choices: ["yes", "no"]
        }]).then(ans => {
            if (ans.again === "yes") {
                // reset (move this logic)
                playersArray = [];
                playersArray.score = 0; // let's give the array a property. NEVER DO THIS.
                playersArray.gamesPlayed = 0; // let's give the array a property. NEVER DO THIS.
                makeAPlayer();
            } else {
                console.log("G A M E  O V E R");
                console.log("G A M E  O V E R");
                console.log("G A M E  O V E R");
            }
        })


    }

}

function swapPlayer(index) {
    console.log(`Swapping sub for player in index ${index}`);
    var tempPlayer = playersArray[index];
    playersArray[index] = playersArray[2];
    playersArray[2] = tempPlayer;
    // TODO: this is not DRY refactor
    for (let i = 0; i < playersArray.length - 1; i++) { // sub is the end of the array
        playersArray[i].printStats();
    }
    playersArray[2].printStats();
}

function printTeam() {
    console.log("= = = = Team Stats = = = =");
    for (let i = 0; i < playersArray.length - 1; i++) { // sub is the end of the array
        playersArray[i].printStats();
    }
    playersArray[2].printStats();
    console.log("= = = = = = = = = = = = = =");

}

makeAPlayer();

/*

  * After the game has finished (been run 5 times):
    * If the score is positive, run `goodGame` for all of the players currently within the starters array.
    * If the score is negative, run `badGame` for all of the players currently within the starters array.
    * If the score is equal to zero, do nothing with the starters.
    * Give the user a message about if they won, and the status of their starters.
    * After printing the results, ask the user if they would like to play again.
      * Run `playGame` from the start once more if they do.
      * End the program if they don't.


*/
