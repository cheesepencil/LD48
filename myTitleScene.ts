import { join } from "node:path";

export class MyTitleScene extends Phaser.Scene {
    private ready: boolean = false;

    constructor() {
        super({
            key: "MyTitleScene",
        });
    }

    preload(): void {
        this.load.image("dude", require("./assets/dude.png"));
        this.load.image("ear", require("./assets/ear.png"));
        this.load.image("qtip", require("./assets/qtip.png"));
    }

    create(): void {
        this.add.text(128, 0, "LUDUM DARE 48").setOrigin(0.5, 0);
        this.add.text(128, 10, "DEEPER AND DEEPER").setOrigin(0.5, 0);
        this.add.text(128, 128, "DON'T TRY THIS AT HOME").setOrigin(0.5, 0);
        // this.input.keyboard.on("keydown-SPACE", () => {
        //     console.log('pushed space...');
        //     if (this.ready) {
        //         console.log('pushed space AND ready...');
        //         this.ready = false;
        //         this.scene.start("MyGameScene");
        //     }
        // });
        // this.time.delayedCall(2000, this.readyUp, [], this);
        this.scene.start("MyGameScene", { level: 1 });
    }

    readyUp(): void {
        this.ready = true;
        this.add.text(128, 256, "<press space>").setOrigin(0.5, 1);
    }
}
