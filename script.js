// get the canvas
const parentDiv = document.getElementById("parentDiv");
const canvas = document.getElementById('mycanvas');
const ctx = canvas.getContext('2d');

console.log(parentDiv.offsetHeight);

// set height and width for the canvas
var h = ctx.canvas.height = parentDiv.offsetHeight;
var w = ctx.canvas.width = parentDiv.offsetWidth;

//declare an array for particle
let particleArray;

// create constructor
function Particle(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
}

// create a draw prototype for Particle
Particle.prototype.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false); //6 params (x-axis, y-axis, radius, start-angle, end-angle, clock/anticlock-wise)
    ctx.fillStyle = this.color;
    ctx.fill();
}

// create a update prototype for Particle 
// also check for collision detect
Particle.prototype.update = function() {
    if (this.x - this.size < 0 || this.x + this.size > w) {
        this.directionX = -this.directionX;
    }
    if (this.y - this.size < 0 || this.y + this.size > h) {
        this.directionY = -this.directionY;
    }

    this.x += this.directionX;
    this.y += this.directionY;

    this.draw();
}

// create particle array
function init() {
    particleArray = [];
    for (let i = 0; i < 300; i++) {
        let size = Math.random() * 20;
        let x = Math.random() * (w - size * 2);
        let y = Math.random() * (h - size * 2);
        let directionX = (Math.random() * .4) - .2;
        let directionY = (Math.random() * .4) - .2;
        let color = getRandomColor();

        // push the particle into the array
        particleArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

// create animation loop
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, w, h);

    // loop the array
    for (i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
    }
}
init();
animate();

// to avoid canvas stretching (while resizing window) we need add event listener
window.addEventListener('resize', resizeWindow);

function resizeWindow() {
    console.log("resized");
    h = ctx.canvas.height = parentDiv.offsetHeight;
    w = ctx.canvas.width = parentDiv.offsetWidth;
    init();
}

function getRandomColor() {
    console.log('calling')
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}