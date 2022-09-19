# Game 1 idea: Space Shark

# Overview
Space Shark is a thrilling side scroller combining two of my favorite things: Sharks and Aliens! This game is about a shark that is chasing after aliens in pursuit of catching his favorite snack, a human, that was abducted right out of the ocean before his very eyes as he was about to feast. The game begins with a shark launching out of the water into space to find his meal, eating the aliens along the way all while avoiding asteroids. While ridiculous in theory, the point of the game is to be both engaging and humorous for users.


# Technologies used:
-HTML5
-CSS
-Javascript

# User Stories
- As a user, I want the ability to click a "start" button to begin the game
- As a user, I want the ability to click a "restart" button to begin a new game (if player character has not yet lost)
- As a user, I want the ability to see how many points I have (aliens eaten)
- As a user, I want the ability to navigate my player (the shark) up, down, left, and right using either the WASD keys or the up down left right arrow keys
- As a user, I want the ability to take damage to health when being hit with certain objects (asteroids)
- As a user, I want the ability to recover health when eating certain objects (aliens)
- As a user, I want the ability to lose the game and restart once player health goes to 0
- As a user, I want the ability to win the game by reaching a certain number of points (50)
- As a user, I want the ability to see the instructions to the game prior to starting
- As a user, I want the ability to see my highest score (if a game has not yet been won)
- As a user, I want the ability to hear sounds when my player touches objects
- As a user, I want the ability to hear music playing when the game begins
- As a user, I want the ability to hear the music change to a different song when the game is won

# Wireframes/Screenshots
![Game 1 WireFrame 1](Wireframe1.png)
![Game 1 Wireframe 2](Wireframe2.png)
![Game 1 Wireframe 3](Wireframe3.png)

# Entity Relationships
Shark: {
  x: (x location on the canvas)
  y: (y location on the canvas)
  height: (taller than the aliens)
  width: (wider than the aliens)
  color: lightblue
  alive: (a boolean that determines if game is in progress)
  render: (a method that displays the shark on the screen)
}

Alien: {
  x: (x location on the canvas)
  y: (y location on the canvas)
  height: (shorter than the shark
  width: (shorter than the shark)
  color: purple
  alive: (a boolean that determines if game is in progress)
  render: (a method that displays the alien on the screen)
}

Asteroid: {
  x: (x location on the canvas)
  y: (y location on the canvas)
  height: (taller than the shark)
  width: (wider than the shark)
  color: grey
  render: (a method that displays the ogre on the screen)
}

function - gameloop - holds the entire logic that runs the game
function - detectHit - used to see if items have collided with one another
function - movementHandler - used to move the hero around, should be attached to arrow or wasd keys

# Weekly Plan
- Day 1 (first half): Put basic wireframe and characters in place using HTML and CSS
- Day 1 (second half): Get basic player movement down with JS using Canvas and test
- Day 2 (first half): Get computer player movement down with JS using Canvas and test
- Day 2 (second half): Get background animation moving and begin designing advanced player and computer characters
- Day 3 (first half): Implement enhanced design of player and computer characters in the live game and test
- Day 3 (second half): Start enhancing the game map
- Day 4 (first half): Implement game music and test
- Day 4 (second half): Fix any remaining issues
- Day 5 : Fix any remaining issues



# Game 2 idea: Zombie Survival

# Overview
Zombie Survival is a horror survival game where the user player must avoid getting eaten by zombies while awaiting help from fellow humans. The player characters finds themself stuck in a graveyard  late at night when a zombie apocalypse begins, and must avoid zombies long enough to be rescued by a helicopter and flown to safety.

# Technologies used:
-HTML5
-CSS
-Javascript

# User Stories
- As a user, I want the ability to click a "start" button to begin the game
- As a user, I want the ability to click a "restart" button to begin a new game (if player character has not yet lost)
- As a user, I want the ability to see how much time I have left before being rescued
- As a user, I want the ability to navigate my player (the human) up, down, left, and right using either the WASD keys or the up down left right arrow keys
- As a user, I want the ability to lose the game when being hit with certain objects (zombies)
- As a user, I want the ability to win the game by avoiding certain objects for a specific amount of time (60 seconds)
- As a user, I want the ability to see the instructions to the game prior to starting
- As a user, I want the ability to see my longest survival time (if a game has not yet been won)
- As a user, I want the ability to hear sounds when my player touches objects
- As a user, I want the ability to hear music playing when the game begins
- As a user, I want the ability to hear the music change to a different song when the game is won

# Wireframes/Screenshots
- See attached screenshots for Game 2 within Wireframe directory

# Entity Relationships
Human: {
  x: (x location on the canvas)
  y: (y location on the canvas)
  height: (shorter than the zombie)
  width: (shorter than the zombie)
  color: yellow
  alive: (a boolean that determines if game is in progress)
  render: (a method that displays the human on the screen)
}

Zombie: {
  x: (x location on the canvas)
  y: (y location on the canvas)
  height: (taller than the human)
  width: (wider than the human)
  color: green
  render: (a method that displays the zombie on the screen)
}

function - gameloop - holds the entire logic that runs the game
function - detectHit - used to see if items have collided with one another
function - movementHandler - used to move the hero around, should be attached to arrow or wasd keys

# Weekly Plan
- Day 1 (first half): Put basic wireframe and characters in place using HTML and CSS
- Day 1 (second half): Get basic player movement down with JS using Canvas and test
- Day 2 (first half): Get computer player movement down with JS using Canvas and test
- Day 2 (second half): Complete background animation, additional computer player spawning, and begin designing advanced player and computer characters
- Day 3 (first half): Implement enhanced design of player and computer characters in the live game and test
- Day 3 (second half): Start enhancing the game map
- Day 4 (first half): Implement game music and test
- Day 4 (second half): Fix any remaining issues
- Day 5 : Fix any remaining issues
