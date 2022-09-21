// console.log('test test test, is js working?')

// goal: make a side scroller game using HTML, CSS, and JS with Canvas

//we need two entities to start: one shark, and one alien
//shark needs to be moveable with wasd keys
//alien can be stationary for mvp
//shark should be able to touch alien 
// shark touching alien should remove it from the screen

// first we need to grab the elements so we can do stuff
const game = document.getElementById('canvas')
const movement = document.getElementById('movement')
const message = document.getElementById('status')

// we need to set the game's context to be 2d
// we also SAVE that context to the ctx variable
// this tells our code, to do whatever we want it to do in the context of the canvas area.
// const ctx = game.getContext('2d')

console.log('movement', movement)
console.log('message', message)
console.log('game', game)

// message.innerText = 'testing testing blah blah'