// console.log('test test test, is js working?')

// goal: make a side scroller game using HTML, CSS, and JS with Canvas

//we need two entities to start: one shark, and one alien
//shark needs to be moveable with wasd keys
//alien can be stationary for mvp
//shark should be able to touch alien 
//shark touching alien should remove alien from the screen

// first we need to grab the elements so we can do stuff
const game = document.getElementById('canvas')
const movement = document.getElementById('movement')
const message = document.getElementById('status')
const points = document.getElementById('points')
const healthStatus = document.getElementById('health')
const start = document.querySelector('#start')
let gameStart = false


// function to keep track of points (aliens eaten)
const scorePoints = () => { return parseInt(points.innerText,10)}
const decreaseHealth = () => { return parseInt(healthStatus.innerText, 10)}
const increaseHealth = () => { return parseInt(healthStatus.innerText, 10)}

const ctx = game.getContext('2d')

console.log('movement', movement)
console.log('message', message)
console.log('game', game)

//get computed size of the canvas
game.setAttribute('width', getComputedStyle(game)['width'])
game.setAttribute('height', getComputedStyle(game)['height'])

class playerCharacter {
    constructor(x, y, color, width, height) {
        this.x = x,
        this.y = y,
        this.color = color,
        this.width = width,
        this.height = height,
        this.alive = true,
        this.speed = 15,
        this.direction = {
            up: false,
            down: false,
            left: false,
            right: false
        },
        // we need two key based functions here that will change our heroes movement direction
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
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
    }
}

class enemyCharacter {
    constructor(x, y, color, width, height) {
        this.x = x,
        this.y = y,
        this.color = color,
        this.width = width,
        this.height = height,
        this.alive = true,
        this.render = function () {
            ctx.fillStyle = this.color
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
    }
}


// create character objects
const shark = new playerCharacter(50, 280, 'white', 75, 75)
let alien = new enemyCharacter(1500, 300, 'purple', 50, 50)
let alien2 = new enemyCharacter(1800, 100, 'purple', 50, 50)
let alien3 = new enemyCharacter(2000, 480, 'purple', 50, 50)
let asteroid = new enemyCharacter(1500, 500, 'blue', 120, 120)

// create background objects

document.addEventListener('keydown', (e) => {
    shark.setDirection(e.key)
})

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

// asteroid automated movement
const asteroidMovement = () => {
    if (gameStart != false) {
        asteroid.x -= 50
    }
}

// alien respawn movement
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

//alien2 respawn movement
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

//alien3 respawn movement
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

// asteroid respawn movement
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
const asteroidHitDetection = () => {
    if(shark.x < asteroid.x + asteroid.width
        && shark.x + shark.width > asteroid.x
        && shark.y < asteroid.y + asteroid.height
        && shark.y + shark.height > asteroid.y) {
            asteroid.alive = false
            message.textContent = 'Shark has been hit'
            healthStatus.innerText = decreaseHealth() - 20
        }
}

// recurring in-game logic
const gameLoop = () => {
    if (alien.alive) {
        alienHitDetection(alien)
        alienMovement(alien)
        alienRespawn()
    }

    if (alien2.alive) {
        alienHitDetection(alien2)
        alienMovement(alien2)
        //alien2Respawn()
    }

    if (alien3.alive) {
        alienHitDetection(alien3)
        alienMovement(alien3)
        //alien3Respawn()
    }

    if (asteroid.alive) {
        asteroidHitDetection()
        asteroidMovement()
        asteroidRespawn()
    }

    ctx.clearRect(0, 0, game.width, game.height)

    // movement.textContent = shark.x + ", " + shark.y
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

    // if (scorePoints() >= 5) {
    //     alert('You have won the game!')
    // }

    // if (decreaseHealth() <= 0) {
    //     alert('The shark has died from asteroid poisoing')
    // }
}



document.addEventListener('DOMContentLoaded', (event) => {
    // document.addEventListener('keydown', userMovementHandler)
    // setInterval(gameLoop, 60)
    console.log('DOM fully loaded and parsed')
})

// const gameInterval = setInterval(gameLoop, 60)

// start game function
const startGame = () => {
    // game.setAttribute('width', getComputedStyle(game)['width'])
    // game.setAttribute('height', getComputedStyle(game)['height'])
    gameStart = true
    const gameInterval = setInterval(gameLoop, 60)
    // setInterval(gameLoop, 60)
    // gameInterval
}

const endGame = () => {
    gameStart = false
    points.innerText = 0
    start.innerText = 'Start'
    //clearInterval(gameLoop, 60)
}

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
        // points.innerText = 0
        // start.innerText = 'Start'
        // gameStart = false
        endGame()
        // clearInterval(startGame)
    }
})