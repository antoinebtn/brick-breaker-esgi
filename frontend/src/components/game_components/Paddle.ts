import {Game} from '../Game';

export class Paddle {
    game: Game;
    width: number;
    height: number;
    x: number;
    y: number;
    dx: number;
    color: string;

    constructor(game: Game) {
        this.game = game;
        this.width = 140;
        this.height = 20;
        this.x = (game.canvas.width - this.width) / 2;
        this.y = game.canvas.height - this.height - 10;
        this.dx = 7;
        this.color = "#ffcc00"
        document.addEventListener('keydown', this.keyDownHandler.bind(this), false);
        document.addEventListener('keyup', this.keyUpHandler.bind(this), false);
    }

    reset() {
        this.x = (this.game.canvas.width - this.width) / 2;
    }

    update() {
        this.x += this.dx;

        if (this.x < 0) {
            this.x = 0;
        } else if (this.x + this.width > this.game.canvas.width) {
            this.x = this.game.canvas.width - this.width;
        }
    }

    draw() {
        const ctx = this.game.context;
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    keyDownHandler(event: KeyboardEvent) {
        if (event.key === 'Right' || event.key === 'ArrowRight') {
            this.dx = 7;
        } else if (event.key === 'Left' || event.key === 'ArrowLeft') {
            this.dx = -7;
        }
    }

    keyUpHandler(event: KeyboardEvent) {
        if (event.key === 'Right' || event.key === 'ArrowRight' || event.key === 'Left' || event.key === 'ArrowLeft') {
            this.dx = 0;
        }
    }
}
