import { Physics } from 'phaser';
import Player from './Player';

class Enemy extends Physics.Arcade.Sprite {
    health: number = 10;

    constructor(config: { scene: Phaser.Scene; x: number; y: number; key: string }, health: number) {
        super(config.scene, config.x, config.y, config.key);
        this.health = health;

        // Enable physics
        config.scene.physics.world.enable(this);

        // Set collide world bounds
        this.setCollideWorldBounds(true);
    }

    // Add enemy to the scene
    static addEnemy(scene: Phaser.Scene, x: number, y: number, key: string, health: number) {
        const enemy = new Enemy({ scene, x, y, key }, health);
        scene.add.existing(enemy);
        return enemy;
    }

    // Generate random x value for enemy (between 500 and 924)
    static randomX() {
        return Math.floor(Math.random() * (924 - 500) + 500);
    }

    // Makes the enemy sprite move towards player if they're within 100 pixels
    wakeUp(player: Player) {
        if (this.x - player.x < 100) {
            this.x -= 5;
        }
    }

    // If enemy hits player, player loses health
    hitPlayer(player: Player) {
        if (this.x - player.x < 10) {
            player.health -= 10;
        }
    }

    // If player hits enemy, enemy loses health
    hitEnemy(player: Player, cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
        if (player.x - this.x < 10 && cursors.space.isDown) {
            this.health -= 10;
            player.score += 10;
        }
    }

    // If the enemy's health goes to 0, destroy the sprite
    dead() {
        if (this.health === 0) {
            this.destroy();
        }
    }
}

export default Enemy;
