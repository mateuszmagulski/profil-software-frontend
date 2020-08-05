"use strict";
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
    constructor(name) {
        this.name = name;
        this.points = 0;
        this.cards = [];
        this.active = false;
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
        return this.points < 21 ? true : false;
    }
}
const player_1 = new Player("Gracz 1");
console.log(player_1.cards);
player_1.addCard(card);
console.log(player_1.cards);
console.log("--------------");
console.log(player_1.getPointsValue());
player_1.addPoints(10);
console.log(player_1.getPointsValue());
console.log(player_1.checkCanPlay());
player_1.addPoints(11);
console.log(player_1.getPointsValue());
console.log(player_1.checkCanPlay());
