import {Game} from '../Game';
import {PowerUp} from "./PowerUp";

export class Brick {
    game: Game;
    x: number;
    y: number;
    width: number;
    height: number;
    destroyed: boolean;
    color: string;

    constructor(game: Game, x: number, y: number) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = 75;
        this.height = 20;
        this.destroyed = false;
        this.color = "#2e4682"
    }

    reset() {
        this.destroyed = false;
    }

    draw() {
        if (!this.destroyed) {
            const ctx = this.game.context;
            ctx.beginPath();
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.closePath();
        }
    }
}
