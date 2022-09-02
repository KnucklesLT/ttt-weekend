/*-------------------------------- Constants --------------------------------*/
const squareEls = document.querySelectorAll('.squares')
const messageEl = document.getElementById('message')
const winningCombos =[[0,1,2],
                      [3,4,5],
                      [6,7,8],
                      [0,3,6],
                      [1,4,7],
                      [2,5,8],
                      [0,4,8],
                      [2,4,6]]



/*---------------------------- Variables (state) ----------------------------*/

let board, turn, winner



/*------------------------ Cached Element References ------------------------*/
let boardSquares = document.querySelector('section')
let resetButton = document.querySelector('.reset-button')


/*----------------------------- Event Listeners -----------------------------*/

boardSquares.addEventListener('click',handleClick)
resetButton.addEventListener('click', init)
/*-------------------------------- Functions --------------------------------*/

init()

function init(){
  board = [null, null, null, null, null, null, null, null, null]
  turn = 1
  winner = null
  render()
}

function render() { 
  board.forEach((element, index) => {
    element = squareEls[index]
  
    if(board[index]=== 1){
      element.style.backgroundColor = '#A9F0D1'
      element.textContent = 'X'
    } else if (board[index] === -1){
      element.style.backgroundColor = '#FFA69E'
      element.textContent = 'O'
    }else {
      element.style.backgroundColor = '#FFF7F8'
      element.textContent = ''
    }
  })
  
  if(!winner){
    turn === 1 ? messageEl.textContent=`Player X. Your Turn` : messageEl.textContent = `Player O. Your Turn`
  } else if (winner === 'T'){
    messageEl.textContent = `It's a Tie!`
  } else {
    winner === 1 ? messageEl.textContent='Player X Wins!' : messageEl.textContent = 'Player O Wins!'
  }
}

function handleClick (evt){
  const sqIdx = parseInt(evt.target.id.replace('sq',''))
  if(board[sqIdx] || !!winner) {
    return
  }
  
  board[sqIdx] = turn
  
  turn *= -1

  winner = getWinner()
  render()
}

function getWinner(){
  for(combo of winningCombos){
    if (Math.abs(board[combo[0]] + board[combo[1]] + board[combo[2]]) === 3){
      return board[combo[0]]
    }
  }
  if (!board.includes(null)){
    return 'T'
  }else {
    return null
  }
}