class Draw {
    constructor(deck) {
        this.card = {};
        this.deck = deck;
    }
    async drawCard() {
        const result = await fetch(`https://deckofcardsapi.com/api/deck/${this.deck}/draw/?count=1`);
        const data = await result.json();
        this.card = data.cards[0];
    }
    getCard() {
        return this.card;
    }
    cardValue() {
        let value = 0;
        if (this.card.value === 'JACK') {
            value = 2;
        }
        else if (this.card.value === 'QUEEN') {
            value = 3;
        }
        else if (this.card.value === 'KING') {
            value = 4;
        }
        else if (this.card.value === 'ACE') {
            value = 11;
        }
        else {
            value = parseInt(this.card.value);
        }
        return value;
    }
}
export { Draw };
