"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Draw {
    constructor() {
        this.card = null;
    }
    drawCard() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield fetch("https://deckofcardsapi.com/api/deck/32e6otun2ecb/draw/?count=1");
            const data = yield result.json();
            this.card = data.cards[0];
        });
    }
    getCard() {
        return this.card;
    }
}
const draw = new Draw();
draw.drawCard().then(res => {
    console.log(draw.getCard());
});
