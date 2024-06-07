import { Scene } from 'phaser';
import Player from '../sprites/Player';
import Enemy from '../sprites/Enemy';

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    msg_text : Phaser.GameObjects.Text;

    constructor ()
    {
        super('Game');
    }

    create ()
    {
        this.camera = this.cameras.main;
        this.camera.setBounds(0, 0, 1024, 576);
        this.camera.setBackgroundColor('#87CEEB');

        this.background = this.add.image(512, 384, 'backgroundBG');
        this.background.setAlpha(0.5);

        let player = new Player(this, 100, 450, 100, 0);
        this.add.existing(player);

        // every 10 seconds, add an enemy to the scene
        this.time.addEvent({
            delay: 10000,
            callback: () => {
                let enemy = new Enemy(this, 0, 0, 10);
                enemy.addEnemy();
            },
            loop: true
        });

    };

}
