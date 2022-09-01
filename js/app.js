/*-------------------------------- Constants --------------------------------*/
const squareEls = document.querySelectorAll('.squares')
const messageEl = document.getElementById('message')




/*---------------------------- Variables (state) ----------------------------*/

let board, turn, winner



/*------------------------ Cached Element References ------------------------*/



/*----------------------------- Event Listeners -----------------------------*/



/*-------------------------------- Functions --------------------------------*/

init()

function init(){
  board = [1, -1, null, null, -1, null, null, -1, null]
  turn = 1
  winner = null
  render()
}

function render() { 
  board.forEach((element, index) => {
    element = squareEls[index]
  
    if(board[index]=== -1){
      element.style.backgroundColor = '#A9F0D1'
    } else if (board[index] === 1){
      element.style.backgroundColor = '#FFA69E'
    }else {
      element.style.backgroundColor = '#FFF7F8'
    }
  })
  
  if (winner === null){
    turn === 1 ? messageEl.textContent = `It's Player X's turn` : `It's Player O's turn`
  } else if (winner === 'T'){
    messageEl.textContent = `It's a tie!`
  } else {
    winner === 1 ? messageEl.textContent = `Player X wins!`  : messageEl.textContent = `Player O Wins!`
  }
}