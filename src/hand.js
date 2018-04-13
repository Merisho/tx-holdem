const Combination = require('./combination');
const DrawCombination = require('./draw-combination');
const Card = require('./card');

/**
 * @class Hand
*/
class Hand {
    /**
     * Creates hand
     * @param {Array} cards Array or enumeration of @see Card instances
     */
    constructor(...cards) {
        cards = cards[0] && cards[0] instanceof Array ? cards[0] : cards;

        this.cards = cards.slice(0, 5);
        this._combination = null;
        this._drawCombination = null;

        this.sort();
    }

    /**
     * Returns Combination instance for this hand
     * @readonly
     * @returns {Combination}
     */
    get combination() {
        if(!this._combination) {
            this._combination = new Combination(this);
        }

        return this._combination;
    }

    /**
     * Returns DrawCombination instance for this hand
     * @readonly
     * @returns {DrawCombination}
     */
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

    /**
     * Return true if hand has reached maximum capacity
     * @returns {Boolean}
    */
    isFull() {
        return this.size === this.MAX_HAND_SIZE;
    }

    /**
     * Checks whether card exists in current hand
     * @param {Card} card
     * @returns {Boolean}
     *//**
     * Checks whether card exists in current hand
     * @param {Number} suit
     * @param {Number} rank
     * @returns {Boolean}
     */
    has(card/*suit, rank*/) {
		let s, v;
		if(card && typeof card === 'object') {
			s = card.suit;
			v = card.rank;
		} else if(typeof arguments[0] !== 'undefined' && typeof arguments[1] !== 'undefined') {
			s = arguments[0];
			v = arguments[1];
		}
		
		return this.cards.some(c => c.suit === s && c.rank === v);
    }

    /**
     * Compares combinations of current hand with given
     * @param {Hand} hand
     * @returns {Number}
     */
    compare(hand) {
        return this.combination.compare(hand.combination);
    }

    /**
     * Returns true if hand has nothing but kicker card
     * @returns {Boolean}
    */
    isKicker() {
        return this.combination.isKicker();
    }

    /**
     * Returns true if hand has pair
     * @returns {Boolean}
     */
    isPair() {
        return this.combination.isPair();
    }

    /**
     * Returns true if hand has two pairs
     * @returns {Boolean}
     */
    isTwoPairs() {
        return this.combination.isTwoPairs();
    }

    /**
     * Returns true if hand has three of a kind
     * @returns {Boolean}
     */
    isThreeOfKind() {
        return this.combination.isThreeOfKind();
    }

    /**
     * Returns true if hand has straight
     * @returns {Boolean}
     */
    isStraight() {
        return this.combination.isStraight();
    }

    /**
     * Returns true if hand has flush
     * @returns {Boolean}
     */
    isFlush() {
        return this.combination.isFlush();
    }

    /**
     * Returns true if hand has full house
     * @returns {Boolean}
     */
    isFullHouse() {
        return this.combination.isFullHouse();
    }

    /**
     * Returns true if hand has four of a kind
     * @returns {Boolean}
     */
    isFourOfKind() {
        return this.combination.isFourOfKind();
    }

    /**
     * Returns true if hand has royal flush
     * @returns {Boolean}
     */
    isRoyalFlush() {
        return this.combination.isRoyalFlush();
    }

    /**
     * Returns true if hand has straight flush
     * @returns {Boolean}
     */
    isStraightFlush() {
        return this.combination.isStraightFlush();
    }

    /**
     * Apply reduce aggregator to underlying cards array
     * @param {Function} aggregate 
     * @param {*} start 
     */
    reduce(aggregate, start) {
        const args = [aggregate];
        typeof start !== 'undefined' && args.push(start);
        return this.cards.reduce(...args);
    }

    /**
     * Sort cards in hand
     * @param {String} order ASC or DESC
     */
    sort(order = 'asc') {
        order = order.toLowerCase();
        this.cards.sort((l, r) => order === 'asc' ? l.compare(r) : r.compare(l));
    }

    /**
     * Apply every matcher to underlying cards array
     * @param {Function} predicate 
     */
    every(predicate) {
        return this.cards.every(predicate);
    }

    /**
     * Apply aggregator to each card in underlying cards array
     * @param {Function} aggregate 
     */
    forEach(aggregate) {
        this.cards.forEach(aggregate);
    }

    static get MAX_HAND_SIZE() { return 5; }
}

module.exports = Hand;