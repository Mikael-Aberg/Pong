class Ball {
    speed = 5;
    velocity = {
        x: 0,
        y: 0
    };

    x;
    y;
    d;

    onLeftHit;
    onRightHit;
    worldHeight;
    worldWidth;

    constructor(x, y, d, onLeftHit, onRightHit, worldHeight, worldWidth) {
        this.x = x;
        this.y = y;
        this.d = d;
        this.onLeftHit = onLeftHit;
        this.onRightHit = onRightHit;
        this.worldHeight = worldHeight;
        this.worldWidth = worldWidth;
    }

    getRightEdge = () => this.x + this.d / 2;

    getLeftEdge = () => this.x - this.d / 2;

    getX = () => this.x;

    getY = () => this.y;

    isPointInside = (x, y) => {
        const dist = Math.sqrt(Math.abs((x - this.x)) * 2 + Math.abs((y - this.y)) * 2);
        console.log(dist);
        return dist <= 0;
    }

    setPosition = (x, y) => {
        this.x = x;
        this.y = y;
    }

    giveRandomVelocity = () => {
        this.velocity = {
            x: random([-1, 1]),
            y: random([-1, 1])
        }
    }

    flipVelocityX = () => {
        this.velocity = {
            x: -this.velocity.x,
            y: this.velocity.y,
        }
    }

    flipVelocityY = () => {
        this.velocity = {
            x: this.velocity.x,
            y: -this.velocity.y,
        }
    }

    setVelocity = (velocity) => this.velocity = velocity;

    update = () => {
        this.x += this.speed * this.velocity.x;
        this.y += this.speed * this.velocity.y;
        // this.x = mouseX;
        // this.y = mouseY;

        if (this.y - this.d / 2 <= 0 || this.y + this.d / 2 >= this.worldHeight) {
            this.flipVelocityY();
        }

        if (this.getLeftEdge() <= 0) {
            this.onLeftHit();
        }

        if (this.getRightEdge() >= this.worldWidth) {
            this.onRightHit();
        }
    }

    draw = () => {
        fill(100);
        circle(this.x, this.y, this.d);
    }
}