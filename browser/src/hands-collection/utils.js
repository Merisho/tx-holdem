'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Hand = require('../hand');

var HAND_SIZE = Hand.MAX_HAND_SIZE;

var Utils = function () {
    function Utils() {
        _classCallCheck(this, Utils);
    }

    _createClass(Utils, null, [{
        key: 'getAllCombinationsOfHands',

        /**
        * Creates all possible hands for card combinations from given array of cards
        * 
        * @param {Array} cards - Array of cards
        * @returns {Array}
        */
        value: function getAllCombinationsOfHands(cards) {
            return Utils._combineCardsRecursively(cards);
        }
    }, {
        key: '_combineCardsRecursively',
        value: function _combineCardsRecursively(cards) {
            var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
            var handCards = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
            var combinations = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];

            if (handCards.length === HAND_SIZE || cards.length < HAND_SIZE && handCards.length === cards.length) {
                var h = new Hand();
                h.addCards(handCards);
                combinations.push(h);
                return;
            }

            for (var i = start; i < cards.length; i++) {
                handCards[index] = cards[i];
                Utils._combineCardsRecursively(cards, i + 1, index + 1, handCards.slice(0), combinations);
            }

            return combinations;
        }
    }]);

    return Utils;
}();

module.exports = Utils;