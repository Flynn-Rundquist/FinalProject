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
    protected health: number = 100;
    protected score: number;

    // The constructor initializes the player sprite.
    constructor (scene: Phaser.Scene, x: number, y: number, health: number, score: number)
    {

        super(scene, x, y, 'mainSprite');

        this.health = health;
        this.score = score;

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
        if (cursors.left.isDown)
        {
            // move the sprites to the left
            this.body.setVelocityX(-200);
        } else if (cursors.right.isDown)
        {
            // move the sprites to the right
            this.body.setVelocityX(200);
        } else if (cursors.space.isDown) {
            // move the sprites up
            this.body.setVelocityY(-200);
        }
    }

    // doesn't let the player move below 440 on the y axis
    update ()
    {
        if (this.y > 440)
        {
            this.y = 440;
        }
    }

    // if players health goes to 0, go to game over
    gameOver ()
    {
        if (this.health === 0)
        {
            this.scene.scene.start('GameOver');
        }
    }

    // if player collides with enemy, lose health (5 at a time)
    hitEnemy ()
    {
        this.health -= 5;
    }

    // if player collides with coin, gain score (10 at a time) and regenerate health (5 at a time)
    collectCoin ()
    {
        this.score += 10;
        this.health += 5;
    }
}
export default Player;
