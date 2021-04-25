export class MyGameScene extends Phaser.Scene {
    private level: number;
    private earSprite: Phaser.GameObjects.Sprite;
    private qtipSprite: Phaser.GameObjects.Sprite;
    private dudeSprite: Phaser.GameObjects.Sprite;
    private qtipTween: Phaser.Tweens.Tween;
    private blackRect: Phaser.GameObjects.Rectangle;
    private committed: boolean;
    private canContinue: boolean;

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
        const qtipSpeed = [3000, 2000, 1000, 750, 500];

        this.committed = false;
        this.canContinue = false;

        this.qtipSprite = this.add.sprite(256, 8, "qtip").setOrigin(0.5, 0.5);
        this.blackRect = this.add
            .rectangle(0, 0, 48, 256, 0x000000)
            .setOrigin(0, 0);
        this.add.text(128, 0, `Level ${this.level} of 5`).setOrigin(0.5, 0);
        this.dudeSprite = this.add.sprite(0, 0, "dude").setOrigin(0, 0);
        this.earSprite = this.add.sprite(30, 128, "ear").setOrigin(0, 0.5);
        this.input.on('pointerdown', this.onInput, this);
        this.input.keyboard.on("keydown-SPACE", this.onInput, this);

        this.qtipTween = this.tweens.add({
            targets: this.qtipSprite,
            y: 256 - 8,
            duration: qtipSpeed[this.level - 1],
            repeat: -1,
            yoyo: true,
            ease: "Sine.easeInOut",
        });
    }

    onInput(): void {
        if (!this.committed) {
            this.committed = true;
            // bad hack for easy math
            const targetRect = this.add
                .rectangle(
                    this.earSprite.x + 10,
                    this.earSprite.y + 10,
                    8,
                    10,
                    0xff0000
                )
                .setOrigin(0, 0.5)
                .setAlpha(0);
            this.qtipTween.stop();
            if (
                this.qtipSprite.y >= targetRect.getTopCenter().y &&
                this.qtipSprite.y <= targetRect.getBottomCenter().y
            ) {
                this.succeed();
            } else {
                this.fail();
            }
        } else if (this.canContinue) {
            if (this.level > 5) {
                this.scene.start("YouWinScene");
            } else {
                this.scene.start("MyGameScene", { level: this.level });
            }
        }
    }

    succeed(): void {
        this.level++;
        const timeline = this.tweens.createTimeline();

        timeline.add({
            targets: this.qtipSprite,
            x: 72,
            duration: 250,
            ease: "Sine.easeIn",
        });
        timeline.add({
            targets: this.qtipSprite,
            x: 68,
            duration: 250,
            onStartScope: this,
            onStart: () => {
                this.dudeSprite.setTexture("dudeHappy");
                this.sound.play("ohYeah");
            },
        });
        timeline.add({
            targets: this.qtipSprite,
            x: 32,
            duration: 500,
        });
        timeline.add({
            targets: this.qtipSprite,
            x: 68,
            yoyo: true,
            repeat: -1,
            duration: 500,
            ease: "Sine.easeInOut",
            onStart: () => {
                this.canContinue = true;
            },
            onStartScope: this,
        });

        timeline.play();
    }

    fail(): void {
        this.blackRect.setAlpha(0);
        const timeline = this.tweens.createTimeline();

        timeline.add({
            targets: this.qtipSprite,
            x: 52,
            duration: 300,
            ease: "Sine.easeIn",
        });
        timeline.add({
            targets: this.qtipSprite,
            y: 300,
            duration: 1000,
            ease: "Back.easeIn",
            onStart: this.spinMe,
            onStartScope: this,
            onComplete: () => {
                this.canContinue = true;
            },
            onCompleteScope: this,
        });

        timeline.play();
    }

    spinMe(): void {
        this.tweens.add({
            targets: this.qtipSprite,
            x: 128,
            duration: 1000,
        });
        this.tweens.addCounter({
            from: 0,
            to: 360,
            repeat: -1,
            duration: 500,
            onUpdate: (tween) => {
                this.qtipSprite.setAngle(tween.getValue());
            },
            onUpdateScope: this,
        });
        let targetWiggle = this.dudeSprite;
        if (
            this.qtipSprite.y > this.earSprite.getTopCenter().y &&
            this.qtipSprite.y < this.earSprite.getBottomCenter().y
        ) {
            targetWiggle = this.earSprite;
        }
        this.tweens.add({
            targets: targetWiggle,
            x: targetWiggle.x - 5,
            y: targetWiggle.y + 5,
            duration: 3000,
            ease: "Elastic",
            easeParams: [2, 0.0001],
        });

        const ouchNo = Phaser.Math.Between(1, 3);
        this.sound.play(`ouch${ouchNo}`);
    }
}
