import {Ball} from './game_components/Ball';
import {Paddle} from './game_components/Paddle';
import {Brick} from './game_components/Brick';
import {PowerUp} from './game_components/PowerUp';
import {Level} from "./game_components/Level";
import {Leaderboard} from "./Leaderboard";


export class Game {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    paddle: Paddle;
    bricks: Brick[];
    powerUps: PowerUp[];
    score: number;
    level: Level;
    balls: Ball[];
    leaderboard: Leaderboard;

    constructor(canvas: HTMLCanvasElement, leaderboard: Leaderboard) {
        this.canvas = canvas;
        this.leaderboard = leaderboard;
        this.context = canvas.getContext('2d')!;
        this.balls = [new Ball(this)];
        this.paddle = new Paddle(this);
        this.bricks = [];
        this.powerUps = [];
        this.score = 0;
        this.level = new Level(this, 2);
        this.init();
    }

    init() {
        this.resetGame();
        this.loop();
    }

    resetGame() {
        this.leaderboard.fetchScores()
        this.level.levelNumber = 1; // Reset to level 1
        this.level.init();
        this.balls = [new Ball(this)];
        this.paddle.reset();
        this.score = 0;
    }

    loop() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const remainingBricks = this.bricks.filter(brick => !brick.destroyed);
        if (remainingBricks.length === 0) {
            this.level.levelNumber++
            this.level = new Level(this, this.level.levelNumber);
            this.level.init();
        }

        this.balls.forEach(ball => ball.update());

        this.paddle.update();

        this.powerUps.forEach(powerUp => powerUp.active && powerUp.update());

        this.draw()
        requestAnimationFrame(() => this.loop());
    }

    draw(): void {
        this.balls.forEach(ball => ball.isActive && ball.draw());
        this.paddle.draw();
        this.bricks.forEach(brick => !brick.destroyed && brick.draw());
        this.powerUps.forEach(powerUp => powerUp.active && powerUp.draw());
        this.drawScore();
    }

    endGame() {
        this.showEndGameModal();
    }

    showEndGameModal() {
        const modal = document.getElementById('endGameModal');
        document.getElementById('finalScore').innerText = this.score.toString();
        modal.style.display = 'block';

        const replayButton = document.getElementById('replayButton');
        const saveScoreButton = document.getElementById('saveScoreButton');

        replayButton.addEventListener('click', () => {
            modal.style.display = 'none';
            this.resetGame();
        });

        saveScoreButton.addEventListener('click', () => {
            modal.style.display = 'none';
            this.showUsernameModal();
        });
    }

    showUsernameModal() {
        const modal = document.getElementById('usernameModal');
        modal.style.display = 'block';

        const submitButton = document.getElementById('submitScoreButton');
        submitButton.addEventListener('click', () => {
            // @ts-ignore
            const username = document.getElementById('username').value;
            if (username) {
                localStorage.setItem('username', username);
                modal.style.display = 'none';
                this.sendScore(username);
            } else {
                alert('Please enter a username.');
            }
        });
    }

    sendScore(username) {
        const score = this.score; // Assume `this.score` holds the final score
        fetch('http://localhost:3000/api/score', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, score}),
        })
            .then(response => response.json())
            .then(() => {
                this.resetGame(); // Reset the game after submitting the score
            })
            .catch((error) => {
                console.error('Error submitting score:', error);
            });
    }


    private drawScore() {
        const ctx = this.context;
        const scoreText = `${this.score}`;
        const scoreTextWidth = ctx.measureText(scoreText).width;
        ctx.fillStyle = "#ffffff";
        ctx.font = "16px Arial";
        ctx.fillText(scoreText, this.canvas.width - scoreTextWidth - 10, 30);
    }
}
