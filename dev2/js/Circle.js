class Circle extends GameObject {
    // Define the number of columns and rows in the sprite
    static numColumns = 5;
    static numRows = 2;
    static frameWidth = 0;
    static frameHeight = 0;
    static sprite;

    constructor(context, x, y, vx, vy, mass) {
        // Pass params to super class
        super(context, x, y, vx, vy, mass);

        // Set the size of the hitbox
        this.radius = 10;

        // Supply the sprite. Only load it once and reuse it
        this.loadImage();
    }

    loadImage() {
        // Check for an existing image
        if (!Circle.sprite) {
            // No image found, create a new element
            Circle.sprite = new Image();

            // Handle a successful load
            Circle.sprite.onload = () => {
                // Define the size of a frame
                Circle.frameWidth = Circle.sprite.width / Circle.numColumns;
                Circle.frameHeight = Circle.sprite.height / Circle.numRows;
            };

            // Start loading the image
            Circle.sprite.src = "../../img/sprite_animation.png";
        }
        // Circle.sprite = new Image();
        // Circle.sprite.src = '/img/sprite1.png';
        // let img = document.getElementById("myImage");

    }

    draw() {
        // Limit the maximum frame
        let maxFrame = Circle.numColumns * Circle.numRows - 1;
        if (this.currentFrame > maxFrame) {
            this.currentFrame = maxFrame;
        }

        // Update rows and columns
        let column = this.currentFrame % Circle.numColumns;
        let row = Math.floor(this.currentFrame / Circle.numColumns);

        // Set the origin to the center of the circle, rotate the context, move the origin back
        this.context.translate(this.x, this.y);
        this.context.rotate(Math.PI / 180 * (this.angle + 90));
        this.context.translate(-this.x, -this.y);

        // Draw the image, rotated
        this.context.drawImage(Circle.sprite, this.column * Circle.frameWidth, this.row * Circle.frameHeight, Circle.frameWidth, Circle.frameHeight, (this.x - this.radius), (this.y - this.radius) - this.radius * 0.4, this.radius * 2, this.radius * 2.42);
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        this.context.fill();

        // Reset transformation matrix
        this.context.setTransform(1, 0, 0, 1, 0, 0);
    }

    handleCollision() {
        // Pick the next frame of the animation
        this.currentFrame++;
    }

    update(secondsPassed) {
        // Move with velocity x/y
        this.x += this.vx * secondsPassed;
        this.y += this.vy * secondsPassed;

        // Calculate the angle
        let radians = Math.atan2(this.vy, this.vx);
        this.angle = 180 * radians / Math.PI;
    }
}