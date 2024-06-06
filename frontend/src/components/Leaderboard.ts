import {Score} from "../interfaces/Score";

export class Leaderboard {
    private leaderboardElement: HTMLElement;
    private apiUrl: string;

    constructor() {
        this.apiUrl = "http://localhost:3000";
        this.leaderboardElement = document.getElementById('scoreList');
    }

    async fetchScores() {
        try {
            const response = await fetch(`${this.apiUrl}/api/top-scores`);
            if (response.ok) {
                const scores = await response.json();
                this.displayScores(scores);
            } else {
                console.error('Failed to fetch scores:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching scores:', error);
        }
    }

    displayScores(scores) {
        this.leaderboardElement.innerHTML = '';
        scores.forEach((score: Score, index: number) => {
            const scoreItem = document.createElement('li');
            scoreItem.textContent = `${score.username}: ${score.score}`;
            this.leaderboardElement.appendChild(scoreItem);
        });
    }
}