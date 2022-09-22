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

// function to keep track of points (aliens eaten)
const scorePoints = () => { return parseInt(points.innerText,10)}

const ctx = game.getContext('2d')

console.log('movement', movement)
console.log('message', message)
console.log('game', game)

//get computed size of the canvas
game.setAttribute('width', getComputedStyle(game)['width'])
game.setAttribute('height', getComputedStyle(game)['height'])

class Character {
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
const shark = new Character(100, 100, 'white', 75, 75)
let alien = new Character(1500, 300, 'purple', 50, 50)
let alien2 = new Character(1000, 100, 'purple', 50, 50)
let alien3 = new Character(200, 480, 'purple', 50, 50)
let asteroid = new Character(1500, 500, 'blue', 120, 120)


//create movement function for player character
const userMovementHandler = (key) => {
    switch (key.keyCode) {
        case(87):
            shark.y -= 10
            break
        case(65):
            shark.x -= 10
            break
        case(83):
            shark.y += 10
            break
        case(68):
            shark.x += 10
            break
    }
}

// alien automated movement
const alienMovement = () => {
    if (alien.alive) {
        alien.x -= 50
    }
}

//alien2 automated movement
const alien2Movement = () => {
    if (alien2.alive) {
        alien2.x -= 50
    }
}

//alien3 automated movement
const alien3Movement = () => {
    if (alien3.alive) {
        alien3.x -= 50
    }
}

// asteroid automated movement
const asteroidMovement = () => {
    if (asteroid.alive) {
        asteroid.x -= 50
    }
}

// alien respawn movement
const alienRespawn = () => {
    if (alien.alive != true) {
        alien.alive = true
        // alien.y = Math.floor(Math.random() - 200)
        alien.x = 2000
        alien.y = 300
    } else if (alien.x < -300) {
        alien.x = 2000
        alien.y = 300
    }
}

//alien2 respawn movement
const alien2Respawn = () => {
    if (alien2.alive != true) {
        alien2.alive = true
        // alien.y = Math.floor(Math.random() - 200)
        alien2.x = 2000
        alien2.y = 100
    } else if (alien2.x < -300) {
        alien2.x = 2000
        alien2.y = 100
    }
}

//alien3 respawn movement
const alien3Respawn = () => {
    if (alien3.alive != true) {
        alien3.alive = true
        // alien.y = Math.floor(Math.random() - 200)
        alien3.x = 2000
        alien3.y = 480
    } else if (alien3.x < -300) {
        alien3.x = 2000
        alien3.y = 480
    }
}

// asteroid respawn movement
const asteroidRespawn = () => {
    if (asteroid.x < -300) {
        asteroid.x = 1500
    }
}

//detect alien object being hit
const alienHitDetection = () => {
    if(shark.x < alien.x + alien.width
        && shark.x + shark.width > alien.x
        && shark.y < alien.y + alien.height
        && shark.y + shark.height > alien.y) {
            alien.alive = false
            message.textContent = 'Alien eaten!'
            points.innerText = scorePoints() + 1
        }
}
//alien2 hit detection
const alien2HitDetection = () => {
    if(shark.x < alien2.x + alien2.width
        && shark.x + shark.width > alien2.x
        && shark.y < alien2.y + alien2.height
        && shark.y + shark.height > alien2.y) {
            alien2.alive = false
            message.textContent = 'Alien eaten!'
            points.innerText = scorePoints() + 1
        }
}
// alien3 hit detection
const alien3HitDetection = () => {
    if(shark.x < alien3.x + alien3.width
        && shark.x + shark.width > alien3.x
        && shark.y < alien3.y + alien3.height
        && shark.y + shark.height > alien3.y) {
            alien3.alive = false
            message.textContent = 'Alien eaten!'
            points.innerText = scorePoints() + 1
        }
}

//detect asteroid object being hit
const asteroidHitDetection = () => {
    if(shark.x < asteroid.x + asteroid.width
        && shark.x + shark.width > asteroid.x
        && shark.y < asteroid.y + asteroid.height
        && shark.y + shark.height > asteroid.y) {
            shark.alive = false
            message.textContent = 'Shark is dead!'
        }
}

const gameLoop = () => {
    if (alien.alive) {
        alienHitDetection()
        alienMovement()
        //alienRespawn()
    }

    if (alien2.alive) {
        alien2HitDetection()
        alien2Movement()
        //alien2Respawn()
    }

    if (alien3.alive) {
        alien3HitDetection()
        alien3Movement()
        //alien3Respawn()
    }

    if (asteroid.alive) {
        asteroidHitDetection()
        asteroidMovement()
        //asteroidRespawn()
    }

    ctx.clearRect(0, 0, game.width, game.height)

    movement.textContent = shark.x + ", " + shark.y
    shark.render()

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
}

document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('keydown', userMovementHandler)
    setInterval(gameLoop, 60)
})