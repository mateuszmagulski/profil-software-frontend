class Player {
    constructor(name){
        this.name = name;
        this.points = 0;
        this.cards = [];
        this.active = false;
    }
    addCard() {
        console.log("add card")
    }
    getPointsValue() {
        console.log("get points value")
    }
    checkCanPlay() {
        console.log("check can play")
    }

}