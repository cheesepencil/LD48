import { join } from "node:path";

export class YouWinScene extends Phaser.Scene {
    private ready: boolean = false;

    constructor() {
        super({
            key: "YouWinScene",
        });
    }

    create(): void {
        this.add.image(0, 0, "youWin").setOrigin(0, 0);
    }
}
