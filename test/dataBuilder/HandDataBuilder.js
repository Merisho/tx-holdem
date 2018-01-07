const Hand = require('../../hand');
const Card = require('../../card');

class HandDataBuilder {
    constructor() {
        this.hand = new Hand();
    }

    withCardsOfClubs(...args) {
        args = args.slice(0, 5);
        args.forEach(cardValueName => {
            cardValueName = cardValueName.toUpperCase();
            this.hand.addCard(new Card(Card.CLUBS, Card[cardValueName]));
        });

        return this;
    }

    withCardsOfSpades(...args) {
        args = args.slice(0, 5);
        args.forEach(cardValueName => {
            cardValueName = cardValueName.toUpperCase();
            this.hand.addCard(new Card(Card.SPADES, Card[cardValueName]));
        });

        return this;
    }

    withStraightFrom(start) {      
        start = Card[start.toUpperCase()];

        if(start > Card.TEN && start !== Card.ACE) {
            start = Card.TEN;
        }

        for(let i = start; i < start + 5; i++) {
            const suit = i % (Card.SUIT_MAX + 1);
            const value = i % (Card.VALUE_MAX + 1);

            this.hand.addCard(new Card(suit, value));
        }

        return this;
    }

    build() {
        const hand = this.hand;
        this.hand = new Hand();

        this.hand.addCards(hand.cards);

        return hand;
    }
}

module.exports = HandDataBuilder;