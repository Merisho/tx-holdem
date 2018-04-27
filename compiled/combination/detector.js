'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Card = require('../card');
var utils = require('./utils');

var Detector = function () {
    function Detector() {
        _classCallCheck(this, Detector);
    }

    _createClass(Detector, null, [{
        key: 'isFlush',
        value: function isFlush(cards) {
            if (!cards || cards.length !== 5) {
                return false;
            }

            var suit = cards[0].suit;
            return cards.every(function (card) {
                return card.suit === suit;
            });
        }
    }, {
        key: 'isStraight',
        value: function isStraight(cards) {
            if (!cards || cards.length !== 5) {
                return false;
            }

            var maxIndex = cards.length - 1;
            var isStraight = true;
            for (var i = 0; i < maxIndex - 1; i++) {
                if (cards[i + 1] - cards[i] !== 1) {
                    isStraight = false;
                    break;
                }
            }
            if (isStraight) {
                var last = cards[maxIndex];
                var penult = cards[maxIndex - 1];
                isStraight = last.rank === Card.ACE && penult.rank === Card.FIVE || last - penult === 1;
            }

            return isStraight;
        }
    }, {
        key: 'isFourOfAKind',
        value: function isFourOfAKind(cards) {
            return utils.countSameRanksToArray(cards).includes(4);
        }
    }, {
        key: 'isFullHouse',
        value: function isFullHouse(cards) {
            var similarCount = utils.countSameRanksToArray(cards);
            return similarCount.includes(2) && similarCount.includes(3);
        }
    }, {
        key: 'isThreeOfAKind',
        value: function isThreeOfAKind(cards) {
            return utils.countSameRanksToArray(cards).includes(3) && !Detector.isPair(cards) && !Detector.isFullHouse(cards);
        }
    }, {
        key: 'isTwoPairs',
        value: function isTwoPairs(cards) {
            var similarCount = utils.countSameRanksToArray(cards);
            var firstIndex = similarCount.indexOf(2);

            return firstIndex !== similarCount.lastIndexOf(2) && firstIndex !== -1;
        }
    }, {
        key: 'isPair',
        value: function isPair(cards) {
            var sameRanks = utils.countSameRanksToArray(cards);
            return sameRanks.includes(2) && !sameRanks.includes(3) && !Detector.isTwoPairs(cards);
        }
    }]);

    return Detector;
}();

module.exports = Detector;