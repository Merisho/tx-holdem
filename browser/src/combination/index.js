'use strict';

var _combinationNames;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Card = require('../card');
var utils = require('./utils');
var detector = require('./detector');

var Combination = function () {
	function Combination(hand) {
		_classCallCheck(this, Combination);

		this._hand = hand;
		this._rank = null;
		this._cards = null;
		this._highestCard = null;
		this._name = '';
	}

	_createClass(Combination, [{
		key: 'valueOf',
		value: function valueOf() {
			return this.rank;
		}

		/**
   * Compares two combinations
   * @param {Combination} combination
   * @returns {Number}
   */

	}, {
		key: 'compare',
		value: function compare(combination) {
			if (this.rank > combination.rank) {
				return 1;
			} else if (this.rank < combination.rank) {
				return -1;
			}

			if (this.rank === Combination.FULL_HOUSE) {
				return this._fullHouseComparison(combination);
			}

			var highestCardComparison = this.highestCard.compare(combination.highestCard);
			if (highestCardComparison !== 0) {
				return highestCardComparison;
			}
			var thisCards = this.cards;
			var combCards = combination.cards;
			for (var i = thisCards.length - 1; i >= 0; i--) {
				var cardComparison = thisCards[i].compare(combCards[i]);
				if (cardComparison !== 0) {
					return cardComparison;
				}
			}

			return 0;
		}

		/**
      * Returns true if combination is kicker only
      * @returns {Boolean}
     */

	}, {
		key: 'isKicker',
		value: function isKicker() {
			return this == Combination.KICKER;
		}

		/**
   * Returns true if combination is pair
   * @returns {Boolean}
   */

	}, {
		key: 'isPair',
		value: function isPair() {
			return this == Combination.PAIR;
		}

		/**
   * Returns true if combination has two pairs
   * @returns {Boolean}
   */

	}, {
		key: 'isTwoPairs',
		value: function isTwoPairs() {
			return this == Combination.TWO_PAIR;
		}

		/**
   * Returns true if combination is three of a kind
   * @returns {Boolean}
   */

	}, {
		key: 'isThreeOfKind',
		value: function isThreeOfKind() {
			return this == Combination.THREE_OF_A_KIND;
		}

		/**
   * Returns true if combination is straight
   * @returns {Boolean}
   */

	}, {
		key: 'isStraight',
		value: function isStraight() {
			return this == Combination.STRAIGHT;
		}

		/**
   * Returns true if combination is flush
   * @returns {Boolean}
   */

	}, {
		key: 'isFlush',
		value: function isFlush() {
			return this == Combination.FLUSH;
		}

		/**
   * Returns true if combination is full house
   * @returns {Boolean}
   */

	}, {
		key: 'isFullHouse',
		value: function isFullHouse() {
			return this == Combination.FULL_HOUSE;
		}

		/**
   * Returns true if combination is four of a kind
   * @returns {Boolean}
   */

	}, {
		key: 'isFourOfKind',
		value: function isFourOfKind() {
			return this == Combination.FOUR_OF_A_KIND;
		}

		/**
   * Returns true if combination is royal flush
   * @returns {Boolean}
   */

	}, {
		key: 'isRoyalFlush',
		value: function isRoyalFlush() {
			return this.isStraightFlush() && this.highestCard == Card.ACE;
		}

		/**
   * Returns true if combination is straight flush
   * @returns {Boolean}
   */

	}, {
		key: 'isStraightFlush',
		value: function isStraightFlush() {
			return this == Combination.STRAIGHT_FLUSH;
		}
	}, {
		key: '_fullHouseComparison',
		value: function _fullHouseComparison(combination) {
			var highestCombinationCard = utils.getMostValuableFullHouseCardRank(combination.cards);
			var highestThisCard = utils.getMostValuableFullHouseCardRank(this.cards);

			if (highestThisCard > highestCombinationCard) {
				return 1;
			} else if (highestThisCard < highestCombinationCard) {
				return -1;
			}

			return 0;
		}

		/**
   * Returns combination's rank
   * @param {Hand} hand
   * @returns {Number}
   * @private
   */

	}, {
		key: '_calculateCombination',
		value: function _calculateCombination() {
			var cards = this._hand.cards;
			var isFlush = detector.isFlush(cards);
			var isStraight = detector.isStraight(cards);

			if (isFlush && isStraight) {
				return Combination.STRAIGHT_FLUSH;
			} else if (detector.isFourOfAKind(cards)) {
				return Combination.FOUR_OF_A_KIND;
			} else if (detector.isFullHouse(cards)) {
				return Combination.FULL_HOUSE;
			} else if (isFlush) {
				return Combination.FLUSH;
			} else if (isStraight) {
				return Combination.STRAIGHT;
			} else if (detector.isThreeOfAKind(cards)) {
				return Combination.THREE_OF_A_KIND;
			} else if (detector.isTwoPairs(cards)) {
				return Combination.TWO_PAIR;
			} else if (detector.isPair(cards)) {
				return Combination.PAIR;
			}

			return Combination.KICKER;
		}
	}, {
		key: '_getCombinationCards',
		value: function _getCombinationCards(hand) {
			var cards = [];
			var fiveCardCombinations = [Combination.STRAIGHT_FLUSH, Combination.FLUSH, Combination.STRAIGHT, Combination.FULL_HOUSE];
			if (fiveCardCombinations.indexOf(this.rank) > -1) {
				cards = hand.cards;
			} else if (this.rank === Combination.KICKER) {
				cards = [hand.cards[4]];
			} else {
				cards = utils.combinationCardsByRank(hand);
			}

			return cards;
		}
	}, {
		key: '_getHighestCard',
		value: function _getHighestCard(cards) {
			var maxIndex = cards.length - 1;

			if (this.rank === Combination.STRAIGHT || this.rank === Combination.STRAIGHT_FLUSH) {
				var last = cards[maxIndex];
				var penult = cards[maxIndex - 1];
				if (penult.rank === Card.FIVE && last.rank === Card.ACE) {
					return penult;
				}
			}

			return cards[maxIndex];
		}
	}, {
		key: 'highestCard',
		get: function get() {
			if (!this._highestCard) {
				this._highestCard = this._getHighestCard(this.cards);
			}

			return this._highestCard;
		}
	}, {
		key: 'cards',
		get: function get() {
			if (!this._cards) {
				this._cards = this._getCombinationCards(this._hand);
			}

			return this._cards;
		}
	}, {
		key: 'rank',
		get: function get() {
			if (!this._rank) {
				this._rank = this._calculateCombination();
			}

			return this._rank;
		}
	}, {
		key: 'name',
		get: function get() {
			if (!this._name) {
				this._name = combinationNames[this.rank] || '';
			}

			return this._name;
		}
	}], [{
		key: 'KICKER',
		get: function get() {
			return 0;
		}
	}, {
		key: 'PAIR',
		get: function get() {
			return 1;
		}
	}, {
		key: 'TWO_PAIR',
		get: function get() {
			return 2;
		}
	}, {
		key: 'THREE_OF_A_KIND',
		get: function get() {
			return 3;
		}
	}, {
		key: 'STRAIGHT',
		get: function get() {
			return 4;
		}
	}, {
		key: 'FLUSH',
		get: function get() {
			return 5;
		}
	}, {
		key: 'FULL_HOUSE',
		get: function get() {
			return 6;
		}
	}, {
		key: 'FOUR_OF_A_KIND',
		get: function get() {
			return 7;
		}
	}, {
		key: 'STRAIGHT_FLUSH',
		get: function get() {
			return 8;
		}
	}, {
		key: 'ROYAL_FLUSH',
		get: function get() {
			return 9;
		}
	}]);

	return Combination;
}();

var combinationNames = (_combinationNames = {}, _defineProperty(_combinationNames, Combination.KICKER, 'kicker'), _defineProperty(_combinationNames, Combination.PAIR, 'pair'), _defineProperty(_combinationNames, Combination.TWO_PAIR, 'two pairs'), _defineProperty(_combinationNames, Combination.THREE_OF_A_KIND, 'three of a kind'), _defineProperty(_combinationNames, Combination.STRAIGHT, 'straight'), _defineProperty(_combinationNames, Combination.FLUSH, 'flush'), _defineProperty(_combinationNames, Combination.FULL_HOUSE, 'full-house'), _defineProperty(_combinationNames, Combination.FOUR_OF_A_KIND, 'four of a kind'), _defineProperty(_combinationNames, Combination.STRAIGHT_FLUSH, 'straight flush'), _defineProperty(_combinationNames, Combination.ROYAL_FLUSH, 'royal flush'), _combinationNames);

module.exports = Combination;