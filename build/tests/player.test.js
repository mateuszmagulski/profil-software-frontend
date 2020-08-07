import { Player } from '../src/player';
let player;
beforeAll(() => {
    player = new Player(1, 'Gracz 1', false);
});
console.log(player);
