import { Card } from './draw.js';

const card: Card = {
  code: 'AS',
  image: 'https://deckofcardsapi.com/static/img/AS.png',
  images: {
    svg: 'https://deckofcardsapi.com/static/img/AS.svg',
    png: 'https://deckofcardsapi.com/static/img/AS.png'
  },
  value: 'ACE',
  suit: 'SPADES'
};
class Player {
  id: number;
  name: string;
  private points: number;
  cards: Card[];
  ai: boolean;

  constructor(id: number, name: string, ai: boolean) {
    this.id = id;
    this.name = name;
    this.points = 0;
    this.cards = [];
    this.ai = ai;
  }
  addCard(card: Card) {
    this.cards.push(card);
  }
  addPoints(points: number) {
    this.points += points;
  }
  getPointsValue() {
    return this.points;
  }
  checkCanPlay() {
    let result;
    if (this.points === 22 && this.cards.length === 2) {
      result = { canPlay: false, win: true, lose: false };
    } else if (this.points > 21) {
      result = { canPlay: false, win: false, lose: true };
    } else {
      result = { canPlay: true, win: false, lose: false };
    }
    return result;
  }
}
export { Player };
