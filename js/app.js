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

// we need to set the game's context to be 2d
// we also SAVE that context to the ctx variable
// this tells our code, to do whatever we want it to do in the context of the canvas area.
const ctx = game.getContext('2d')

console.log('movement', movement)
console.log('message', message)
console.log('game', game)

// message.innerText = 'testing testing blah blah'

//get computed size of the canvas
game.setAttribute('width', getComputedStyle(game)['width'])
game.setAttribute('height', getComputedStyle(game)['height'])

console.log('this is the game element', game)

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
let alien = new Character(1500, 500, 'purple', 50, 50)
let asteroid = new Character(1500, 300, 'blue', 120, 120)


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
        alien.x -= 10
    }
}

// asteroid automated movement
const asteroidMovement = () => {
    if (asteroid.alive) {
        asteroid.x -= 10
    }
}

const alienRespawn = () => {
    if (alien.alive != true) {
        alien.alive = true
        alien.x = 1000
    }
}

//create function to detect object being hit
const alienHitDetection = () => {
    if(shark.x < alien.x + alien.width
        && shark.x + shark.width > alien.x
        && shark.y < alien.y + alien.height
        && shark.y + shark.height > alien.y) {
            alien.alive = false
            message.textContent = 'Alien eaten!'
        }
}

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

    if (asteroid.alive) {
        asteroidHitDetection()
        asteroidMovement()
    }

    ctx.clearRect(0, 0, game.width, game.height)

    movement.textContent = shark.x + ", " + shark.y
    shark.render()

    if (alien.alive) {
        alien.render()
    }

    if (asteroid.alive) {
        asteroid.render()
    }
}

document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('keydown', userMovementHandler)
    setInterval(gameLoop, 60)
})