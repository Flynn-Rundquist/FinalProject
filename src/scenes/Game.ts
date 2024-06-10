import Phaser from 'phaser';
import Player from '../sprites/Player';
import Enemy from '../sprites/Enemy';

export class Game extends Phaser.Scene {
    private camera: Phaser.Cameras.Scene2D.Camera;
    private background: Phaser.GameObjects.Image;
    private msg_text: Phaser.GameObjects.Text;

    private player: Player | null = null;
    private platforms: Phaser.Physics.Arcade.StaticGroup | null = null;
    private coin: Phaser.Physics.Arcade.StaticGroup | null = null;
    private score: number = 0;

    constructor() {
        super('Game');
    }

    create() {
        this.camera = this.cameras.main;
        this.camera.setBounds(0, 0, 1024, 576);

        // Add background
        this.background = this.add.image(0, 0, 'gameBG').setOrigin(0, 0);
        this.background.setAlpha(1);

        // set the world bounds so the player can't go below y = 435
        this.physics.world.setBounds(0, 0, 1024, 440);

        // Create player and add to scene
        this.player = new Player({
            scene: this,
            x: 100,
            y: 450,
            texture: 'playerSprite'
        }, 100, 0);

        // Add player to the scene
        this.add.existing(this.player);

        // Create enemy and add to scene periodically
        this.time.addEvent({
            delay: 10000,
            callback: () => {
                const enemyX = Enemy.randomX(); // Get random x position for enemy
                const enemyY = 435; // Set y position of the enemy
                const enemy = Enemy.addEnemy(this, enemyX, enemyY, 'enemySprite', 10); // Create and add enemy
                
                // get enemy to shoe up on scene
                this.add.existing(enemy);
            },
            loop: true
        });
    }

    update() {
        if (this.player) {
            this.player.update();
        }
    }
}

export default Game;
