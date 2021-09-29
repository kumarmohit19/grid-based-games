document.addEventListener('DOMContentLoaded',()=>{
    const scoreDisplay=document.getElementById('score')
    const grid = document.querySelector('.grid')
    let squares = []
    let faceAngle=0
    let score = 0
    let maxScore = 274
    const width = 28 // 28 x 28 = 784 grids
    const layout = [ //layout for the grid
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
        4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
        1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
        1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
        1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
        1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
        1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
        1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
        ]
    // 0 - pac-dots
    // 1 - wall
    // 2 - ghost-lair
    // 3 - power-pellet
    // 4 - empty
    function createBoard(){
        for(let i=0;i<layout.length;i++){
            const square = document.createElement('div')
            grid.appendChild(square)
            squares.push(square)

            if(layout[i]===0){
                square.classList.add('pac-dots')
            }
            if(layout[i]===1){
                square.classList.add('wall')
            }
            if(layout[i]===2){
                square.classList.add('ghost-lair')
            }
            if(layout[i]===3){
                square.classList.add('power-pellet')
            }
            if(layout[i]===4){
                square.classList.add('empty')
            }

        }
    }
    createBoard()

    //start position of pacman
    let pacmanCurrentindex = 489
    squares[pacmanCurrentindex].classList.add('pac-man')

    //controls
    function controls(e){
        squares[pacmanCurrentindex].classList.remove('pac-man')
        squares[pacmanCurrentindex].style.transform='rotate(0deg)'
        switch(e.keyCode){
            case 65://left movement
            if(pacmanCurrentindex === 364){
                // console.log(pacmanCurrentindex)
                 pacmanCurrentindex = 391
                 faceAngle =180
             }    
            if(!(pacmanCurrentindex % width == 0) 
                && !(squares[pacmanCurrentindex - 1].classList.contains('wall')) 
                && !(squares[pacmanCurrentindex - 1].classList.contains('ghost-lair'))){
                    pacmanCurrentindex-=1
                    faceAngle =180
                }
            break
            case 68://right movement
                if(pacmanCurrentindex === 391){
                    pacmanCurrentindex = 364
                    faceAngle =0
                }    
                if(!(pacmanCurrentindex % width == (width-1)) 
                    && !(squares[pacmanCurrentindex + 1].classList.contains('wall')) 
                    && !(squares[pacmanCurrentindex + 1].classList.contains('ghost-lair'))){
                        pacmanCurrentindex+=1
                        faceAngle =0
                }  
            break
            case 87://top movement
                if(!(pacmanCurrentindex < width) && 
                !(squares[pacmanCurrentindex - width].classList.contains('wall')) 
                && !(squares[pacmanCurrentindex - width].classList.contains('ghost-lair'))){
                    pacmanCurrentindex-=width
                    faceAngle =-90
                }
            break
            case 83://down movement
                if(!((pacmanCurrentindex + width) > width*width) 
                && !(squares[pacmanCurrentindex + width].classList.contains('wall')) 
                && !(squares[pacmanCurrentindex + width].classList.contains('ghost-lair'))){
                    pacmanCurrentindex+=width
                    faceAngle =90
                }
            break
        }
        squares[pacmanCurrentindex].classList.add('pac-man')
        squares[pacmanCurrentindex].style.transform = 
        `rotate(${faceAngle}deg)`
        pacDotEaten()
        powerPelletEaten()
        checkForGameOver()
        checkForWin()
    }

    document.addEventListener('keydown',controls)
    
    // what happens when you eat a pac-dot
    function pacDotEaten(){
        if(squares[pacmanCurrentindex].classList.contains('pac-dots')){
            squares[pacmanCurrentindex].classList.remove('pac-dots')
            score++
            scoreDisplay.innerText=score
        }
    }
    
    //when pacman eats a power pallet
    function powerPelletEaten(){
        if(squares[pacmanCurrentindex].classList.contains('power-pellet')){
            squares[pacmanCurrentindex].classList.remove('power-pellet')
            score+=10
            scoreDisplay.innerText=score
            ghosts.forEach(ghost => { ghost.isScared = true })
            setTimeout(unScareGhosts,10000)
        }
    }

    //make the ghost stop appearing aquamarine
    function unScareGhosts(){
        ghosts.forEach(ghost => { ghost.isScared = false })
    }

    //create Ghost using Constructor
    class Ghost{
        constructor(className, startIndex, speed){
            this.className = className
            this.startIndex = startIndex
            this.speed = speed
            this.currentIndex = this.startIndex
            this.isScared = false
            this.timerId = NaN
        }
    }

    //my ghosts
    ghosts = [
        new Ghost('blinky',348,250),
        new Ghost('pinky',376,400),
        new Ghost('inky',351,300),
        new Ghost('clyde',379,500)
    ]

    //draw my ghosts on the grid
    ghosts.forEach(ghost => {
        squares[ghost.currentIndex].classList.add(ghost.className)
        squares[ghost.currentIndex].classList.add('ghost')
    })
    //this function returns the X & Y coordinates to make ghost move towards pac-man
    function getCoordinates(index){
        return [(index % width), (Math.floor(index / width))]
    }
    // console.log(getCoordinates(pacmanCurrentindex))
    //move the ghost randomly
    ghosts.forEach(ghost => moveGhost(ghost))

    function moveGhost(ghost){
        const directions =[-1,+1,-width,+width]
        let direction = directions[Math.floor(Math.random() * directions.length)]
        ghost.timerId = setInterval(function(){
            //if the next square your ghost is going to is not a wall or another ghost, you can go there
              if(!squares[ghost.currentIndex + direction].classList.contains('wall') 
                && !squares[ghost.currentIndex + direction].classList.contains('ghost')){
                //you can go here
                //remove the ghost related class
                squares[ghost.currentIndex].classList.remove(ghost.className,'ghost','scared-ghost')
                //now we will check if the ghost new direction is closer to pac-man
                let [ghostX,ghostY] = getCoordinates(ghost.currentIndex)
                // console.log(ghostX,ghostY)
                let [pacmanX,pacmanY] = getCoordinates(pacmanCurrentindex)
                // console.log(pacmanX,pacmanY)
                let [ghostNewX,ghostNewY] = getCoordinates(ghost.currentIndex + direction)
                // console.log(ghostNewX,ghostNewY)
                function isXCoorCloser(){
                    if(Math.abs(ghostNewX - pacmanX) > Math.abs(ghostX - pacmanX)){
                        // console.log((ghostNewX - pacmanX) > (ghostX - pacmanX))
                        return false
                    }else return true
                }

                function isYCoorCloser(){
                    if(Math.abs(ghostNewY - pacmanY) > Math.abs(ghostY - pacmanY)){
                        // console.log((ghostNewY - pacmanY) > (ghostY - pacmanY))
                        return false
                    }else return true
                }       

                if (isXCoorCloser() || isYCoorCloser()) {
                    //change the currentIndex to new safe and closer square
                    ghost.currentIndex +=direction
                    //redraw ghost in the new safe and closer zone
                    squares[ghost.currentIndex].classList.add(ghost.className,'ghost')
                } else {
                    squares[ghost.currentIndex].classList.add(ghost.className,'ghost')
                    direction=directions[Math.floor(Math.random() * directions.length)] 
                }  
                //else find a new direction
            }else direction=directions[Math.floor(Math.random() * directions.length)] 
            
            //if the ghost currently Scared
            if(ghost.isScared){
                squares[ghost.currentIndex].classList.add('scared-ghost')
            }

            //if the ghosts are scared and packman runs into it
            if(ghost.isScared && squares[ghost.currentIndex].classList.contains('pac-man')){
                squares[ghost.currentIndex].classList.remove(ghost.className,'ghost','scared-ghost')
                ghost.currentIndex = ghost.startIndex
                maxScore+=100
                score+=100
                scoreDisplay.innerText=score
                squares[ghost.currentIndex].classList.remove(ghost.className,'ghost')
            }
            checkForGameOver()
        },ghost.speed)
    }

    //check for game over function
    function checkForGameOver(){
        if(squares[pacmanCurrentindex].classList.contains('ghost') 
        && !squares[pacmanCurrentindex].classList.contains('scared-ghost')){
            ghosts.forEach(ghost => clearInterval(ghost.timerId))
            document.removeEventListener('keydown',controls)
            // setTimeout(function(){alert("GAME OVER")},500)
            scoreDisplay.innerText="GAME OVER!!"
        }
    }

    function checkForWin(){
        if(score === maxScore){
            ghosts.forEach(ghost => clearInterval(ghost.timerId))
            document.removeEventListener('keydown',controls)
            scoreDisplay.innerText="YOU WIN!!"
        }
    }
    
















})