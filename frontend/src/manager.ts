import {Game} from "./components/Game";
import {Leaderboard} from "./components/Leaderboard";

export class Manager {
    private game: Game;
    private leaderboard: Leaderboard;

    constructor() {
        document.addEventListener('DOMContentLoaded', () => this.start());
    }

    private start(): void {
        this.leaderboard = new Leaderboard();

        const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;

        if (canvas) {
            this.game = new Game(canvas, this.leaderboard);
            this.game.loop();
        } else {
            console.error('Canvas element not found');
        }
    }
}
