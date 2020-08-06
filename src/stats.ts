class Stats {
    gameStats: GameResult
    constructor() {
        this.gameStats = []
    }

    addPlayerResult(player_result:PlayerResult) {
        this.gameStats.push(player_result)
    }
    getGameStats() {
        return this.gameStats
    }
}

const stats = new Stats();
stats.addPlayerResult({player:1, points:20})
stats.addPlayerResult({player:2, points:21})

console.log(stats.getGameStats())

