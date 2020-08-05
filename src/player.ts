interface Card {
    code: string;
    image: string;
    images: {
        svg:string;
        png:string;
    }
    value: string;
    suit: string;
}

const card:Card = {
    code: "AS",
    image: "https://deckofcardsapi.com/static/img/AS.png",
    images: {
      svg: "https://deckofcardsapi.com/static/img/AS.svg",
      png: "https://deckofcardsapi.com/static/img/AS.png"
    },
    value: "ACE",
    suit: "SPADES"
  }
class Player {
    name: string;
    private points: number;
    cards: Card[];
    active: boolean;

    constructor(name:string){
        this.name = name;
        this.points = 0;
        this.cards = [];
        this.active = false;
    }
    addCard(card:Card) {
        this.cards.push(card);
    }
    addPoints(points:number) {
        this.points +=points;
    }
    getPointsValue() {
        return this.points;
    }
    checkCanPlay() {
        return this.points < 21 ? true:false;
    }
}

const player_1 = new Player("Gracz 1")

console.log(player_1.cards)
player_1.addCard(card)
console.log(player_1.cards)
console.log("--------------")
console.log(player_1.getPointsValue())
player_1.addPoints(10)
console.log(player_1.getPointsValue())
console.log(player_1.checkCanPlay())
player_1.addPoints(11)
console.log(player_1.getPointsValue())
console.log(player_1.checkCanPlay())
