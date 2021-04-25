export class MyGameScene extends Phaser.Scene {
    private level: number;
    private earSprite: Phaser.GameObjects.Sprite;
    private qtipSprite: Phaser.GameObjects.Sprite;

    constructor() {
        super({
            key: "MyGameScene",
        });
    }

    init(data: any): void {
        this.level = data.level;
    }

    preload(): void {}

    create(): void {
        this.add.text(128, 0, `Level ${this.level}`).setOrigin(0.5, 0);
        this.add.image(0, 0, "dude").setOrigin(0, 0);
        this.earSprite = this.add.sprite(30, 128, "ear").setOrigin(0, 0.5);
        this.qtipSprite = this.add.sprite(256, 8, "qtip").setOrigin(0.5, 0.5);

        const qtipTween = this.tweens.add({
            targets: this.qtipSprite,
            y: 256-8,
            duration: 2000,
            repeat: -1,
            yoyo: true,
            ease: "Sine.easeInOut"
        });
    }
}
