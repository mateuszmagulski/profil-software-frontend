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
class Draw {
    private card: Card |null;
    
    constructor() {
        this.card = null;
    }
    async drawCard() {
        const result = await fetch("https://deckofcardsapi.com/api/deck/32e6otun2ecb/draw/?count=1")
        const data = await result.json()
        this.card = data.cards[0]
    }
    getCard() {
        return this.card
    }
}

const draw = new Draw()
draw.drawCard().then(res => {
    console.log(draw.getCard())
})