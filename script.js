const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.fillStyle = 'white';
c.fillRect(0, 0, canvas.width, canvas.height);

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
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
};

function animate() {
    window.requestAnimationFrame(animate);

    // Update the background position based on key presses
    if (keys.w.pressed) {
        background.position.y += 3; // Moving the background down simulates the player moving up
    }
    if (keys.a.pressed) {
        background.position.x += 3; // Moving the background right simulates the player moving left
    }
    if (keys.s.pressed) {
        background.position.y -= 3; // Moving the background up simulates the player moving down
    }
    if (keys.d.pressed) {
        background.position.x -= 3; // Moving the background left simulates the player moving right
    }

    // Draw the background
    background.draw();

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

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = true;
            break;
        case 'a':
            keys.a.pressed = true;
            break;
        case 's':
            keys.s.pressed = true;
            break;
        case 'd':
            keys.d.pressed = true;
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