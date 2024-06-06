/**
 * This is the class that makes the sprite the player plays.
 *
 * Author: Flynn Rundquist
 * Version: 1.0
 * Since: 2024-06-06
 */

import { GameObjects } from 'phaser';

class Player extends GameObjects.Sprite
{
    // The constructor initializes the player sprite.
    constructor (scene: Phaser.Scene, x: number, y: number)
    {
        super(scene, x, y, 'mainSprite');

        // Add the player sprite to the scene.
        scene.add.existing(this);

        // Enable physics for the player sprite.
        scene.physics.add.existing(this);

        // Set the player sprite's body to be a circle.
        this.body.setCircle(16);

        // Set the player sprite's body to be immovable.
        this.body.setImmovable(true);

        // Set the player sprite's body to have a bounce of 0.2.
        this.body.setBounce(0.2);

        // Set the player sprite's body to have a drag of 100.
        this.body.setDrag(100);

        // Set the player sprite's body to have a maximum velocity of 200.
        this.body.setMaxVelocity(200);
    }

    // Takes keyboard input and moves the player sprite accordingly.
    move (cursors: Phaser.Types.Input.Keyboard.CursorKeys)
    {
        // If the left arrow key is pressed, move the player sprite to the left.
        if (cursors.left.isDown)
        {
            this.body.setAccelerationX(-200);
        }
        // If the right arrow key is pressed, move the player sprite to the right.
        else if (cursors.right.isDown)
        {
            this.body.setAccelerationX(200);
        }
        // If neither the left nor right arrow key is pressed, stop the player sprite.
        else
        {
            this.body.setAccelerationX(0);
        }

        // If the up arrow key is pressed and the player sprite is on the ground, make the player sprite jump.
        if (cursors.up.isDown && this.body.onFloor())
        {
            this.body.setVelocityY(-200);
        }
    }
}
export default Player;
