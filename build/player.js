const card = {
    code: "AS",
    image: "https://deckofcardsapi.com/static/img/AS.png",
    images: {
        svg: "https://deckofcardsapi.com/static/img/AS.svg",
        png: "https://deckofcardsapi.com/static/img/AS.png"
    },
    value: "ACE",
    suit: "SPADES"
};
class Player {
    constructor(name, ai) {
        this.name = name;
        this.points = 0;
        this.cards = [];
        this.ai = ai;
    }
    addCard(card) {
        this.cards.push(card);
    }
    addPoints(points) {
        this.points += points;
    }
    getPointsValue() {
        return this.points;
    }
    checkCanPlay() {
        let result;
        if (this.points === 22 && this.cards.length === 2) {
            result = { canPlay: false, win: true, lose: false };
        }
        else if (this.points > 21) {
            result = { canPlay: false, win: false, lose: true };
        }
        else {
            result = { canPlay: true, win: false, lose: false };
        }
        return result;
    }
}
// console.log(player_1.cards)
// player_1.addCard(card)
// console.log(player_1.cards)
// console.log("--------------")
// console.log(player_1.getPointsValue())
// player_1.addPoints(10)
// console.log(player_1.getPointsValue())
// console.log(player_1.checkCanPlay())
// player_1.addPoints(11)
// console.log(player_1.getPointsValue())
// console.log(player_1.checkCanPlay())
export { Player };
