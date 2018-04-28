"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Utils = function () {
    function Utils() {
        _classCallCheck(this, Utils);
    }

    _createClass(Utils, null, [{
        key: "combinationCardsByRank",
        value: function combinationCardsByRank(hand) {
            var cardsByRank = Utils.groupByRank(hand.cards);

            var combinationCards = [];

            for (var val in cardsByRank) {
                var similarRanksCount = cardsByRank[val].length;
                if (similarRanksCount > 1) {
                    combinationCards = combinationCards.concat(cardsByRank[val]);
                }
            }

            return combinationCards;
        }
    }, {
        key: "groupByRank",
        value: function groupByRank() {
            var cards = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            var cardsByRank = {};

            cards.forEach(function (c) {
                if (!cardsByRank[c.rank]) {
                    cardsByRank[c.rank] = [];
                }

                cardsByRank[c.rank].push(c);
            });

            return cardsByRank;
        }
    }, {
        key: "getMostValuableFullHouseCardRank",
        value: function getMostValuableFullHouseCardRank(cards) {
            var ranksCount = Utils.countSameRanks(cards);
            var ranks = Object.keys(ranksCount);

            return ranksCount[ranks[0]] === 3 ? ranks[0] : ranks[1];
        }
    }, {
        key: "countSameRanksToArray",
        value: function countSameRanksToArray() {
            var cards = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            return Object.values(Utils.countSameRanks(cards));
        }
    }, {
        key: "countSameRanks",
        value: function countSameRanks() {
            var cards = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            var rankCountMap = {};

            cards.forEach(function (c) {
                if (rankCountMap[c.rank]) {
                    rankCountMap[c.rank]++;
                } else {
                    rankCountMap[c.rank] = 1;
                }
            });

            return rankCountMap;
        }
    }]);

    return Utils;
}();

module.exports = Utils;