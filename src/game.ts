import { Player } from './player.js';
import { Draw, Card } from './draw.js';

class Game {
  active: boolean;
  active_player: Player;
  players: Player[];
  winner: Player[];
  deck: string;
  player_boards: NodeListOf<HTMLElement>;
  player_name_div: NodeListOf<HTMLElement>;
  add_player_board: HTMLElement;
  add_player_button: HTMLElement;
  del_player_buttons: NodeListOf<HTMLElement>;
  start_button: HTMLElement;
  draw_button: HTMLElement;
  pass_button: HTMLElement;
  cards_div: NodeListOf<HTMLElement>;
  result_spans: NodeListOf<HTMLElement>;
  message_box: HTMLElement;
  message_div: HTMLElement;
  confirm_message_button: HTMLElement;
  AITurn_button: HTMLElement;

  constructor() {
    this.active = false;
    this.active_player = null;
    this.players = [];
    this.winner = [];
    this.deck = '';
    this.player_boards = document.querySelectorAll(
      'div.player_board:nth-child(-n+4)'
    );
    this.player_name_div = document.querySelectorAll('div.player_name');
    this.cards_div = document.querySelectorAll('div.cards');
    this.result_spans = document.querySelectorAll('span.player_result');
    this.del_player_buttons = document.querySelectorAll('button.del_player');
    this.del_player_buttons.forEach((button) =>
      button.addEventListener('click', () => this.delPlayer())
    );
    this.add_player_board = document.querySelector('div.add_player');
    this.add_player_button = document.getElementById('add_player_button');
    this.add_player_button.addEventListener('click', () =>
      this.addPlayer(this.players.length + 1)
    );
    this.start_button = document.getElementById('start');
    this.start_button.addEventListener('click', () => this.startGame());
    this.draw_button = document.getElementById('draw');
    this.draw_button.addEventListener('click', () => this.draw());
    this.pass_button = document.getElementById('pass');
    this.pass_button.addEventListener('click', () => this.pass());
    this.AITurn_button = document.getElementById('AITurn');
    this.AITurn_button.addEventListener('click', () => this.AITurn());
    this.message_box = document.getElementById('message_box');
    this.message_div = document.getElementById('message');
    this.confirm_message_button = document.getElementById('confirm_message');
    this.confirm_message_button.addEventListener('click', () => {
      if (this.active) {
        this.nextPlayer();
        this.message_box.style.display = 'none';
        this.render();
      } else {
        window.location.reload(true);
      }
    });
    this.getDeck();
    this.render();
  }

  async getDeck() {
    const result = await fetch(
      'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
    );
    const data = await result.json();
    this.deck = data.deck_id;
  }

  addPlayer(index: number) {
    this.players.push(new Player(index, `Gracz ${index}`, false));
    this.render();
  }

  delPlayer() {
    this.players.pop();
    this.render();
  }

  startGame() {
    if (this.players.length) {
      if (this.players.length === 1) {
        this.players.push(new Player(2, 'Komputer', true));
      }
      this.active = true;
      this.nextPlayer();
      this.render();
    }
  }

  async draw() {
    const draw = new Draw(this.deck);
    draw.drawCard().then((_) => {
      if (this.active_player.getPointsValue() < 22) {
        const card: Card = draw.getCard();
        this.active_player.addCard(card);
        const card_img = document.createElement('img');
        card_img.src = card.image;
        this.cards_div[this.active_player.id - 1].appendChild(card_img);
        this.active_player.addPoints(draw.cardValue());
        const canPlay = this.active_player.checkCanPlay();
        if (!canPlay.canPlay) {
          this.playerEndRound({
            player: this.active_player,
            win: canPlay.win,
            lose: canPlay.lose
          });
        } else {
          this.render();
        }
      }
    });
  }

  pass() {
    this.playerEndRound({
      player: this.active_player,
      win: false,
      lose: false
    });
  }

  nextPlayer() {
    if (!this.active_player) {
      this.active_player = this.players[0];
    } else {
      this.active_player = this.players[this.active_player.id];
    }
    this.draw();
    this.draw();
  }
  AITurn() {
    if (this.active_player.getPointsValue() < this.winner[0].getPointsValue()) {
      this.draw();
    } else {
      this.pass();
    }
  }
  playerEndRound(result: { player: Player; win: boolean; lose: boolean }) {
    let message = '';
    if (result.win) {
      message = `${result.player.name} wygrał uzyskując "PERSKIE OCZKO"`;
      this.active = false;
      this.render(message);
      return;
    }
    if (!result.lose) {
      if (
        !this.winner[0] ||
        result.player.getPointsValue() > this.winner[0].getPointsValue()
      ) {
        this.winner = [result.player];
      } else if (
        result.player.getPointsValue() === this.winner[0].getPointsValue()
      ) {
        this.winner.push(result.player);
      }
    }
    if (
      this.active_player.id === this.players.length - 1 &&
      !this.winner.length
    ) {
      message = `${
        this.players[this.players.length - 1].name
      } wygrał, inni uzyskali więcej niż 21 punktów`;
      this.active = false;
      this.render(message);
      return;
    }
    if (this.active_player.id === this.players.length) {
      message = `Koniec gry, wygrywa: ${this.winner
        .map((player) => `${player.name} - ${player.getPointsValue()}`)
        .join(', ')}`;
      this.active = false;
      this.render(message);
    } else {
      message = 'Następny gracz!!!';
      this.render(message);
    }
  }

  render(message: string = '') {
    if (message) {
      this.message_box.style.display = 'flex';
      this.message_div.textContent = message;
    }
    this.player_boards.forEach((board, index) => {
      if (this.players[index]) {
        board.style.display = 'flex';
        this.player_name_div[index].textContent = this.players[index].name;
        if (this.active || this.active_player) {
          this.result_spans[index].textContent = this.players[index]
            .getPointsValue()
            .toString();
          this.del_player_buttons[index].style.display = 'none';
        } else if (index === this.players.length - 1) {
          this.del_player_buttons[index].style.display = 'inline';
        } else {
          this.del_player_buttons[index].style.display = 'none';
        }
      } else {
        board.style.display = 'none';
      }
      board.style.borderColor =
        this.active && index + 1 === this.active_player.id ? 'red' : 'gray';
    });
    if (this.players.length < 4 && !this.active && !this.active_player) {
      this.add_player_board.style.display = 'flex';
    } else {
      this.add_player_board.style.display = 'none';
    }
    if (this.active || this.active_player) {
      this.start_button.style.display = 'none';
      if (this.active_player.ai) {
        this.AITurn_button.style.display = 'inline';
        this.draw_button.style.display = 'none';
        this.pass_button.style.display = 'none';
      } else {
        this.draw_button.style.display = 'inline';
        this.pass_button.style.display = 'inline';
        this.AITurn_button.style.display = 'none';
      }
    } else {
      this.start_button.style.display = 'inline';
    }
  }
}

const game = new Game();
game.getDeck();

export { Game };
