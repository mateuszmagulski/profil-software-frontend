import {Player} from "./player.js";
import {Draw, Card} from "./draw.js";

class Game {
    active: number;
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
    message_box:HTMLElement;
    message_div: HTMLElement;
    confirm_message_button: HTMLElement;
    AITurn_button: HTMLElement;
    
    constructor() {
        this.active = 0;
        this.players = [];
        this.winner = [];
        this.deck ="";
        this.player_boards = document.querySelectorAll("div.player_board:nth-child(-n+4)");
        this.add_player_board = document.querySelector("div.add_player");
        this.player_name_div = document.querySelectorAll("div.player_name");
        this.add_player_button = document.getElementById("add_player_button");
        this.add_player_button.addEventListener("click",() => this.addPlayer(this.players.length+1))
        this.del_player_buttons = document.querySelectorAll("button.del_player");
        this.del_player_buttons.forEach(button=>button.addEventListener("click", () => this.delPlayer()))
        this.start_button = document.getElementById("start");
        this.start_button.addEventListener("click",()=>this.players.length ? this.startGame():false);
        this.draw_button = document.getElementById("draw");
        this.draw_button.addEventListener("click",()=>this.drawCard());
        this.pass_button = document.getElementById("pass");
        this.pass_button.addEventListener("click",()=>this.pass(this.players[this.active-1]));
        this.cards_div = document.querySelectorAll("div.cards");
        this.result_spans = document.querySelectorAll("span.player_result")
        this.message_box = document.getElementById("message_box")
        this.message_div = document.getElementById("message")
        this.confirm_message_button = document.getElementById("confirm_message");
        this.AITurn_button = document.getElementById("AITurn")
        this.AITurn_button.addEventListener("click", ()=>this.AITurn())
        this.confirm_message_button.addEventListener("click", () => {
            if (this.active !== 10){
                this.nextPlayer()
                this.message_box.style.display = "none";
                this.render();
            } else{
                window.location.reload(true)
            }
        })

        this.render();
    }

    async getDeck() {
        const result = await fetch("https://deckofcardsapi.com/api/deck/new/")
        const data = await result.json()
        this.deck = data.deck_id
    }

    addPlayer(index: number) {
        this.players.push(new Player(`Gracz ${index}`, false))
        this.render();
    }
    delPlayer(){
        console.log("del")
        this.players.pop();
        this.render();
    }
    startGame() {
        if(this.players.length===1){
            this.players.push(new Player("Komputer", true))
        }
        this.nextPlayer()
        this.render();
    }
    async drawCard() {
        const player = this.players[this.active-1]
            const draw = new Draw(this.deck)
            draw.drawCard().then(_=>{
                if (player.getPointsValue() <22){
                const card: Card = draw.getCard();
                player.addCard(card)
                const card_img = document.createElement("img");
                card_img.src = card.image;
                this.cards_div[this.active-1].appendChild(card_img);
                player.addPoints(draw.cardValue())
                const canPlay = player.checkCanPlay()
                if (!canPlay.canPlay) {
                    this.playerEndRound({player, win: canPlay.win, lose:canPlay.lose})
                }else{
                this.render()
                }}
            })
    }

    pass(player:Player){
        this.playerEndRound({player, win: false, lose:false});
    }

    nextPlayer(){
        this.active +=1;
        this.drawCard();
        this.drawCard();
    }
    AITurn() {
        if (this.players[this.active-1].getPointsValue() < this.winner[0].getPointsValue()){
            this.drawCard();
        }else{
            this.pass(this.players[this.active-1])
        }

    }
    playerEndRound(result:{player:Player, win:boolean, lose:boolean}) {
        let message = ""
        if (result.win){
            message = `${result.player.name} wygrał uzyskując "PERSKIE OCZKO"`
            this.active = 10;
        }else if (!result.lose) {
            if (!this.winner[0] || result.player.getPointsValue() > this.winner[0].getPointsValue()){
                this.winner = [result.player]
            } else if (result.player.getPointsValue() === this.winner[0].getPointsValue()){
                this.winner.push(result.player)
            }
            message = "następny gracz"
        } else if (result.lose && !this.winner.length && this.active+1 === this.players.length){
            message = `${this.players[this.active].name} wygrał, inni uzyskali więcej niż 21 punktów`
            this.active = 10;
        } else if (result.lose){
            message = "Przegrywasz, następny gracz"
        }

        if (this.active+1 > this.players.length) {
            message = `Koniec gry, wygrywa: ${this.winner.map(player => `${player.name} - ${player.getPointsValue()}`).join(", ")}`
            this.active = 10;
        }

        this.render(message)
    }

    render(message:string="") {
        if (message) {
            this.message_box.style.display = "flex";
            this.message_div.textContent = message;
        }
        this.player_boards.forEach((board, index)=>{
            if (this.players[index]){
                board.style.display = "flex";
                this.player_name_div[index].textContent = this.players[index].name
                if (this.active){
                    this.result_spans[index].textContent = this.players[index].getPointsValue().toString();
                } else{
                    this.result_spans[index].textContent =""
                }
            }
            else{
                board.style.display = "none";
            }
            board.style.borderColor = index+1 === this.active ? "red" : "gray"  
        })
        if (this.players.length < 4 && !this.active){
            this.add_player_board.style.display = "flex";
        }else{
            this.add_player_board.style.display = "none";
        }
        this.del_player_buttons.forEach((button,index)=>{
            if(index === this.players.length-1 && !this.active){
                button.style.display = "inline";
            } else {
                button.style.display = "none";
            }
        })
        if (this.active){
            this.start_button.style.display = "none";
            if(this.players[this.active-1].ai){
                this.AITurn_button.style.display = "inline";
                this.draw_button.style.display = "none";
                this.pass_button.style.display = "none";
            } else {
                this.draw_button.style.display = "inline";
                this.pass_button.style.display = "inline";
                this.AITurn_button.style.display = "none";
            }
        } else {
            this.start_button.style.display = "inline";
            this.draw_button.style.display = "none";
            this.pass_button.style.display = "none";
        }
    }
}

const game = new Game()
game.getDeck()