class MemoryGame {
    constructor(cards) {
        this.cards = cards;
        this.pickedCards = [];
        this.pairsCardsGuessed = [];
        this.pairsClicked = 0;
        this.pairsGuessed = 0;
    }
    shuffleCards() {
        // let RandomPos = Math.floor(Math.random() * this.cards.length) + 1;
        // this.cards.sort(() => {
        //     return RandomPos / 2 - RandomPos;
        // });
        //Shuffle Cards (Or Any Elements) With the Fisher-Yates Shuffle Algorithm
        let i = 0,
            j = 0,
            temp = null;

        for (i = this.cards.length - 1; i > 0; i -= 1) {
            j = Math.floor(Math.random() * (i + 1));
            temp = this.cards[i];
            this.cards[i] = this.cards[j];
            this.cards[j] = temp;
        }
    }
    checkIfPair(card1, card2) {
        this.pairsClicked += 1;
        if (card1 == card2) {
            this.pairsGuessed += 1;
            return true;
        } else {
            return false;
        }
    }

    IsGuessed(card) {
        let result = this.pairsCardsGuessed.filter(
            cardGuessed => cardGuessed == card
        );
        return result.length == 1;
    }

    isSelected(card) {
        return card.children[0].classlist == "front";
    }

    isFinished() {
        if (this.pairsGuessed == this.cards.length / 2) {
            return true;
        } else {
            return false;
        }
    }
}