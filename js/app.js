// goal: create a side scroller game using HTML, CSS, and JS with Canvas

// grab DOM elements for future use
const game = document.getElementById('canvas')
const movement = document.getElementById('movement')
const message = document.getElementById('status')
const score = document.getElementById('score')
const points = document.getElementById('points')
const healthText = document.getElementById('healthText')
const healthStatus = document.getElementById('health')
const gameTitle = document.querySelector('#game-title')
const main = document.querySelector('#main')
const instructions = document.querySelector('.instructions')
const start = document.querySelector('#start')
const restart = document.querySelector('#restart')

// variable to indicate whether the game has started
// initialize with false
let gameStart = false


// function to keep track of points (aliens eaten)
const scorePoints = () => { return parseInt(points.innerText,10)}

// functions to decrease and increase player health when hitting objects
const decreaseHealth = () => { return parseInt(healthStatus.innerText, 10)}
const increaseHealth = () => { return parseInt(healthStatus.innerText, 10)}

// context for canvas
const ctx = game.getContext('2d')


// object to define user player character (Jimmy the Shark)
class playerCharacter {
    constructor(x, y, color, width, height) {
        this.x = x,
        this.y = y,
        this.color = color,
        this.width = width,
        this.height = height,
        this.alive = true,
        this.speed = 40,
        this.image = document.getElementById('playerShark'),
        this.direction = {
            up: false,
            down: false,
            left: false,
            right: false
        },
        this.setDirection = function (key) {
            if (key.toLowerCase() == 'w') { this.direction.up = true }
            if (key.toLowerCase() == 'a') { this.direction.left = true }
            if (key.toLowerCase() == 's') { this.direction.down = true }
            if (key.toLowerCase() == 'd') { this.direction.right = true }
        },
        this.unsetDirection = function (key) {
            if (key.toLowerCase() == 'w') { this.direction.up = false }
            if (key.toLowerCase() == 'a') { this.direction.left = false }
            if (key.toLowerCase() == 's') { this.direction.down = false }
            if (key.toLowerCase() == 'd') { this.direction.right = false }
        },
        this.moveShark = function () {
            if (this.direction.up) {
                this.y -= this.speed
                if (this.y <= 0) {
                    this.y = 0
                }
            }
            if (this.direction.left) {
                this.x -= this.speed
                if (this.x <= 0) {
                    this.x = 0
                }
            }
            if (this.direction.down) {
                this.y += this.speed
                if (this.y + this.height >= game.height) {
                    this.y = game.height - this.height
                }
            }
            if (this.direction.right) {
                this.x += this.speed
                if (this.x + this.width >= game.width) {
                    this.x = game.width - this.width
                }
            }
        },
        this.render = function () {
            ctx.fillStyle = this.color
            // hit box for player character - leave commented out unless testing
            // ctx.fillRect(this.x, this.y, this.width, this.height)
            ctx.drawImage(this.image, this.x, (this.y - 50))
        }
    }
}


// object to define alien enemy type 1
class enemyAlien1 {
    constructor(x, y, color, width, height) {
        this.x = x,
        this.y = y,
        this.color = color,
        this.width = width,
        this.height = height,
        this.alive = true,
        this.image = document.getElementById('alienEnemy'),
        this.render = function () {
            ctx.fillStyle = this.color
            // ctx.fillRect(this.x, this.y, this.width, this.height)
            ctx.drawImage(this.image, (this.x - 20), (this.y - 25))
        }
    }
}

// object to define alien enemy type 2
class enemyAlien2 {
    constructor(x, y, color, width, height) {
        this.x = x,
        this.y = y,
        this.color = color,
        this.width = width,
        this.height = height,
        this.alive = true,
        this.image = document.getElementById('alien2'),
        this.render = function () {
            ctx.fillStyle = this.color
            // ctx.fillRect(this.x, this.y, this.width, this.height)
            ctx.drawImage(this.image, (this.x - 34), (this.y - 38))
        }
    }
}

// object to define alien enemy type 3
class enemyAlien3 {
    constructor(x, y, color, width, height) {
        this.x = x,
        this.y = y,
        this.color = color,
        this.width = width,
        this.height = height,
        this.alive = true,
        this.image = document.getElementById('alien3'),
        this.render = function () {
            ctx.fillStyle = this.color
            // ctx.fillRect(this.x, this.y, this.width, this.height)
            ctx.drawImage(this.image, (this.x - 30), (this.y - 15))
        }
    }
}

// object to define asteroid enemy type 1
class enemyAsteroid1 {
    constructor(x, y, color, width, height) {
        this.x = x,
        this.y = y,
        this.color = color,
        this.width = width,
        this.height = height,
        this.alive = true,
        this.image = document.getElementById('asteroid1'),
        this.render = function () {
            ctx.fillStyle = this.color
            // ctx.fillRect(this.x, this.y, this.width, this.height)
            ctx.drawImage(this.image, (this.x - 50), (this.y - 38), 300, 300)
        }
    }
}

// object to define asteroid enemy type 2
class enemyAsteroid2 {
    constructor(x, y, color, width, height) {
        this.x = x,
        this.y = y,
        this.color = color,
        this.width = width,
        this.height = height,
        this.alive = true,
        this.image = document.getElementById('asteroid2'),
        this.render = function () {
            ctx.fillStyle = this.color
            // ctx.fillRect(this.x, this.y, this.width, this.height)
            ctx.drawImage(this.image, (this.x - 37), (this.y - 60), 200, 200)
        }
    }
}

// object to define asteroid enemy type 3
class enemyAsteroid3 {
    constructor(x, y, color, width, height) {
        this.x = x,
        this.y = y,
        this.color = color,
        this.width = width,
        this.height = height,
        this.alive = true,
        this.image = document.getElementById('asteroid3'),
        this.render = function () {
            ctx.fillStyle = this.color
            // ctx.fillRect(this.x, this.y, this.width, this.height)
            ctx.drawImage(this.image, (this.x - 43), (this.y - 45), 200, 200)
        }
    }
}


// create character objects
const shark = new playerCharacter(50, 280, 'white', 125, 75)
let alien = new enemyAlien1(1500, 300, 'purple', 67, 55)
let alien2 = new enemyAlien2(2000, 100, 'purple', 65, 52)
let alien3 = new enemyAlien3(3500, 480, 'purple', 62, 70)
let asteroid = new enemyAsteroid1(1600, 300, 'blue', 175, 175)
let asteroid2 = new enemyAsteroid2(4000, 10, 'blue', 110, 70)
let asteroid3 = new enemyAsteroid3(2800, 250, 'blue', 100, 95)


// movement event listeners to move player character on pressing WASD
document.addEventListener('keydown', (e) => {
    shark.setDirection(e.key)
})

// movement event listeners to stop continued player movement after letting go of WASD
document.addEventListener('keyup', (e) => {
    if (['w','a','s','d'].includes(e.key)) {
        shark.unsetDirection(e.key)
    }
})


// alien enemies automated movement
const alienMovement = (alienEnemy) => {
    if (gameStart != false) {
        alienEnemy.x -= 50
    }
}

// asteroid enemies automated movement
const asteroidMovement = (asteroid) => {
    if (gameStart != false) {
        asteroid.x -= 50
    }
}

// alien1 respawn logic
const alienRespawn = () => {
    let randomY = Math.floor(Math.random() * 575)
    if (alien.alive != true) {
        alien.alive = true
        alien.x = 2000
        alien.y = randomY
    } else if (alien.x < -300) {
        alien.x = 2000
        alien.y = randomY
    }
}

//alien2 respawn logic
const alien2Respawn = () => {
    let randomY = Math.floor(Math.random() * 575)
    if (alien2.alive != true) {
        alien2.alive = true
        alien2.x = 2000
        alien2.y = randomY
    } else if (alien2.x < -300) {
        alien2.x = 2000
        alien2.y = randomY
    }
}

//alien3 respawn logic
const alien3Respawn = () => {
    let randomY = Math.floor(Math.random() * 575)
    if (alien3.alive != true) {
        alien3.alive = true
        alien3.x = 2000
        alien3.y = randomY
    } else if (alien3.x < -300) {
        alien3.x = 2000
        alien3.y = randomY
    }
}

// asteroid1 respawn logic
const asteroidRespawn = () => {
    let randomY = Math.floor(Math.random() * 575)
    if (asteroid.alive != true) {
        asteroid.alive = true
        asteroid.x = 1500
        asteroid.y = randomY
    }  else if (asteroid.x < -300) {
        asteroid.x = 1500
        asteroid.y = randomY
    }
}


// asteroid2 respawn logic
const asteroid2Respawn = () => {
    let randomY = Math.floor(Math.random() * 575)
    if (asteroid2.alive != true) {
        asteroid2.alive = true
        asteroid2.x = 1500
        asteroid2.y = randomY
    }  else if (asteroid2.x < -300) {
        asteroid2.x = 1500
        asteroid2.y = randomY
    }
}

// asteroid3 respawn logic
const asteroid3Respawn = () => {
    let randomY = Math.floor(Math.random() * 575)
    if (asteroid3.alive != true) {
        asteroid3.alive = true
        asteroid3.x = 1500
        asteroid3.y = randomY
    }  else if (asteroid3.x < -300) {
        asteroid3.x = 1500
        asteroid3.y = randomY
    }
}

//detect alien object being hit
const alienHitDetection = (alienEnemy) => {
    if(shark.x < alienEnemy.x + alienEnemy.width
        && shark.x + shark.width > alienEnemy.x
        && shark.y < alienEnemy.y + alienEnemy.height
        && shark.y + shark.height > alienEnemy.y) {
            alienEnemy.alive = false
            message.textContent = 'Alien eaten!'
            points.innerText = scorePoints() + 1
            if (healthStatus.innerText != '100') {
            healthStatus.innerText = increaseHealth() + 5
            }
        }
}

//detect asteroid object being hit
const asteroidHitDetection = (asteroid) => {
    if(shark.x < asteroid.x + asteroid.width
        && shark.x + shark.width > asteroid.x
        && shark.y < asteroid.y + asteroid.height
        && shark.y + shark.height > asteroid.y) {
            asteroid.alive = false
            message.textContent = 'Shark has been hit'
            healthStatus.innerText = decreaseHealth() - 20
        }
}

// recurring in-game loop logic
const gameLoop = () => {
    if (alien.alive) {
        alienHitDetection(alien)
        alienMovement(alien)
        alienRespawn()
    }

    if (alien2.alive) {
        alienHitDetection(alien2)
        alienMovement(alien2)
        alien2Respawn()
    }

    if (alien3.alive) {
        alienHitDetection(alien3)
        alienMovement(alien3)
        alien3Respawn()
    }

    if (asteroid.alive) {
        asteroidHitDetection(asteroid)
        asteroidMovement(asteroid)
        asteroidRespawn()
    }

    if (asteroid2.alive) {
        asteroidHitDetection(asteroid2)
        asteroidMovement(asteroid2)
        asteroid2Respawn()
    }

    if (asteroid3.alive) {
        asteroidHitDetection(asteroid3)
        asteroidMovement(asteroid3)
        asteroid3Respawn()
    }

    ctx.clearRect(0, 0, game.width, game.height)

    shark.render()
    shark.moveShark()

    if (alien.alive) {
        alien.render()
    }

    if (alien2.alive) {
        alien2.render()
    }

    if (alien3.alive) {
        alien3.render()
    }

    if (asteroid.alive) {
        asteroid.render()
    }

    if (asteroid2.alive) {
        asteroid2.render()
    }

    if (asteroid3.alive) {
        asteroid3.render()
    }

    if (scorePoints() >= 15) {
        pauseGame()
        gameWon()
        points.innerText = 0
        healthStatus.innerText = 100
    }

    if (decreaseHealth() <= 0) {
        pauseGame()
        gameLost()
        points.innerText = 0
        healthStatus.innerText = 100
    }
}


// logic for winning game condition
const gameWon = () => {
    game.style.display = 'none'
    start.style.display = 'none'
    message.style.display = 'none'
    score.style.display = 'none'
    healthText.style.display = 'none'
    const gameOverText = document.createElement('div')
    gameOverText.setAttribute('id', 'game-Over-Text')
    gameOverText.style.color = 'white'
    gameOverText.style.fontSize = '30px'
    gameOverText.style.marginTop = '70px'
    gameOverText.innerText = 'You have won the game!'
    const closingStoryText = document.createElement('div')
    closingStoryText.setAttribute('id', 'closing-story-text')
    closingStoryText.style.color = 'white'
    closingStoryText.style.fontSize = '30px'
    closingStoryText.style.marginTop = '100px'
    closingStoryText.innerText = 'Jimmy ate all the aliens, found his human dinner and then ate that too! Yummy!'
    main.appendChild(gameOverText)
    main.appendChild(closingStoryText)
    restart.style.display = 'flex'
}


// logic for losing game condition
const gameLost = () => {
    game.style.display = 'none'
    start.style.display = 'none'
    message.style.display = 'none'
    score.style.display = 'none'
    healthText.style.display = 'none'
    const gameOverText = document.createElement('div')
    gameOverText.setAttribute('id', 'game-Over-Text')
    gameOverText.style.color = 'white'
    gameOverText.style.fontSize = '30px'
    gameOverText.style.marginTop = '70px'
    gameOverText.innerText = 'You lose!'
    const closingStoryText = document.createElement('div')
    closingStoryText.setAttribute('id', 'closing-story-text')
    closingStoryText.style.color = 'white'
    closingStoryText.style.fontSize = '30px'
    closingStoryText.style.marginTop = '100px'
    closingStoryText.innerText = 'Jimmy was hit by too many asteroids, and died.'
    main.appendChild(gameOverText)
    main.appendChild(closingStoryText)
    restart.style.display = 'flex'
}

// DOM Content Loaded event listener to check if DOM Content has fully loaded
document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed')
})

// game timer variable to define speed of game
let gameTimer = setInterval(gameLoop, 60)

// function to start the game
const startGame = () => {
    gameStart = true
    const alienImage1 = document.querySelector('#alienEnemy')
    const alienImage2 = document.querySelector('#alien2')
    const alienImage3 = document.querySelector('#alien3')
    const alienToEatInstruction = document.querySelector('#aliens-to-eat')
    alienImage1.style.display = 'none'
    alienImage2.style.display = 'none'
    alienImage3.style.display = 'none'
    alienToEatInstruction.style.display = 'none'
    instructions.style.display = 'none'
    gameTitle.style.fontSize = '15px'
    game.style.width = '100%'
    game.style.height = '100%'
    game.setAttribute('width', getComputedStyle(game)['width'])
    game.setAttribute('height', getComputedStyle(game)['height'])
    // setInterval(gameLoop, 60)
    gameTimer
}

// function to pause the game
const pauseGame = () => {
    gameStart = false
    // points.innerText = 0
    start.innerText = 'Start'
}

// event listener to start the game when "Start" div is clicked
start.addEventListener('click', (event) => {
    if (gameStart != true) {
    start.innerText = 'Pause'
    start.style.justifyContent = 'center'
    start.style.textAlign = 'center'
    start.style.alignContent = 'center'
    start.style.fontSize = '25px'
    start.style.marginTop = '50px'
    startGame()
    } else {
        pauseGame()
    }
})

// event listener to restart the game when "Restart" div is clicked
restart.addEventListener('click', (event) => {
    if (gameStart != true) {
    const gameOverText = document.querySelector('#game-Over-Text')
    const closingStoryText = document.querySelector('#closing-story-text')
    start.style.display = 'initial'
    game.style.display  = 'initial'
    message.style.display = 'initial'
    score.style.display = 'initial'
    healthText.style.display = 'initial'
    gameOverText.remove()
    closingStoryText.remove()
    clearInterval(gameLoop)
    restart.style.display = 'none'
    start.innerText = 'Pause'
    start.style.justifyContent = 'center'
    start.style.textAlign = 'center'
    start.style.alignContent = 'center'
    start.style.fontSize = '25px'
    start.style.marginTop = '50px'
    startGame()
    shark.x = 50
    shark.y = 280
    alienRespawn()
    alien2Respawn()
    alien3Respawn()
    asteroidRespawn()
    asteroid2Respawn()
    asteroid3Respawn()
    } 
})