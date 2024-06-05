import {Game} from '../Game';
import {PowerUp} from "./PowerUp";


export class Ball {
    game: Game;
    x: number;
    y: number;
    dx: number;
    dy: number;
    radius: number;
    isActive: boolean;

    constructor(game: Game) {
        this.game = game;
        this.radius = 5;
        this.reset();
        this.isActive = true;
    }

    reset() {
        this.x = this.game.canvas.width / 2;
        this.y = this.game.canvas.height - 30;
        this.dx = 3;
        this.dy = -3;
    }

    update() {
        if (!this.isActive) {
            return
        }

        this.x += this.dx;
        this.y += this.dy;

        this.CheckBallWallCollision();
        this.CheckBallTopCollision();
        this.CheckBallBottomCollision();
        this.CheckBallBrickCollision();
    }

    draw() {
        const ctx = this.game.context;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    createPowerUp(x: number, y: number, letter: string) {
        const powerUp = new PowerUp(this.game, x, y, letter);
        if (this.game.balls.length > 20 && letter === 'M') {
            return;
        }
        this.game.powerUps.push(powerUp);
    }

    private CheckBallBottomCollision(): void {
        if (this.y + this.dy > this.game.canvas.height - this.radius) {
            this.checkPaddleCollision();
        }
    }

    private CheckBallTopCollision(): void {
        if (this.y + this.dy < this.radius) {
            this.dy = -this.dy;
        }
    }

    private CheckBallBrickCollision(): void {
        for (let i = 0; i < this.game.bricks.length; i++) {
            const brick = this.game.bricks[i];
            if (!brick.destroyed) {
                if (
                    this.x > brick.x &&
                    this.x < brick.x + brick.width &&
                    this.y > brick.y &&
                    this.y < brick.y + brick.height
                ) {
                    this.dy = -this.dy;
                    brick.destroyed = true;
                    this.createPowerUpWithProbability(brick.x, brick.y)
                    this.game.score += 10;
                    break;
                }
            }
        }
    }

    private createPowerUpWithProbability(x: number, y: number) {
        const rand = Math.random(); // Génère un nombre entre 0 et 1
        if (rand < 0.15) {
            this.createPowerUp(x, y, 'M');
        } else if (rand < 0.20) {
            this.createPowerUp(x, y, 'P');
        }
    }


    private CheckBallWallCollision(): void {
        if (this.x + this.dx > this.game.canvas.width - this.radius || this.x + this.dx < this.radius) {
            this.dx = -this.dx;
        }
    }

    private checkPaddleCollision() {
        if (this.x > this.game.paddle.x && this.x < this.game.paddle.x + this.game.paddle.width) {
            const relativeCollisionX = (this.x - this.game.paddle.x) / this.game.paddle.width;

            const maxAngle = Math.PI / 3;
            const angle = (0.5 - relativeCollisionX) * maxAngle;

            const speed = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
            this.dx = -speed * Math.sin(angle);
            this.dy = -speed * Math.cos(angle);
        } else {
            this.isActive = false;
            const remainingBalls = this.game.balls.filter(ball => ball.isActive);
            if (remainingBalls.length === 0) {
                this.game.endGame();
            }
        }
    }
}
