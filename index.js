const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score')

let score = 0

const blockWidth = 100
const blockHeight = 20

const boardWidth = 560
const boardHeight = 300

const ballDiameter = 20

const ballStart = [270, 40]
let ballCurrentPosition = ballStart

const userStart = [230, 10]
let currentPosition = userStart

let xDirection = -2
let yDirection = 2

//defining the dimensions of each block
class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis]
        this.bottomRight = [xAxis + blockWidth, yAxis]
        this.topLeft = [xAxis, yAxis + blockHeight]
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
    }
}

//creating all of the target blocks
const blocks = [
    new Block(10,270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),
    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210),
]

//adding all of the blocks to the HTML file
function addBlocks() {
    for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement('div')
    block.classList.add('block')

    //defining the bottom-left anchor point for each block. Width and height are define in CSS
    block.style.left = blocks[i].bottomLeft[0] + 'px'
    block.style.bottom = blocks[i].bottomLeft[1] + 'px'
    grid.appendChild(block)
}}

addBlocks()

//create bouncing platform
const user = document.createElement('div')
user.classList.add('user')
drawUser()
grid.appendChild(user)

//draw the bouncing platform
function drawUser() {
    user.style.left = currentPosition[0]+'px'
    user.style.bottom = currentPosition[1]+'px'
}

//move user
function moveUser(e) {
    switch(e.key) {
        case 'ArrowLeft':
            if (currentPosition[0]>0) {
            currentPosition[0] -= 10
            drawUser()}
            break;
        case 'ArrowRight':
            if (currentPosition[0]<boardWidth-blockWidth) {
            currentPosition[0] += 10
            drawUser()}
            break;
    }
}

document.addEventListener('keydown', moveUser)

//create ball
const ball = document.createElement('div')
ball.classList.add('ball')
drawBall()
grid.appendChild(ball)

//draw ball
function drawBall() {
    ball.style.left = ballCurrentPosition[0] + 'px'
    ball.style.bottom = ballCurrentPosition[1] + 'px'
}

//move ball
function moveBall() {
    ballCurrentPosition[0] += xDirection
    ballCurrentPosition[1] += yDirection
    drawBall()
    checkForCollisions()
}

timerID = setInterval(moveBall, 20)

//check for collisions
function checkForCollisions() {
    //check for wall collisions
    if (ballCurrentPosition[0]<=0 || ballCurrentPosition[0]+ballDiameter>=boardWidth || ballCurrentPosition[1]+ballDiameter>=boardHeight){
        changeDirection()
    }
    //check for platform collision
    if (ballCurrentPosition[1] == currentPosition[1]+blockHeight &&
        ballCurrentPosition[0] >= currentPosition[0] &&
        ballCurrentPosition[0] <= currentPosition[0]+ blockWidth) {
        changeDirection()
    }
    //game over
    if (ballCurrentPosition[1] < 0) {
        clearInterval(timerID)
        document.removeEventListener('keydown', moveUser)
        scoreDisplay.innerHTML = 'You lose =('
    }
    //check for user platform collision
    if(ballCurrentPosition[0] > currentPosition[0] &&
        ballCurrentPosition[0] < currentPosition[0]+ blockWidth &&
        ballCurrentPosition[1] > currentPosition[1] &&
        ballCurrentPosition[1] < currentPosition[1]+ blockHeight) {
            changeDirection()
        }
    for (let i = 0; i < blocks.length; i++){
    //check for block collision
    if (ballCurrentPosition[0] > blocks[i].bottomLeft[0] &&
        ballCurrentPosition[1] + ballDiameter > blocks[i].bottomLeft[1] &&
        ballCurrentPosition[0] < blocks[i].bottomRight[0] &&
        ballCurrentPosition[1] < blocks[i].topLeft[1])
        {
        const allBlocks = Array.from(document.querySelectorAll('.block'))
        allBlocks[i].classList.remove('block')
        blocks.splice(i,1)
        changeDirection()   
        score++
        scoreDisplay.innerHTML = score
        }}
    if (blocks.length == 0) {
        scoreDisplay.innerHTML = 'You WIN!!!'
        clearInterval(timerID)
        document.removeEventListener('keydown', moveUser)}
}
checkForCollisions()

  

function changeDirection() {
    if (xDirection === 2 && yDirection === 2) {
      yDirection = -2
      return
    }
    if (xDirection === 2 && yDirection === -2) {
      xDirection = -2
      return
    }
    if (xDirection === -2 && yDirection === -2) {
      yDirection = 2
      return
    }
    if (xDirection === -2 && yDirection === 2) {
      xDirection = 2
      return
    }
  }

