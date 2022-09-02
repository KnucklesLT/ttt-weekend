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
let resetBtnEl = document.querySelector('.reset-button')
let introHeader = document.querySelector('h1')

/*----------------------------- Event Listeners -----------------------------*/

boardSquares.addEventListener('click',handleClick)
resetBtnEl.addEventListener('click', init)
/*-------------------------------- Functions --------------------------------*/

init()

function init(){
  board = [null, null, null, null, null, null, null, null, null]
  turn = 1
  winner = null
  
  render()
}

function render() { 
  introHeader.setAttribute('class',"animate__animated animate__bounce")

  board.forEach((element, index) => {
    element = squareEls[index]
  
    if(board[index]=== 1){
      element.style.backgroundColor = '#b56576'
      element.textContent = 'X'
    } else if (board[index] === -1){
      element.style.backgroundColor = '#6d597a'
      element.textContent = 'O'
    }else {
      element.style.backgroundColor = '#355070'
      element.textContent = ''
    }
  })
  
  if(!winner){
    turn === 1 ? messageEl.textContent=`Player X. Your Turn`  : messageEl.textContent = `Player O. Your Turn`
  } else if (winner === 'T'){
    messageEl.textContent = `It's a Tie!`
    messageEl.className = "animate__animated animate__rubberBand"
    squareEls.forEach(element => (element.textContent='👔', element.style.backgroundColor = "#eaac8b"))
  } else {
    winner === 1 ? messageEl.textContent='Player X Wins!' : messageEl.textContent = 'Player O Wins!'
    squareEls.forEach(element => winner === 1 ? (element.textContent = 'X' , element.style.backgroundColor = '#b56576') 
                                              : (element.textContent = 'O', element.style.backgroundColor = '#6d597a'))
    confetti.start(2000)
  }
}

function handleClick (evt){
  const sqIdx = parseInt(evt.target.id.replace('sq',''))
  if(board[sqIdx] || !!winner) {
    messageEl.textContent = 'Space already taken!'
    messageEl.setAttribute('class','animate__animated animate__tada')
    
    return
  }
  messageEl.setAttribute('class', ' ')

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