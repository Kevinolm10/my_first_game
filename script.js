const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

const collissionsMap = []
for (let i = 0; i < collisions.length; i += 70) {
    collissionsMap.push(collisions.slice(i, 70 + i))
}

class Boundary {
    constructor({position}) {
        this.position = position
        this.width = 48
        this.height = 48
    }

    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)

    }
}
const boundaries = []

collissionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        boundaries.push(
        new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height
            }
        })
        )
    })
})
console.log(boundaries)

const image = new Image();
image.src = './assets/img/map.png';

const playerImage = new Image();
playerImage.src = './assets/img/playerDown.png';

class Sprite {
    constructor({ position, image }) {
        this.position = position;
        this.image = image;
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y);
    }
}

const background = new Sprite({
    position: {
        x: -200,
        y: -200
    },
    image: image
});

let imagesLoaded = 0;
let lastKey = ''; // Ensure lastKey is defined at the global level

function checkAllImagesLoaded() {
    if (imagesLoaded === 2) {
        animate();
    }
}

image.onload = () => {
    imagesLoaded++;
    checkAllImagesLoaded();
};

playerImage.onload = () => {
    imagesLoaded++;
    checkAllImagesLoaded();
};

const keys = {
    w: { pressed: false },
    a: { pressed: false },
    s: { pressed: false },
    d: { pressed: false }
};

function animate() {
    window.requestAnimationFrame(animate);

    // Clear the canvas before drawing
    c.clearRect(0, 0, canvas.width, canvas.height);

    // Update the background position based on key presses
    if (keys.w.pressed && lastKey === 'w') {
        background.position.y += 3; // Move the background down when 'w' is the last key pressed
    }
    if (keys.a.pressed && lastKey === 'a') {
        background.position.x += 3; // Move the background right when 'a' is the last key pressed
    }
    if (keys.s.pressed && lastKey === 's') {
        background.position.y -= 3; // Move the background up when 's' is the last key pressed
    }
    if (keys.d.pressed && lastKey === 'd') {
        background.position.x -= 3; // Move the background left when 'd' is the last key pressed
    }

    // Draw the background
    background.draw();

    boundaries.forEach(boundary => {
        boundary.draw()
    })

    // Draw the player image in the center of the canvas
    c.drawImage(
        playerImage,
        0,
        0,
        playerImage.width / 4,
        playerImage.height,
        canvas.width / 2 - playerImage.width / 8,
        canvas.height / 2 - playerImage.height / 2,
        playerImage.width / 4,
        playerImage.height
    );
}

// Event listener to update key states and track the last key pressed
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = true;
            lastKey = 'w'; // Update last key pressed
            break;
        case 'a':
            keys.a.pressed = true;
            lastKey = 'a'; // Update last key pressed
            break;
        case 's':
            keys.s.pressed = true;
            lastKey = 's'; // Update last key pressed
            break;
        case 'd':
            keys.d.pressed = true;
            lastKey = 'd'; // Update last key pressed
            break;
    }
});

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
        case 's':
            keys.s.pressed = false;
            break;
        case 'd':
            keys.d.pressed = false;
            break;
    }
});

// Initial call to start the animation
checkAllImagesLoaded();