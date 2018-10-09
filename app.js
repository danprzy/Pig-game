/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores = [null, 0, 0];
var roundScore = 0;
var activePlayer = 1; // 1 - first player, 2 - second player
var diceDOM = document.querySelector('.dice')


document.querySelector('.dice').style.display = 'none';

document.getElementById('score-1').textContent = '0';
document.getElementById('score-2').textContent = '0';
document.getElementById('current-1').textContent = '0';
document.getElementById('current-2').textContent = '0';


document.querySelector('.btn-roll').addEventListener('click', function() {
    // dice, random number
    var dice = Math.floor(Math.random() * 6) + 1;

    // display result
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    //Update round score if the rolled mumber is != 1 
    if (dice !== 1) {
        // add score
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
        // next player
        nextPlayer();
    }
});

console.log(roundScore);

document.querySelector('.btn-hold').addEventListener('click', function() {
    // add current score to global scope
    scores[activePlayer] += roundScore;
    console.log('active player ' + activePlayer);

    // update user interface
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

    // check if player won the game
    if (scores[activePlayer] >= 10) {
        document.getElementById('name-' + activePlayer).textContent = 'Winner';
        diceDOM.style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    } else {
        // next player
        nextPlayer();
    };
});

function nextPlayer() {
    activePlayer === 1 ? activePlayer = 2 : activePlayer = 1;
    roundScore = 0;

    document.getElementById('current-1').textContent = '0';
    document.getElementById('current-2').textContent = '0';

    document.querySelector('.player-1-panel').classList.toggle('active');
    //document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-2-panel').classList.toggle('active');
    //document.querySelector('.player-1-panel').classList.add('active');
    diceDOM.style.display = 'none';
};