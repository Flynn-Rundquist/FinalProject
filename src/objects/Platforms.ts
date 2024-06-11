/**
 * This is the platforms that players jump on.
 *
 * By: Flynn Rundquist
 * Version: 1.0
 * Since: 2024-06-06
 */

import { Physics, Scene } from 'phaser';

class Platforms extends Physics.Arcade.StaticGroup {
    constructor(scene: Scene) {
        super(scene.physics.world, scene);

        // Create the platforms
        this.create(400, 568, 'ground').setScale(2).refreshBody();
        this.create(600, 400, 'ground');
        this.create(50, 250, 'ground');
        this.create(750, 220, 'ground');
    }
}