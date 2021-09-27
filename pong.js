const width = 800;
const height = 400;

const ball = new Ball(width / 2, height / 2, 30, onLeftGoal, onRightGoal, height, width);

const pad1 = new Pad(width - 40, height / 2, height / 4, 20, height, ball, true, false);
const pad2 = new Pad(20, height / 2, height / 4, 20, height, ball, false, true);

function setup() {
    createCanvas(width, height);
    ball.giveRandomVelocity();
}

function onRightGoal() {
    console.log("Right");
    resetBall();
    restPads();
}

function onLeftGoal() {
    console.log("Left");
    resetBall();
    restPads();
}

function restPads() {
    pad1.setPosition(pad1.x, height / 2);
    pad2.setPosition(pad2.x, height / 2);
}

function resetBall() {
    ball.setPosition(width / 2, height / 2);
    ball.giveRandomVelocity();
}

function draw() {
    background(220);

    ball.update();
    pad1.update();
    pad2.update();

    pad1.draw();
    pad2.draw();
    ball.draw();
}