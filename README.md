# ga-project-1

# Description

This is a project I undertook in the fourth week of the Software Engineering Immersive at General Assembly. The first three weeks were focused on HTML, CSS and JavaScript and this project allowed me to bring what I had learnt together. I had to create a game using HTML, CSS and JavaScript. The game had to be playable for one player and have obstacles which are auto generated.

# Deployment link

https://ermaitland.github.io/ga-project-1/

# Getting Started/Code Installation

Follow the deployment link in your search bar and it will bring you straight to the Frog Games page!

# Timeframe & Working Team (Solo/Pair/Group)

This was a solo project which I had a week to complete.

# Technologies Used

HTML, CSS, JavaScript

# Brief

The idea is to guid your Frog safely to the top of the screen. To make things more challenging there are numerous moving obstacles that the frog must avoid, to reach the destination.
Requirements:

- The game should be playable for one player
- The obstacles should be auto generated
  Suggested enhancements:
- Different difficulty levels
- Auto generated boards
- Two player mode on the same computer: player take turns the first to lose more lives across whole game loses.
- High score board with `localStorage`
  Challenges:
  The difficulty here is animating the obstacles and detecting collision. There will be several timers to manage across the whole game, which can easily get out of hand.

# Planning

I started by making a wire fame on excalidraw. This consisted of a start page and three difficulty levels. From here it was easier to write pseudocode. This gave me an outline of constants I would need to make functions and the key functions needed in order to make the game work. It also allowed to me work out a logical order in which to execute the code, insuring that everything I needed to “get” was done so before I “set”. In this particular project I didn’t use any ERDs, this was due to the wireframe and pseudocode being enough, and in conjunction with my time-boxing, I felt I had a visual idea of what, how and how long for each element.

_Add images_

For day-to-day planning I used time-boxing. I noted down all the tasks left to do, then prioritised them before allocating a set amount of time for each and boxing that time off. I find it much easier to stay focused when there is a visual amount of time available for each task.

_Add images_

The planning of each individual day as well as the overall project made it a lot easier to manage my time efficiently. It allowed me to clearly see how much time I had spend on each element and keep me aware of any elements which may have been being overlooked.

# Build/Code Process

I began by writing basic HTML so I could grab the correct classes or id’s in order to begin the functions in JavaScript. My pseudocode was very helpful for this as I could clearly see the necessary elements I needed to make in order to begin.
I focused at first on the player element. Firstly making the gird and then I wrote functions to add this player to a grid, remove them from the grid and allow them to move using the keys.
I also added in the goal. I wanted this to be a random position each game to make it more exciting for the player. I did this by:  
const levelGoal = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
Creating an array of all the cells the goal is suitable to be in, and then:

function levelComplete() {
goalPosition = Math.floor(Math.random() \* levelGoal.length);
cells[goalPosition].classList.add("goal");
}

This allows a random whole number within the avalible cells to be selected, then this is assigned the class of “goal”.

I could then move on to an object automatically moving through the grid. I realised this function would be repeated many time with only or two values changed so in order to make it more readable I produced a single function which took multiple arguments. This function added and moves all of the objects I have on my grid.

function movement(
position,
item,
endPosition,
startPosition,
distance,
interval
) {
setInterval(() => {
if (position <= endPosition - distance) {
addObj(position, item);
position = position + distance;
addObj(position, item);
collision(position, "frog");
setTimeout(() => {
removeObj(position - distance, item);
}, interval - 50);
} else {
removeObj(position, item);
position = startPosition;
addObj(position, item);
collision(position, "frog");
}
}, interval);
}

This allows the function movement to be used for any object and can easily create a whole new level without repeating whole blocks of code.
At this point I had moving objects, a player which could be controlled, and a destination point to aim for but no concept of a game, such as any collisions, lives of completing of the game.
These where the elements of the game I chose to focus on next. I wrote function and if statements which could be reused for each instance a player or object moves to check if the cell that its being moved into also contains another class. If this is true, I added an explosion image to that cell and reset the player to the beginning position as well as reduced the number of lives by one. Once the lives got to 0, the game was over.

function collision(position, item) {
if (cells[position].classList.contains(item)) {
cells[position].classList.remove(item);
cells[position].classList.add("collision");
collisionMusic();
setTimeout(() => {
cells[position].classList.remove("collision");
}, 700);
lives--;
numberOfLives.textContent = lives;
if (lives === 0) {
stopGame();
} else {
removeObj(frogPosition, "frog");
frogPosition = 94;
addObj(frogPosition, "frog");
}
}
}

This function is set up so it can be reused for many instances. For example:

    collision(frogPosition, "guard");

This will check if the cell which is “frogPosition” includes the classList of “guard”. I found it simpler make a single function which checks for all the different objects the frog can collide with it, and then call this one function in each movement the player makes.

function frogCollision() {
collision(frogPosition, "guard");
collision(frogPosition, "doll");
collision(frogPosition, "mask");
collision(frogPosition, "boss");
}

# Challenges

One challenge was the movement function for the automated objects. I created one which only took the element it was applied to into account, however quickly realised this function would be re-written almost the same many times.

I had to rethink of a way to group these functions into one, easy to read function. One which could be reused for all my movable objects. This meant creating a function which could take the object it was trying to move, give it an end point, a start point, a distance to move at a time and a speed. This was a challenge because I wanted to keep it as simple as possible and function for many different variables. I used a set interval where you could set the interval time as well as adding in my collision function names into the function to allow for constant checking if the object and the frog class where in the same cell.

Creating the movement function was a challenge, initially it didn’t work. So I broke to task down into smaller blocks and started creating a function which first added the item. I then set an Interval in the function with increased the position by one and added the object in the new position. I continued to slowly add one step within the function until it was how I had planned. Breaking the code into bitesize chunks.

Another challenge I faced was the building a grid which looked as I wanted it too. This involved me adding a class to a div which incorporated the text I wanted on the page as well as the grid which was being made. I would then set this class as a flexbox and change the direction of the flex as I add the grid.

function startGame() {
createGrid();
addObj(frogPosition, "frog");
levelComplete();
beginner.disabled = true;
intermediate.disabled = true;
expert.disabled = true;
timed.disabled = true;
reload.innerHTML = "Back to Home!";
backgroundPlayingMusic();
}

# Wins

A win for me was getting the collision function to work. This function had to be able to be applied to any object that was moving, as to whether the cell it was moving into contained the class of the item in question.

function collision(position, item) {
if (cells[position].classList.contains(item)) {
cells[position].classList.remove(item);
cells[position].classList.add("collision");
collisionMusic();
setTimeout(() => {
cells[position].classList.remove("collision");
}, 700);
lives--;
numberOfLives.textContent = lives;
if (lives === 0) {
stopGame();
} else {
removeObj(frogPosition, "frog");
frogPosition = 94;
addObj(frogPosition, "frog");
}
}
}

The function ended up being longer than I had initially thought due to me realising the frog loses a life each time there is a collision. I added this in, as well as a sound for collision and also placing the frog back to the start position each time there is a collision.

Toward the end of the project I realised I would have time to add in a stretch idea. For me this was an “against the clock” level. This level would be as hard as the expert level but I would have incorporated in a 10second counter and a countdown sound. At the end of the 10 seconds the game ends, so if you’re not at the final goal by this point, you have lost the level. This for me was very fun to make, it felt great to have got to a place in the project I could begin to add in stretch goals and I am pleased with the way it came together.

let count = 10;
let counter;
function againstTheClock() {
currentLevel.textContent = "Beat the Clock!";
intermediateLevel();
countdownMusic();
screen.innerHTML = `You have ${count} second left!`;
counter = setInterval(() => {
if (count >= 1) {
count--;
screen.innerHTML = `You have ${count} seconds left!`;
} else {
lives = 0;
stopGame();
clearInterval(counter);
}
}, 1000);
}

# Key Learnings/Takeaways

During classwork, excalidraw was mentioned but I don’t think I fully realised the benefit of planning properly before beginning to code until the project. I found having a detailed plan and daily plans extremely beneficially for time management.

I’ve also found how useful it is not to dive straight in with a huge aim, break everything up into smaller steps and divide my time between them.
I think I have got better at troubleshooting and then that doesn’t work, or I am still confused, just talking through rough ideas can often make you realise yourself where the mistake is. Pair programming is becoming more natural to me.
