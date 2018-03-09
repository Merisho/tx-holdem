class Card {
    static create(suit, value) {
        if(typeof suit !== 'number' || typeof value !== 'number') {
            return null;
        }
    
        return new this(suit, value);
    }

    /**
     * @constructor
     * @param {Number} suit
     * @param {Number} value
     */
    constructor(suit, value) {
        this.suit = +suit;
        this.value = +value;
    }

    toString() {
        return this.suit + ' ' + this.value;
    }

    toJSON() {
        return {
            suit: Card.VALUE_TO_ALIAS[this.suit],
            value: Card.VALUE_TO_ALIAS[this.value]
        };
    }

    valueOf() {
        return this.value;
    }

    /**
     * Compare card to given and return either -1 or 0 or 1
     * @param {Card} card
     * @returns {Boolean}
     */
    compare(card) {
        const diff = this - card;
        return diff ? diff / Math.abs(diff) : 0;
    }

    /**
     * Returns true if cards have equal suit
     * @param {Card} card
     */
    equalBySuit(card) {
        return this.suit === card.suit;
    }

    /**
     * Returns true if cards have equal value
     * @param {Card} card
     */
    equalByValue(card) {
        return this.value == card.value;
    }

    isAce() {
        return this.value === this.constructor.ACE;
    }

    static get CLUBS() { return 20; }
    static get DIAMONDS() { return 21; }
    static get HEARTS() { return 22; }
    static get SPADES() { return 23; }
    static get SUIT_MAX() { return this.SPADES; }

    static get DEUCE() { return 0; }
    static get THREE() { return 1; }
    static get FOUR() { return 2; }
    static get FIVE() { return 3; }
    static get SIX() { return 4; }
    static get SEVEN() { return 5; }
    static get EIGHT() { return 6; }
    static get NINE() { return 7; }
    static get TEN() { return 8; }
    static get JACK() { return 9; }
    static get QUEEN() { return 10; }
    static get KING() { return 11; }
    static get ACE() { return 12; }
    static get VALUE_MAX() { return this.ACE; }

    static get ALIAS_TO_VALUE() {
        return {
            clubs: Card.CLUBS,
            diamonds: Card.DIAMONDS,
            hearts: Card.HEARTS,
            spades: Card.SPADES,
        
            2: Card.DEUCE,
            3: Card.THREE,
            4: Card.FOUR,
            5: Card.FIVE,
            6: Card.SIX,
            7: Card.SEVEN,
            8: Card.EIGHT,
            9: Card.NINE,
            10: Card.TEN,
            jack: Card.JACK,
            j: Card.JACK,
            queen: Card.QUEEN,
            q: Card.QUEEN,
            king: Card.KING,
            k: Card.KING,
            ace: Card.ACE,
            a: Card.ACE
        };
    }

    static get VALUE_TO_ALIAS() {
        return {
            [Card.CLUBS]: 'clubs',
            [Card.DIAMONDS]: 'diamonds',
            [Card.HEARTS]: 'hearts',
            [Card.SPADES]: 'spades',
        
            [Card.DEUCE]: 2,
            [Card.THREE]: 3,
            [Card.FOUR]: 4,
            [Card.FIVE]: 5,
            [Card.SIX]: 6,
            [Card.SEVEN]: 7,
            [Card.EIGHT]: 8,
            [Card.NINE]: 9,
            [Card.TEN]: 10,
            [Card.JACK]: 'jack',
            [Card.QUEEN]: 'queen',
            [Card.KING]: 'king',
            [Card.ACE]: 'ace'
        };
    }
}

module.exports = Card;