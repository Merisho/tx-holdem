const Combination = require('./combination');
const DrawCombination = require('./draw-combination');
const Card = require('./card');

class Hand {
    constructor(...cards) {
        cards = cards[0] && cards[0] instanceof Array ? cards[0] : cards;

        this.cards = cards.splice(0, 5);
        this._combination = null;
        this._drawCombination = null;

        this.sort();
    }

    get combination() {
        if(!this._combination) {
            this._combination = new Combination(this);
        }

        return this._combination;
    }

    get drawCombination() {
        if(!this._drawCombination) {
            this._drawCombination = new DrawCombination(this);
        }

        return this._drawCombination;
    }

    /**
     * Add given cards to hand
     * @param {Array} cards Array or enumeration of cards
     * @returns {Boolean} True if all cards was added, false otherwise
     */
    addCards(cards/*card1, card2...card5*/) {
        cards = cards instanceof Array ? cards : arguments;

        let isSuccess = true;
        Array.prototype.forEach.call(cards, c => isSuccess &= this.addCard(c));

        return !!isSuccess;
    }

    /**
     * Add single card to hand
     * @param {Card} card
     * @returns {Boolean} True is card was added, false otherwise
     */
    addCard(card) {
        if(this.isFull() || this.has(card)) {
            return false;
        }

        this.cards.push(card);
        this.sort();

        return true;
    }

    get size() {
        return this.cards.length;
    }

    get lastCard() {
        return this.cards[this.size - 1];
    }

    get firstCard() {
        return this.cards[0];
    }

    isFull() {
        return this.size === this.MAX_HAND_SIZE;
    }

    /**
     * Checks whether card exists in current Pack
     * @param {Card} card
     * @returns {Boolean}
     */
    /**
     * Checks whether card exists in current Pack
     * @param {Number} suit
     * @param {Number} value
     * @returns {Boolean}
     */
    has(card/*suit, value*/) {
		let s, v;
		if(card && typeof card === 'object') {
			s = card.suit;
			v = card.value;
		} else if(typeof arguments[0] !== 'undefined' && typeof arguments[1] !== 'undefined') {
			s = arguments[0];
			v = arguments[1];
		}
		
		return this.cards.some(c => c.suit === s && c.value === v);
    }

    /**
     * Compares combinations of current hand with given
     * @param {Hand} hand
     * @returns {Number}
     */
    compare(hand) {
        return this.combination.compare(hand.combination);
    }

    isKicker() {
        return this.combination == Combination.KICKER;
    }

    isPair() {
        return this.combination == Combination.PAIR;
    }

    isTwoPairs() {
        return this.combination == Combination.TWO_PAIR;
    }

    isThreeOfKind() {
        return this.combination == Combination.THREE_OF_A_KIND;
    }

    isStraight() {
        return this.combination == Combination.STRAIGHT;
    }

    isFlush() {
        return this.combination == Combination.FLUSH;
    }

    isFullHouse() {
        return this.combination == Combination.FULL_HOUSE;
    }

    isFourOfKind() {
        return this.combination == Combination.FOUR_OF_A_KIND;
    }

    isRoyalFlush() {
        return this.isStraightFlush() && this.combination.highestCard == Card.ACE;
    }

    isStraightFlush() {
        return this.combination == Combination.STRAIGHT_FLUSH;
    }

    reduce(aggregate, start) {
        const args = [aggregate];
        typeof start !== 'undefined' && args.push(start);
        return this.cards.reduce(...args);
    }

    sort(order = 'asc') {
        order = order.toLowerCase();
        this.cards.sort((l, r) => order === 'asc' ? l.compare(r) : r.compare(l));
    }

    every(predicate) {
        return this.cards.every(predicate);
    }

    forEach(aggregate) {
        this.cards.forEach(aggregate);
    }

    static get MAX_HAND_SIZE() { return 5; }
}

module.exports = Hand;