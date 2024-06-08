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
    public health: number = 100;
    public score: number;
    public xCoord: number;
    public yCoord: number;

    // The constructor initializes the player sprite.
    constructor (config: { scene: Phaser.Scene, key: string }, xCoord: number, yCoord: number, health: number, score: number)
    {
        super(config.scene,xCoord, yCoord, config.key);

        this.xCoord = xCoord;
        this.yCoord = yCoord;
        this.health = health;
        this.score = score;
    }

    // add player to the scene
    static addPlayer(scene: Phaser.Scene, player: Player)
    {
        scene.add.existing(player);
        scene.physics.add.existing(player);
    }


    // Takes keyboard input and moves the player sprite accordingly.
    public move(cursors: Phaser.Types.Input.Keyboard.CursorKeys)
    {
        if (cursors.left.isDown)
        {
            this.xCoord -= 5;
        } else if (cursors.right.isDown)
        {
            this.xCoord += 5;
        } else if (cursors.up.isDown)
        {
            this.yCoord -= 5;
        }
    }

    // if players health goes to 0, go to game over
    public gameOver()
    {
        if (this.health == 0)
        {
            this.scene.scene.start('GameOver');
        }
    }

    // if player collides with enemy, lose health
    public collideEnemy()
    {
        this.health -= 10;
    }

    // if player collides with coin, gain score and health
    public collectCoin()
    {
        this.score += 10;
        this.health += 5;
    }
}
export default Player;
