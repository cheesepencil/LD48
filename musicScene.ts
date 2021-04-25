import { join } from "node:path";

export class MusicScene extends Phaser.Scene {
    private ready: boolean = false;

    constructor() {
        super({
            key: "MusicScene",
        });
    }

    create(): void {
        this.sound.play("tunes", {
            loop: true,
            volume: 0.5
        });
    }
}
