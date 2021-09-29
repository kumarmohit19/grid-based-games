document.addEventListener('DOMContentLoaded', () => {

    const startBtn = document.querySelector('button')
    const grid = document.querySelector('.grid')
    ///let squares = document.querySelectorAll('grid div') or we can do this
    const displaySquares = document.querySelectorAll('.previous-grid div')
    const displayScore = document.querySelector('.score')
    const lineCleared = document.querySelector('.lines-display')
    let squares = Array.from(grid.querySelectorAll('div'))
    const GRID_WIDTH = 10
    const GRID_HEIGHT = 20
    let currentPosition = 4
    const width = 10
    let nextRandom = 0
    let timerId
    let score = 0
    let lines = 0
    let currentIndex = 0


    //assign functions to the keycodes
    function control(e) {
        if (e.keyCode === 39)
          moveRight()
        else if (e.keyCode === 38)
          rotate()
        else if (e.keyCode === 37)
          moveLeft()
        else if (e.keyCode === 40)
          moveDown()
      }

    document.addEventListener('keydown',control)
    //The Tetrominoes
  const lTetromino = [
    [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, 2],
    [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 2],
    [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 2],
    [GRID_WIDTH, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1, GRID_WIDTH * 2 + 2]
  ]

  const zTetromino = [
    [0, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
    [GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1],
    [0, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
    [GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1]
  ]

  const tTetromino = [
    [1, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2],
    [1, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 1],
    [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 1],
    [1, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1]
  ]

  const oTetromino = [
    [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
    [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
    [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
    [0, 1, GRID_WIDTH, GRID_WIDTH + 1]
  ]

  const iTetromino = [
    [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 3 + 1],
    [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH + 3],
    [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 3 + 1],
    [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH + 3]
  ]

  const theTetrominoes = [lTetromino, zTetromino, iTetromino, oTetromino, tTetromino]

  //randomly select a tetramino from the array

  let random = Math.floor(Math.random() * theTetrominoes.length)
  let currentRotation = 0
  let current = theTetrominoes[random][currentRotation]

  //draw the shape
  function draw(){
      current.forEach(index => squares[currentPosition + index].classList.add('block'))
  }

  //undraw the shape
  function undraw() {
    current.forEach(index => squares[currentPosition + index].classList.remove('block'))
  }

  //move the shape down
  function moveDown() {
      undraw()
      currentPosition = currentPosition += GRID_WIDTH
      draw()
      freeze()
  } 

  // move left and prevent collision with shapes moving left
  function moveRight() {
      undraw()
      const isAtRightEdge = current.some( index => (currentPosition + index ) % width === width - 1 )
      if (!isAtRightEdge) currentPosition += 1
      if(current.some(index => squares[currentPosition + index].classList.contains('block2'))){
          currentPosition -= 1
      }
      draw()
  }

  // move right and prevent collision with shapes moving right
  function moveLeft() {
    undraw()
    const isAtLeftEdge = current.some( index => (currentPosition + index ) % width === 0 )
    if (!isAtLeftEdge) currentPosition -= 1
    if(current.some(index => squares[currentPosition + index].classList.contains('block2'))){
        currentPosition += 1
    }
    draw()
}

    //rotate Tetromino
    function rotate() {
        undraw()
        currentRotation++
        if (currentRotation === current.length){
            currentRotation = 0
        }
        current = theTetrominoes[random][currentRotation]
        draw()
    }

    // show previous Tetromino is displaySquares
    const displayWidth = 4 
    const displayIndex = 0
    

    const smallTetromino = [
        [1, displayWidth + 1, displayWidth * 2 + 1, 2], /* lTetromino */
        [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], /* zTetromino */
        [1, displayWidth, displayWidth + 1, displayWidth + 2], /* tTetromino */
        [0, 1, displayWidth, displayWidth + 1], /* oTetromino */
        [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1] /* iTetromino */
    ]

    function displayShape() {
        displaySquares.forEach(square => {
            square.classList.remove('block')
        })
        smallTetromino[nextRandom].forEach( index => displaySquares[displayIndex + index].classList.add('block'))
    }

    // freeze the shape
    function freeze(){
        if(current.some( index =>  squares[currentPosition + index + width].classList.contains('block3') ||
        squares[currentPosition + index + width].classList.contains('block2')
            )){
                current.forEach( index => squares[index + currentPosition].classList.add('block2'))

                random = nextRandom
                nextRandom = Math.floor(Math.random() * theTetrominoes.length)
                current = theTetrominoes[random][currentRotation]
                currentPosition = 4
                draw()
                displayShape()
                gameOver()
                addScore()
            }
    }

    startBtn.addEventListener('click', () => {
        if(timerId){
            clearInterval(timerId)
            timerId = null

        }else{
            draw()
            timerId = setInterval(moveDown, 1000)
            nextRandom = Math.floor(Math.random() * theTetrominoes.length)
            displayShape()
        }
    })

    //game over
    function gameOver(){
        if(current.some(index => squares[currentPosition + index].classList.contains('block2'))){
            score.innerHTML = 'end'
            clearInterval(timerId)


        }
    }

    //add score 
    function addScore(){
        for( currentIndex = 0; currentIndex < 199 ; currentIndex += width){
            const row = [currentIndex, currentIndex + 1, currentIndex + 2, currentIndex + 3,currentIndex + 4,
                currentIndex + 5, currentIndex + 6, currentIndex + 7,currentIndex + 8, currentIndex + 9]

            if(row.every(index => squares[index].classList.contains('block2'))){
                score +=10
                lines +=1
                displayScore.innerHTML = score
                lineCleared.innerHTML = lines
                row.forEach(index => {
                    squares[index].classList.remove('block2') || squares[index].classList.remove('block')
                })

                //splice Array
                const squaresRemoved = squares.splice(currentIndex, width)
                squares = squaresRemoved.concat(squares)
                squares.forEach( cell => grid.appendChild(cell) )

            }
        }
    }
})