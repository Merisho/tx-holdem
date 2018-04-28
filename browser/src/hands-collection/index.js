'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Hand = require('../hand');
var Utils = require('./utils');

var HAND_SIZE = Hand.MAX_HAND_SIZE;

var HandsCollection = function () {
	function HandsCollection(hands) {
		_classCallCheck(this, HandsCollection);

		this.hands = hands.sort(function (h1, h2) {
			return h1.compare(h2);
		});
	}

	_createClass(HandsCollection, [{
		key: 'highestHand',
		get: function get() {
			return this.hands[this.hands.length - 1];
		}
	}, {
		key: 'highestCombination',
		get: function get() {
			return this.highestHand.combination;
		}
	}, {
		key: 'bestDraw',
		get: function get() {
			return this.hands.reduce(function (h1, h2) {
				return h1.drawCombination.outs > h2.drawCombination.outs ? h1 : h2;
			}).drawCombination;
		}
	}, {
		key: 'count',
		get: function get() {
			return this.hands.length;
		}

		/**
   * Returns all possible card combinations from given hands
   * @param {Hand} hand1 - First hand
   * @param {Hand} hand2 - Second hand
   * @returns {HandsCollection}
   */

	}], [{
		key: 'createCombinations',
		value: function createCombinations(hand1, hand2) {
			var allCards = hand1.cards.concat(hand2.cards);
			return new HandsCollection(Utils.getAllCombinationsOfHands(allCards));
		}
	}]);

	return HandsCollection;
}();

module.exports = HandsCollection;