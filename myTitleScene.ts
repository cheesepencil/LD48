import { join } from "node:path";

export class MyTitleScene extends Phaser.Scene {
    private ready: boolean = false;

    constructor() {
        super({
            key: "MyTitleScene",
        });
    }

    preload(): void {
        this.load.image("title", require("./assets/title.png"));
        this.load.image("dude", require("./assets/dude.png"));
        this.load.image("dudeHappy", require("./assets/dudeHappy.png"));
        this.load.image("ear", require("./assets/ear.png"));
        this.load.image("qtip", require("./assets/qtip.png"));
        this.load.image("youWin", require("./assets/youwin.png"));
        this.load.audio("ohYeah", require("./assets/ohyeah.ogg"));
        this.load.audio("ouch1", require("./assets/ouch1.ogg"));
        this.load.audio("ouch2", require("./assets/ouch2.ogg"));
        this.load.audio("ouch3", require("./assets/ouch3.ogg"));
        this.load.audio("tunes", require("./assets/tunes.ogg"));
    }

    create(): void {
        this.add.image(0, 0, "title").setOrigin(0, 0);
        this.add.text(128, 0, "LUDUM DARE 48").setOrigin(0.5, 0);
        this.add.text(128, 12, "DEEPER AND DEEPER").setOrigin(0.5, 0);
        this.add.text(128, 24, "@cheesepencil").setOrigin(0.5, 0);
        this.input.on('pointerdown', () => {
            console.log("pushed space...");
            if (this.ready) {
                console.log("pushed space AND ready...");
                this.ready = false;
                this.scene.start("MyGameScene", { level: 1 });
            }
        });
        this.input.keyboard.on("keydown-SPACE", () => {
            console.log("pushed space...");
            if (this.ready) {
                console.log("pushed space AND ready...");
                this.ready = false;
                this.scene.start("MyGameScene", { level: 1 });
            }
        });
        this.time.delayedCall(2000, this.readyUp, [], this);
        this.scene.launch("MusicScene");
    }

    readyUp(): void {
        this.ready = true;
        const getReady = this.add.text(128, 256, "<press space>").setOrigin(0.5, 1).setAlpha(0);
        this.tweens.add({
            targets: getReady,
            alpha: 1,
            yoyo: true,
            repeat: -1,
            duration: 1000
        });
    }
}
