import { MyTitleScene } from "./myTitleScene";
import { MyGameScene } from "./myGameScene";
import { YouWinScene } from "./youWinScene";
import { MusicScene } from "./musicScene";

type GameConfig = Phaser.Types.Core.GameConfig;

let fps = 60;

export const MyGameConfig: GameConfig = {
    type: Phaser.AUTO,
    input: {
        gamepad: true,
        keyboard: true,
        touch: true
    },
    render: {
        pixelArt: true,
        antialias: false,
    },
    scale: {
        mode: Phaser.Scale.FIT,
    },
    parent: "game-parent",
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 },
            fps: fps,
        },
    },
    width: 256,
    height: 256,
    fps: {
        target: fps,
    },
    scene: [MyTitleScene, MyGameScene, YouWinScene, MusicScene],
};
