
// General DOM links
const genMessage = document.getElementById('genMessage')
const choosePlayerNum = document.getElementById('choosePlayerNum')
const select2Player = document.getElementById('select2Player')
const newGame = document.getElementById('newGame')

// Player 1 DOM links
const player1 = document.getElementById('player1')
const playerName1 = document.getElementById('playerName1')
const playerMessage1 = document.getElementById('playerMessage1')
const dice1 = document.getElementById('dice1')
const score1 = document.getElementById('score1')
const roleDice1 = document.getElementById('roleDice1')
const player1DiceImage = document.getElementById('player1DiceImage')

// Player 2 DOM links
const player2 = document.getElementById('player2')
const playerName2 = document.getElementById('playerName2')
const playerMessage2 = document.getElementById('playerMessage2')
const dice2 = document.getElementById('dice2')
const score2 = document.getElementById('score2')
const roleDice2 = document.getElementById('roleDice2')
const player2DiceImage = document.getElementById('player2DiceImage')

// Total Score Variables
let scoreTotPlayer1 = 0
let scoreTotPlayer2 = 0

// Object litterals used to old variables and mthods.
// Wasnt clear what classes might be needed, hence decided to
// adopt object litterals.
// Refactoring would implement classes


// *** Control game state
gameControl = {
    playerMode: '1player',
    turn: 1,
    modeCheck(){
        console.log(`this.playerMode  --> ${this.playerMode}`)
        if(this.playerMode === '2player'){
            if(this.turn == 1){
                roleDice1.disabled = true
                console.log(`roleDice1.disabled ++  ${roleDice1.disabled}`)
                roleDice2.disabled = false
                console.log(`roleDice2.disabled ++  ${roleDice2.disabled}`)
                this.turn = 2
            }
            else{
                roleDice1.disabled = false
                roleDice2.disabled = true
                this.turn = 1
                console.log(`roleDice1.disabled --  ${roleDice1.disabled}`)
                console.log(`roleDice2.disabled --  ${roleDice2.disabled}`)
            }

        }
        else{
            roleDice2.disabled = true
        }
    }
}



// *** Player stuff
thePlayer1 = {
    playerNumber:1,
    name: 'Bob Haskins',   // name not yet ustilised
    scoreTot: 0,
    state: 'playing',
    setDiceNumer: ()=>{player1DiceImage.src = diceSidePic}
}

thePlayer2 = {
    playerNumber:2,
    name: 'Mary Popins',   // name not yet ustilised
    scoreTot: 0,
    state: 'playing',
    setDiceNumer: ()=>{player2DiceImage.src = diceSidePic}
}


// *** Dice Stuff
dice = {
    getDicePic: (score) =>{
        score = score -1  // as array starts at 0
        const diceSides = ["1.png","2.png","3.png","4.png","5.png","6.png"]
        let pic  = "./img/dice" + diceSides[score]
        return pic
    },

    diceRolling: ()=> {return Math.floor((Math.random()* 6) + 1)}

}




// TESTING
// -------
// let test = diceRoll()
// console.log(`dice roll  ${test}`)
// let testSide = getDicePic(test)
// console.log(`getDicePic  ${testSide}`)
// console.log(`displayDice`)
// displayDice(2,testSide)


// **** MAIN GAME PLAY  ****
// keep rolling , score adds up
const gamePlay = (player, diceId, scoreId, playerMessage)=> {
    // player --> e.g. thePlayer1 object   ,  playerID --> eg. player1
    console.log(`player.state   ${player.state}\n   player.scoreTot ${player.scoreTot}\n   player.name  ${player.name}\n  player.playerNumber  ${player.playerNumber}`)
        
    // roll dice
        let theScore = dice.diceRolling()
        diceId.src = dice.getDicePic(theScore)
        console.log(`theScore  ${theScore}`)

        // Check if 1
        if(theScore === 1){
            console.log(`game over - loose`)
            player.scoreTot = 0
            player.state = "Loose"  
            playerMessage.textContent = player.state
            return "loose"
        }

        if(player.scoreTot > 20){
            console.log(`game WIN`)
            player.state = "Win"
            playerMessage.textContent = player.state
            return "win"
        }
        // need to have 'turn' in the message
        player.scoreTot = player.scoreTot + theScore
        scoreId.value = player.scoreTot
        scoreId.textContent = player.scoreTot
        gameControl.modeCheck()
        console.log(`gameControl.playerMode  --> ${gameControl.playerMode}`)
        console.log(`gameControl.turn   --> ${gameControl.turn}`)
        playerMessage.textContent = player.state
        


}




// *** To initialise the Game
// set to default game values and state
const init = ()=>{
    player2.classList.add('hide')
    gameControl.playerMode = '1player'
    thePlayer1.state = "Playing"
    thePlayer2.state = 'notPlaying'
    thePlayer1.scoreTot = 0
    thePlayer2.scoreTot = 0
    score1.textContent = "?"
    score2.textContent = "?"
    playerMessage1.textContent = thePlayer1.state
    playerMessage2.textContent = thePlayer2.state
    gameControl.modeCheck()
    console.log(`***  init  ****`)
    console.log(`thePlayer1.state    ${thePlayer1.state}`)
    console.log(`thePlayer2.state    ${thePlayer2.state}`)
    console.log(`thePlayer1.scoreTot   ${thePlayer1.scoreTot}`)
    console.log(`thePlayer2.scoreTot   ${thePlayer2.scoreTot}`)
}



//  *** DICE IS ROLLED */
// Listen to player dice roll button and 
// communicate the dice info with the player object
roleDice1.addEventListener('click' , ()=>{
    console.log(`role Dice 1`)
    gamePlay(thePlayer1, player1DiceImage, score1, playerMessage1)
    })
    

roleDice2.addEventListener('click' , ()=>{
        console.log(`role Dice 2`)
    gamePlay(thePlayer2, player2DiceImage, score2, playerMessage2)
    })
    



// **** 2 PLAYER MODE is selected
// Communicate this to the player and game state objects
select2Player.addEventListener('click' ,()=>{
        console.log(`change player numbers  select2Player.checked ${select2Player.checked}`)
        if(select2Player.checked === false){
            console.log('1 player')
            thePlayer2.state = 'notPlaying'
            player2.classList.add('hide')
            gameControl.playerMode = '1player'
            

        } else{
            console.log('2 players')
            thePlayer2.state = 'playing'
            player2.classList.remove('hide')
            gameControl.playerMode = '2player'
        }

        console.log(`thePlayer1 state ${thePlayer1.state}`)
        console.log(`thePlayer2 state ${thePlayer2.state}`)
        console.log(`gameControl.playerMode  ${gameControl.playerMode}`)
        console.log(`gameControl.turn   ${gameControl.turn}`)
        
    
    })


// *** When new game is clicked , reset the game
newGame.addEventListener('click', ()=>{
    console.log(`new game ****`)
    init()
})



// *** Initialise
// Game state should allways be initialised
init()



// *****************************
// Dice Game
// *****************************

// There are two parts to this project:
// 	single player 
// 	multiplayer players

// Single player dice game:
//      Roll the dice to begin the game.
//      The dice appears on the first roll.
//      Each time the dice is rolled the score adds up.
//      If the score passes 20, you win.
//      If you roll a 1 at any time, you lose and the game restarts.


// Multiplayer dice game:
//      Rules are the same as the single player version, 
//      but you must display a dice for each player, and 
//      it must highlight the current player and keep their score. 



// *****************************
// NEW FEATURES
// *****************************

// Improved UX/UI
//   Visuals: Dice rolling
//   choose colour theme of game (dice, background)

//   Audio: Dice roll, win, loose, start

// Player Info
//  Save (JSON file to localStorage)
//      game state
//      game scores (name, number of games won and lost etc)
//      colour theming
//  Save (to Database via a RESTfull api)
//      game state
//      game scores (name, number of games won and lost etc)
//      colour theming
// Setup Up the above as a javascript module so
// I can import the same functionality into other projects








