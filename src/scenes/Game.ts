import { Scene } from 'phaser';
import Player from '../sprites/Player';
import Enemy from '../sprites/Enemy';

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    msg_text : Phaser.GameObjects.Text;

    player: Phaser.GameObjects.Sprite | null
    enemy: Phaser.GameObjects.Sprite | null
    platforms: Phaser.Physics.Arcade.StaticGroup | null
    coin: Phaser.Physics.Arcade.StaticGroup | null
    score: number

    constructor()
    {
        super('Game');

        this.player = null;
        this.enemy = null;
        this.platforms = null;
        this.coin = null;
        this.score = 0;
    }

    config: Phaser.Types.Scenes.SettingsConfig;

    create()
    {
        this.camera = this.cameras.main;
        this.camera.setBounds(0, 0, 1024, 576);
        
        // gave me an error when i just did this.add.sprite, ai suggested this way. fix later
        this.player = this.add.sprite(100, 199, 'playerSprite');
        let player = new Player({ scene: this, x: 100, y: 0, key: 'playerSprite' }, 100, 0);

        // enemy (same issue as above)
        this.enemy = this.add.sprite(100, 450, 'enemySprite');
        let enemy = new Enemy({ scene: this, x: 100, y: 450, key: 'enemySprite' }, 10);

        this.background = this.add.image(0, 0, 'gameBG').setOrigin(0, 0);
        this.background.setAlpha(1);

        // add player sprite (centered around 100, 450)
        Player.addPlayer(this, player);

            // every 10 seconds, add an enemy to the scene
            this.time.addEvent({
                delay: 10000,
                callback: () => {
                    enemy.addEnemy(this, enemy);
                },
                loop: true
            });

    }
}
