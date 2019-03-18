'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Card = require('./card');

var SUIT_MIN = Card.SUIT_MIN,
    SUIT_MAX = Card.SUIT_MAX,
    RANK_MIN = Card.RANK_MIN,
    RANK_MAX = Card.RANK_MAX,
    ALIAS_TO_RANK = Card.ALIAS_TO_RANK,
    RANK_TO_ALIAS = Card.RANK_TO_ALIAS;


var aliases = ALIAS_TO_RANK;
var ranks = RANK_TO_ALIAS;

/**
 * @class Pack
*/

var Pack = function () {
	function Pack() {
		_classCallCheck(this, Pack);

		this.cards = [];
		this._availableCards = this._availableCardsArray();
	}

	/**
  * Clear pack
 */


	_createClass(Pack, [{
		key: 'destroy',
		value: function destroy() {
			this.cards = [];
			this._availableCards = this._availableCardsArray();
		}

		/**
   * Count of created cards in pack
   * @readonly
   * @type {Number}
   */

	}, {
		key: 'createCards',


		/**
   * Create specified number of random cards
   * @param {Number} count
   * @returns {Array}
   */
		value: function createCards(count) {
			var cards = [];
			for (var i = 0; i < count; i++) {
				cards.push(this.createCard());
			}

			return cards;
		}

		/**
   * Creates random card
   * @returns {Card}
   */ /**
      * Creates card with given suit and rank
      * @param {String} suit
      * @param {String} rank
      * @returns {Card}
      */

	}, {
		key: 'createCard',
		value: function createCard(suit, rank) {
			var cards = this.cards;

			if (this.count === 52) {
				return null;
			}

			var suitEmpty = typeof suit === 'undefined';
			var valEmpty = typeof val === 'undefined';
			if (suitEmpty && valEmpty) {
				var randomCard = _generateRandomCard.call(this);
				suit = randomCard.suit;
				rank = randomCard.rank;
			} else {
				suit = _getRankByAlias(suit);
				rank = _getRankByAlias(rank);

				if (suit === null || rank === null) {
					return null;
				}
			}

			return _createNewCard.call(this, suit, rank);
		}

		/**
   * Checks whether card exists in current Pack
   * @param {Card} card
   * @returns {Boolean}
   */ /**
      * Checks whether card exists in current Pack
      * @param {Number} suit
      * @param {Number} rank
      * @returns {Boolean}
      */

	}, {
		key: 'has',
		value: function has(card /*suit, rank*/) {
			var s = void 0,
			    v = void 0;
			if (card instanceof Card) {
				s = card.suit;
				v = card.rank;
			} else if (typeof arguments[0] !== 'undefined' && typeof arguments[1] !== 'undefined') {
				s = _getRankByAlias(arguments[0]);
				v = _getRankByAlias(arguments[1]);

				s === null && (s = arguments[0]);
				v === null && (v = arguments[1]);
			}

			return !!(this.cards[s] && this.cards[s][v]);
		}
	}, {
		key: '_availableCardsArray',
		value: function _availableCardsArray() {
			var cards = [];

			for (var s = SUIT_MIN; s <= SUIT_MAX; s++) {
				for (var r = RANK_MIN; r <= RANK_MAX; r++) {
					var card = {
						suit: s,
						rank: r
					};
					cards.push(card);
				}
			}

			return cards;
		}
	}, {
		key: 'count',
		get: function get() {
			return this.cards.length;
		}
	}]);

	return Pack;
}();

function _getRankByAlias(alias) {
	if (typeof alias === 'undefined') {
		return null;
	}

	alias = alias.toString().toLowerCase();
	return typeof aliases[alias] === 'undefined' ? null : aliases[alias];
}

function _getAliasByValue(val) {
	if (typeof val === 'undefined') {
		return null;
	}

	return typeof ranks[val] === 'undefined' ? null : ranks[val];
}

function _createNewCard(suit, val) {
	if (typeof suit === 'undefined' || typeof val === 'undefined') {
		return null;
	}

	var exists = this.has(_getAliasByValue(suit), _getAliasByValue(val));
	if (exists) {
		return null;
	} else {
		!this.cards[suit] && (this.cards[suit] = []);
		this.cards[suit][val] = true;
	}

	return Card.create(suit, val);
}

function _generateRandomCard() {
	var randIndex = Math.floor(Math.random() * this._availableCards.length);
	var card = this._availableCards[randIndex];

	this._availableCards.splice(randIndex, 1);

	return card;
}

module.exports = Pack;