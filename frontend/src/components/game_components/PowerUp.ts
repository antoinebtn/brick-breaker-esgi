import {Game} from '../Game';
import {Ball} from "./Ball";

export class PowerUp {
    game: Game;
    x: number;
    y: number;
    radius: number;
    dy: number;
    letter: string;
    active: boolean;

    constructor(game: Game, x: number, y: number, letter: string) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.radius = 10;
        this.dy = 2;
        this.letter = letter;
        this.active = true;
    }

    update() {
        this.y += this.dy;

        if (
            this.y + this.radius > this.game.paddle.y &&
            this.x > this.game.paddle.x &&
            this.x < this.game.paddle.x + this.game.paddle.width
        ) {
            this.applyEffect();
            this.active = false;
        }

        if (this.y + this.radius > this.game.canvas.height) {
            this.active = false;
        }
    }

    applyEffect() {
        if (this.letter === 'M') {
            this.spawnMultipleBalls();
        } else if (this.letter === 'P') {
            this.enlargePaddle();
        }
    }

    draw() {
        if (!this.active) {
            return;
        }

        const ctx = this.game.context;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#ff0000";
        ctx.fill();
        ctx.closePath();
        ctx.fillStyle = "#ffffff"; // Couleur du texte
        ctx.font = "14px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(this.letter, this.x, this.y);
    }

    spawnMultipleBalls() {
        const newBalls: Ball[] = [];
        const remainingBalls = this.game.balls.filter(ball => ball.isActive);
        remainingBalls.forEach(existingBall => {
            const newBall = new Ball(this.game);
            newBall.x = existingBall.x;
            newBall.y = existingBall.y;
            newBall.dx = -existingBall.dx;
            newBall.dy = existingBall.dy;
            newBalls.push(newBall);
        });
        this.game.balls = this.game.balls.concat(newBalls);
    }

    enlargePaddle() {
        this.game.paddle.width *= 1.5;
        setTimeout(() => {
            this.game.paddle.width /= 1.5;
        }, 10000); // Durée d'effet de 10 secondes
    }
}
