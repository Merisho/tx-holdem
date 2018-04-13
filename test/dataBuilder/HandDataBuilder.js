const Hand = require('../../src/hand');
const Card = require('../../src/card');

class HandDataBuilder {
    constructor() {
        this.hand = new Hand();
    }

    withDifferentSuits(...ranks) {
        ranks.forEach((val, index) => {
            this.withCardsOf(index, val);
        });

        return this;
    }

    withCardsOfClubs(...ranks) {
        return this.withCardsOf(Card.CLUBS, ...ranks);
    }

    withCardsOfSpades(...ranks) {
        return this.withCardsOf(Card.SPADES, ...ranks);
    }

    withCardsOf(suit, ...ranks) {
        suit %= Card.SUIT_MAX + 1;
        ranks = ranks.slice(0, 5);
        ranks.forEach(rankName => {
            const rank = getCardRankByName(rankName);
            this.hand.addCard(new Card(suit, rank));
        });

        return this;
    }

    withStraightFrom(start) {      
        start = getCardRankByName(start);

        if(start > Card.TEN && start !== Card.ACE) {
            start = Card.TEN;
        }

        for(let i = start; i < start + 5; i++) {
            const suit = i % (Card.SUIT_MAX + 1);
            const rank = i % (Card.RANK_MAX + 1);

            this.hand.addCard(new Card(suit, rank));
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

const rankNameToCardRank = {
    2: Card.TWO,
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
function getCardRankByName(name) {
    name = name && name.toString().toLowerCase();
    return rankNameToCardRank[name];
} 

module.exports = HandDataBuilder;