'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Combination = require('./combination');
var DrawCombination = require('./draw-combination');
var Card = require('./card');

/**
 * @class Hand
*/

var Hand = function () {
    /**
     * Creates hand
     * @param {Array} cards Array or enumeration of @see Card instances
     */
    function Hand() {
        for (var _len = arguments.length, cards = Array(_len), _key = 0; _key < _len; _key++) {
            cards[_key] = arguments[_key];
        }

        _classCallCheck(this, Hand);

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


    _createClass(Hand, [{
        key: 'addCards',


        /**
         * Add given cards to hand
         * @param {Array} cards Array or enumeration of cards
         * @returns {Boolean} True if all cards was added, false otherwise
         */
        value: function addCards(cards /*card1, card2...card5*/) {
            var _this = this;

            cards = cards instanceof Array ? cards : arguments;

            var isSuccess = true;
            Array.prototype.forEach.call(cards, function (c) {
                return isSuccess &= _this.addCard(c);
            });

            return !!isSuccess;
        }

        /**
         * Add single card to hand
         * @param {Card} card
         * @returns {Boolean} True is card was added, false otherwise
         */

    }, {
        key: 'addCard',
        value: function addCard(card) {
            if (this.isFull() || this.has(card)) {
                return false;
            }

            this.cards.push(card);
            this.sort();

            return true;
        }
    }, {
        key: 'isFull',


        /**
         * Return true if hand has reached maximum capacity
         * @returns {Boolean}
        */
        value: function isFull() {
            return this.size === this.MAX_HAND_SIZE;
        }

        /**
         * Checks whether card exists in current hand
         * @param {Card} card
         * @returns {Boolean}
         */ /**
            * Checks whether card exists in current hand
            * @param {Number} suit
            * @param {Number} rank
            * @returns {Boolean}
            */

    }, {
        key: 'has',
        value: function has(card /*suit, rank*/) {
            var s = void 0,
                v = void 0;
            if (card && (typeof card === 'undefined' ? 'undefined' : _typeof(card)) === 'object') {
                s = card.suit;
                v = card.rank;
            } else if (typeof arguments[0] !== 'undefined' && typeof arguments[1] !== 'undefined') {
                s = arguments[0];
                v = arguments[1];
            }

            return this.cards.some(function (c) {
                return c.suit === s && c.rank === v;
            });
        }

        /**
         * Compares combinations of current hand with given
         * @param {Hand} hand
         * @returns {Number}
         */

    }, {
        key: 'compare',
        value: function compare(hand) {
            return this.combination.compare(hand.combination);
        }

        /**
         * Returns true if hand has nothing but kicker card
         * @returns {Boolean}
        */

    }, {
        key: 'isKicker',
        value: function isKicker() {
            return this.combination.isKicker();
        }

        /**
         * Returns true if hand has pair
         * @returns {Boolean}
         */

    }, {
        key: 'isPair',
        value: function isPair() {
            return this.combination.isPair();
        }

        /**
         * Returns true if hand has two pairs
         * @returns {Boolean}
         */

    }, {
        key: 'isTwoPairs',
        value: function isTwoPairs() {
            return this.combination.isTwoPairs();
        }

        /**
         * Returns true if hand has three of a kind
         * @returns {Boolean}
         */

    }, {
        key: 'isThreeOfKind',
        value: function isThreeOfKind() {
            return this.combination.isThreeOfKind();
        }

        /**
         * Returns true if hand has straight
         * @returns {Boolean}
         */

    }, {
        key: 'isStraight',
        value: function isStraight() {
            return this.combination.isStraight();
        }

        /**
         * Returns true if hand has flush
         * @returns {Boolean}
         */

    }, {
        key: 'isFlush',
        value: function isFlush() {
            return this.combination.isFlush();
        }

        /**
         * Returns true if hand has full house
         * @returns {Boolean}
         */

    }, {
        key: 'isFullHouse',
        value: function isFullHouse() {
            return this.combination.isFullHouse();
        }

        /**
         * Returns true if hand has four of a kind
         * @returns {Boolean}
         */

    }, {
        key: 'isFourOfKind',
        value: function isFourOfKind() {
            return this.combination.isFourOfKind();
        }

        /**
         * Returns true if hand has royal flush
         * @returns {Boolean}
         */

    }, {
        key: 'isRoyalFlush',
        value: function isRoyalFlush() {
            return this.combination.isRoyalFlush();
        }

        /**
         * Returns true if hand has straight flush
         * @returns {Boolean}
         */

    }, {
        key: 'isStraightFlush',
        value: function isStraightFlush() {
            return this.combination.isStraightFlush();
        }

        /**
         * Apply reduce aggregator to underlying cards array
         * @param {Function} aggregate 
         * @param {*} start 
         */

    }, {
        key: 'reduce',
        value: function reduce(aggregate, start) {
            var _cards;

            var args = [aggregate];
            typeof start !== 'undefined' && args.push(start);
            return (_cards = this.cards).reduce.apply(_cards, args);
        }

        /**
         * Sort cards in hand
         * @param {String} order ASC or DESC
         */

    }, {
        key: 'sort',
        value: function sort() {
            var order = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'asc';

            order = order.toLowerCase();
            this.cards.sort(function (l, r) {
                return order === 'asc' ? l.compare(r) : r.compare(l);
            });
        }

        /**
         * Apply every matcher to underlying cards array
         * @param {Function} predicate 
         */

    }, {
        key: 'every',
        value: function every(predicate) {
            return this.cards.every(predicate);
        }

        /**
         * Apply aggregator to each card in underlying cards array
         * @param {Function} aggregate 
         */

    }, {
        key: 'forEach',
        value: function forEach(aggregate) {
            this.cards.forEach(aggregate);
        }
    }, {
        key: 'combination',
        get: function get() {
            if (!this._combination) {
                this._combination = new Combination(this);
            }

            return this._combination;
        }

        /**
         * Returns DrawCombination instance for this hand
         * @readonly
         * @returns {DrawCombination}
         */

    }, {
        key: 'drawCombination',
        get: function get() {
            if (!this._drawCombination) {
                this._drawCombination = new DrawCombination(this);
            }

            return this._drawCombination;
        }
    }, {
        key: 'size',
        get: function get() {
            return this.cards.length;
        }
    }], [{
        key: 'MAX_HAND_SIZE',
        get: function get() {
            return 5;
        }
    }]);

    return Hand;
}();

module.exports = Hand;