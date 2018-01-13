const Hand = require('../../hand');
const Card = require('../../card');

class HandDataBuilder {
    constructor() {
        this.hand = new Hand();
    }

    withDifferentSuits(...values) {
        values.forEach((val, index) => {
            this.withCardsOf(index, val);
        });

        return this;
    }

    withCardsOfClubs(...values) {
        return this.withCardsOf(Card.CLUBS, ...values);
    }

    withCardsOfSpades(...values) {
        return this.withCardsOf(Card.SPADES, ...values);
    }

    withCardsOf(suit, ...values) {
        suit %= Card.SUIT_MAX + 1;
        values = values.slice(0, 5);
        values.forEach(cardValueName => {
            cardValueName = cardValueName.toUpperCase();
            this.hand.addCard(new Card(suit, Card[cardValueName]));
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