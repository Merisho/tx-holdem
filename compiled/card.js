'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Card = function () {
    _createClass(Card, null, [{
        key: 'create',
        value: function create(suit, rank) {
            if (typeof suit !== 'number' || typeof rank !== 'number') {
                return null;
            }

            return new this(suit, rank);
        }

        /**
         * @constructor
         * @param {Number} suit
         * @param {Number} rank
         */

    }]);

    function Card(suit, rank) {
        _classCallCheck(this, Card);

        this.suit = +suit;
        this.rank = +rank;
    }

    _createClass(Card, [{
        key: 'toString',
        value: function toString() {
            return this.suit + ' ' + this.rank;
        }
    }, {
        key: 'toJSON',
        value: function toJSON() {
            return {
                suit: Card.RANK_TO_ALIAS[this.suit],
                rank: Card.RANK_TO_ALIAS[this.rank]
            };
        }
    }, {
        key: 'valueOf',
        value: function valueOf() {
            return this.rank;
        }

        /**
         * Compare card to given and return either -1 or 0 or 1
         * @param {Card} card
         * @returns {Number}
         */

    }, {
        key: 'compare',
        value: function compare(card) {
            if (this > card) {
                return 1;
            } else if (this < card) {
                return -1;
            }

            return 0;
        }

        /**
         * Returns true if cards have equal suit
         * @param {Card} card
         * @returns {Boolean}
         */

    }, {
        key: 'equalBySuit',
        value: function equalBySuit(card) {
            return this.suit === card.suit;
        }

        /**
         * Returns true if cards have equal rank
         * @param {Card} card
         * @returns {Boolean}
         */

    }, {
        key: 'equalByRank',
        value: function equalByRank(card) {
            return this.rank == card.rank;
        }
    }], [{
        key: 'CLUBS',
        get: function get() {
            return 20;
        }
    }, {
        key: 'DIAMONDS',
        get: function get() {
            return 21;
        }
    }, {
        key: 'HEARTS',
        get: function get() {
            return 22;
        }
    }, {
        key: 'SPADES',
        get: function get() {
            return 23;
        }
    }, {
        key: 'SUIT_MIN',
        get: function get() {
            return this.CLUBS;
        }
    }, {
        key: 'SUIT_MAX',
        get: function get() {
            return this.SPADES;
        }
    }, {
        key: 'TWO',
        get: function get() {
            return 0;
        }
    }, {
        key: 'THREE',
        get: function get() {
            return 1;
        }
    }, {
        key: 'FOUR',
        get: function get() {
            return 2;
        }
    }, {
        key: 'FIVE',
        get: function get() {
            return 3;
        }
    }, {
        key: 'SIX',
        get: function get() {
            return 4;
        }
    }, {
        key: 'SEVEN',
        get: function get() {
            return 5;
        }
    }, {
        key: 'EIGHT',
        get: function get() {
            return 6;
        }
    }, {
        key: 'NINE',
        get: function get() {
            return 7;
        }
    }, {
        key: 'TEN',
        get: function get() {
            return 8;
        }
    }, {
        key: 'JACK',
        get: function get() {
            return 9;
        }
    }, {
        key: 'QUEEN',
        get: function get() {
            return 10;
        }
    }, {
        key: 'KING',
        get: function get() {
            return 11;
        }
    }, {
        key: 'ACE',
        get: function get() {
            return 12;
        }
    }, {
        key: 'RANK_MIN',
        get: function get() {
            return this.TWO;
        }
    }, {
        key: 'RANK_MAX',
        get: function get() {
            return this.ACE;
        }
    }, {
        key: 'ALIAS_TO_RANK',
        get: function get() {
            return {
                clubs: Card.CLUBS,
                diamonds: Card.DIAMONDS,
                hearts: Card.HEARTS,
                spades: Card.SPADES,

                2: Card.TWO,
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
    }, {
        key: 'RANK_TO_ALIAS',
        get: function get() {
            var _ref;

            return _ref = {}, _defineProperty(_ref, Card.CLUBS, 'clubs'), _defineProperty(_ref, Card.DIAMONDS, 'diamonds'), _defineProperty(_ref, Card.HEARTS, 'hearts'), _defineProperty(_ref, Card.SPADES, 'spades'), _defineProperty(_ref, Card.TWO, 2), _defineProperty(_ref, Card.THREE, 3), _defineProperty(_ref, Card.FOUR, 4), _defineProperty(_ref, Card.FIVE, 5), _defineProperty(_ref, Card.SIX, 6), _defineProperty(_ref, Card.SEVEN, 7), _defineProperty(_ref, Card.EIGHT, 8), _defineProperty(_ref, Card.NINE, 9), _defineProperty(_ref, Card.TEN, 10), _defineProperty(_ref, Card.JACK, 'jack'), _defineProperty(_ref, Card.QUEEN, 'queen'), _defineProperty(_ref, Card.KING, 'king'), _defineProperty(_ref, Card.ACE, 'ace'), _ref;
        }
    }]);

    return Card;
}();

module.exports = Card;