const Hand = require('../../src/hand');
const Card = require('../../src/card');

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
            const value = getCardValueByName(cardValueName);
            this.hand.addCard(new Card(suit, value));
        });

        return this;
    }

    withStraightFrom(start) {      
        start = getCardValueByName(start);

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

const cardValueNameToCardValue = {
    2: Card.DEUCE,
    3: Card.THREE,
    4: Card.FOUR,
    5: Card.FIVE,
    6: Card.SIX,
    7: Card.SEVEN,
    8: Card.EIGHT,
    9: Card.NINE,
    10: Card.TEN,
    j: Card.JACK,
    q: Card.QUEEN,
    k: Card.KING,
    a: Card.ACE
};
function getCardValueByName(name) {
    name = name && name.toString().toLowerCase();
    return cardValueNameToCardValue[name];
} 

module.exports = HandDataBuilder;