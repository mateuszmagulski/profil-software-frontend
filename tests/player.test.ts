import { Player } from '../src/player';

let player: Player;
const card = {
  image: 'https://deckofcardsapi.com/static/img/KH.png',
  value: 'KING',
  suit: 'HEARTS',
  code: 'KH'
};
beforeAll(() => {
  player = new Player(1, 'Gracz 1', false);
});

test('add points, get points value', () => {
  player.addPoints(10);
  expect(player.getPointsValue()).toBe(10);
  player.addPoints(5);
  expect(player.getPointsValue()).toBe(15);
});

test('add card', () => {
  player.addCard(card);
  expect(player.cards[0]).toBe(card);
});

test('check can play', () => {
  expect(player.checkCanPlay()).toMatchObject({
    canPlay: true,
    win: false,
    lose: false
  });
  player.addCard(card);
  player.addPoints(7);
  expect(player.checkCanPlay()).toMatchObject({
    canPlay: false,
    win: true,
    lose: false
  });
  player.addPoints(7);
  expect(player.checkCanPlay()).toMatchObject({
    canPlay: false,
    win: false,
    lose: true
  });
});
