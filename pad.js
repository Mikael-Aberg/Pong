class Pad {
    speed = 3;

    x;
    y;

    height;
    width;
    worldHeight;
    ball;

    playerControlled;

    left

    constructor(x, y, height, width, worldHeight, ball, playerControlled, left) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.worldHeight = worldHeight;
        this.ball = ball;
        this.playerControlled = playerControlled;
        this.left = left;
    }

    setPosition = (x, y) => {
        this.x = x;
        this.y = y;
    }

    playerUpdate = () => {
        // S key
        if (keyIsDown(83) && this.y + this.height / 2 < this.worldHeight) {
            this.y += this.speed;
        }

        // W Key
        if (keyIsDown(87) && this.y - this.height / 2 > 0) {
            this.y -= this.speed;
        }
    }

    clamp = (min, max, value) => {
        if (min > value) {
            return min;
        }
        if (max < value) {
            return max;
        }
        return value;
    }

    getClosestPoint = (x, y) => {
        const closestX = this.clamp(this.x, this.x + this.width, x);
        const closestY = this.clamp(this.y - this.height / 2, this.y + this.height / 2, y);
        return {
            x: closestX,
            y: closestY
        };
    }

    aiUpdate = () => {
        if (this.ball.getY() > this.y && this.y + this.height / 2 < this.worldHeight) {
            this.y += this.speed;
        }

        if (this.ball.getY() < this.y && this.y - this.height / 2 > 0) {
            this.y -= this.speed;
        }

    }

    update = () => {
        if (this.playerControlled) {
            this.playerUpdate();
        } else {
            this.aiUpdate();
        }

        this.checkCollision();
    }

    checkCollision = () => {
        const point = this.getClosestPoint(this.ball.getX(), this.ball.getY());

        fill('#ff1100');
        circle(point.x, point.y, 5);

        const xd = point.x - ball.getX();
        const yd = point.y - ball.getY();

        const dist = Math.sqrt(xd * xd + yd * yd);

        if (dist <= this.ball.d / 2) {
            if (this.ball.getX() >= this.x && this.ball.getX() <= this.x + this.width) {
                console.log("Short side hit");
                this.ball.flipVelocityY();
            } else {
                console.log("Long side hit");
                this.ball.flipVelocityX();
            }
        }
    }

    draw = () => {
        fill(0);
        rect(this.x, this.y - this.height / 2, this.width, this.height);
    }
}