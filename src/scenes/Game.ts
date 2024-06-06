import { Scene } from 'phaser';

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

        this.background = this.add.image(2080, 1152, 'backgroundBG');
        this.background.setAlpha(0.5);


        this.input.once('pointerdown', () => {

            this.scene.start('GameOver');

        });
    }
}
