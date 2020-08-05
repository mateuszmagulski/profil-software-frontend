"use strict";
class Result {
    static checkWin(game_result) {
        let winner = [{ player: '', points: 0 }];
        game_result.forEach(player_result => {
            if (winner[0].points < player_result.points) {
                winner = [player_result];
            }
            else if (winner[0].points === player_result.points) {
                winner.push(player_result);
            }
        });
        if (winner.length > 1) {
            alert(`REMIS, wygrywają: ${winner.map(result => `${result.player} - ${result.points}`)}`);
        }
        else {
            alert(`Wygrał: ${winner[0].player} - ${winner[0].points} punktów.`);
        }
    }
    static playerWin(player_result) {
        if (player_result.points === 22) {
            alert(`Wygrał: ${player_result.player} - ${player_result.points}, uzyskał perskie oko`);
        }
        else {
            alert(`Wygrał: ${player_result.player}, inni gracze uzyskali więcej, niż 21 punktów`);
        }
    }
    static playerLose(player_result) {
        alert(`Gracz: ${player_result.player} przegrał uzyskał ${player_result.points}, punktów`);
    }
}
// Result.checkWin([{player:'Gracz 1',points: 19}, {player:"Gracz 2", points: 19}])
// Result.playerLose({player:"Gracz 3", points:24})
