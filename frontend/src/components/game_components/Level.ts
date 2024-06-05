import {Game} from '../Game';
import {Brick} from "./Brick";

export class Level {
    game: Game;
    levelNumber: number;

    constructor(game: Game, levelNumber: number) {
        this.game = game;
        this.levelNumber = levelNumber;
    }

    init() {
        this.game.bricks = [];
        this.createBricks();
    }

    createBricks() {
        const rows = this.levelNumber + 1; // Augmenter les rangées avec le niveau
        const cols = 6;
        const padding = 3;
        const offsetTop = 30;
        const offsetLeft = 30;

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const x = c * (75 + padding) + offsetLeft;
                const y = r * (20 + padding) + offsetTop;
                this.game.bricks.push(new Brick(this.game, x, y));
            }
        }
    }
}
