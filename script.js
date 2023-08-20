let numPlayers =  window.prompt('How many Players?')
if (numPlayers < 1) {
  window.alert('Please enter a valid number of players')
  window.location.reload();
}
let players = Array.from({length:numPlayers}, (player,index) => player = window.prompt(`Name of player number ${index + 1}`))

//Test
// let numPlayers = 3;
// let players = ['Hossam', 'Ali', 'Muhammad'];

let playerObjects = players.map((e) => {
  return {
    name: e,
    score: 0,
    isLoser: false,
    isWinner: false,
  };
});

let playersDiv = document.getElementById('players');
let form = document.getElementById('form');


playerObjects.forEach((player) => {
  let playerDiv = document.createElement('div');
  playerDiv.innerHTML = `<div class="player">
  <h3>${player.name}</h3>
  <div class='scores'>
  <p class="score">${player.score}</p>
  </div>
  <input value='0' min='0' type="number" />
  </div>`;
  playersDiv.appendChild(playerDiv);
});

let inputs = document.querySelectorAll('input');
let playersDivsScores = document.querySelectorAll('.player .scores');
let playersDivs = document.querySelectorAll('.player');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  playersDivs.forEach((e) => {
    e.classList.remove('winner');
    e.classList.remove('loser');
  });
  let scores = [];

  inputs.forEach((e) => scores.push(+e.value));

  playerObjects = playerObjects.map((player, index) => ({
    ...player,
    score: player.score + scores[index],
    isWinner: false,
    isLoser: false,
  }));
  compare();
  playerObjects.forEach((player, index) => {
    let score = document.createElement('p');
    score.className = 'score';
    if (player.isLoser) playersDivs[index].classList.add('loser');
    if (player.isWinner) playersDivs[index].classList.add('winner');
    score.innerText = player.score;
    playersDivsScores[index].appendChild(score);
  });
  inputs.forEach(input => input.value = 0)
});

function compare() {
  playerObjects.at(
    playerObjects
      .map((e) => e.score)
      .indexOf(
        playerObjects
          .map((e) => e.score)
          .reduce((a, b) => Math.max(a, b), -Infinity)
      )
  ).isWinner = true;
  playerObjects.at(
    playerObjects
      .map((e) => e.score)
      .indexOf(
        playerObjects
          .map((e) => e.score)
          .reduce((a, b) => Math.min(a, b), Infinity)
      )
  ).isLoser = true;
}

let reset = document.getElementById('reset')
reset.addEventListener('click', (e) =>{
  e.preventDefault()
  playersDivs.forEach((e) => {
    e.classList.remove('winner');
    e.classList.remove('loser');
  });
  playerObjects = playerObjects.map((player, index) => ({
    ...player,
    score: 0,
    isWinner: false,
    isLoser: false,
  }));
  playerObjects.forEach((player, index) => {
    let score = document.createElement('p');
    score.className = 'score';
    score.innerText = player.score;
    playersDivsScores[index].appendChild(score);
  });
  inputs.forEach(input => input.value = 0)
})