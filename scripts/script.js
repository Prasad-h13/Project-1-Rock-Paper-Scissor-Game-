let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();

// if (!score) {
//   score = {
//     wins: 0,
//     losses: 0,
//     ties:0
//   };




// rule 1 always use action words


//function for auto play button
let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(function() {
      const playerMove = pickCompMove();
      playGame(playerMove);
    }, 1000)
    isAutoPlaying = true;
  } 
  else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

// function for user move button

function playGame(playerMove) {
  const compMove = pickCompMove();

  let result = '';

// condition for scissors
  if (playerMove === 'scissors') {
    if (compMove === 'scissors') {
      result = 'Match Draw';
    } 
    else if (compMove === 'rock') {
      result = 'Computer';
    } 
    else if (compMove === 'paper') {
      result = 'You';
    } 
  }

// condition for paper
  else if (playerMove === 'paper') {

    if (compMove === 'scissors') {
      result = 'Computer';
    } 
    else if (compMove === 'rock') {
      result = 'You';
    } 
    else if (compMove === 'paper') {
      result = 'Match Draw';
    }
  }

// condition for rock
  else if (playerMove === 'rock') {
    if (compMove === 'scissors') {
    result = 'You';
    } 
    else if (compMove === 'rock') {
      result = 'Match Draw';
    } 
    else if (compMove === 'paper') {
      result = 'Computer';
    }
  }

  if (result === 'You') {
    score.wins += 1;
  }
  else if (result === 'Computer') {
    score.losses += 1;
  }
  else if (result === 'Match Draw') {
    score.ties += 1;
  }

  localStorage.setItem('score',JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result')
    .innerHTML = result;

  document.querySelector('.js-move')
    .innerHTML = `You <img src="images/${playerMove}-emoji.png" class="move-icon">
    <img src="images/${compMove}-emoji.png" class="move-icon"> Computer`;
}

//update score function
function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `wins: ${score.wins},Losses: ${score.losses},Ties: ${score.ties}`;
}

// Pick move function
function pickCompMove() {
  const randomNum = Math.random();
  
  let compMove = '';

  if (randomNum >= 0 && randomNum < 1/3) {
    compMove = 'rock';
  } 
  else if (randomNum >= 1/3 && randomNum < 2/3) {
    compMove = 'paper';
  } 
  else if (randomNum >= 2/3 && randomNum < 1) {
    compMove = 'scissors'; 
  }

  return compMove;
}