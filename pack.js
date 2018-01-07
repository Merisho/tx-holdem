const Card = require('./card');

const { SUIT_MAX, VALUE_MAX } = Card;

const aliases = {
    clubs: Card.CLUBS,
    diamond: Card.DIAMONDS,
    hearts: Card.HEARTS,
    spades: Card.SPADES,

    2: Card.DEUCE,
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

class Pack {
    constructor() {
        this.cards = [];
		this._availableCards = [];

		for(let i = 0; i <= SUIT_MAX; i++) {
			this._availableCards[i] = [];
			for(let j = 0; j <= VALUE_MAX; j++) {
				this._availableCards[i][j] = true;
			}
		}
    }

    destroy() {
        this.cards = [];
    }

    get count() {
        return this.cards.length;
    }

    /**
     * Create specified number of random cards
     * @param {Number} count
     * @returns {Array}
     */
    createCards(count) {
		const cards = [];
		for(let i = 0; i < count; i++) {
			cards.push(this.createCard());
		}
		
		return cards;
	}

    /**
     * Creates card with given suit and value. If suit and value aren't given so random card will be generated
     * @param {Number} suit
     * @param {Number} value
     * @returns {Card}
     */
    createCard(suit, value) {
        const cards = this.cards;
			
		if(this.count === 52) {
			return null;
		}

		const suitEmpty = typeof suit === 'undefined';
		const valEmpty = typeof val === 'undefined';
		if(suitEmpty && valEmpty) {
			const randomCard = _generateRandomCard.call(this);
			suit = randomCard.suit;
			value = randomCard.value;
		} else {
			suit = _getValueByAlias(suit);
			value = _getValueByAlias(value);

			if(suit === null || value === null) {
				return null;
			}
		}

		return _createNewCard.call(this, suit, value);
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
		if(card instanceof Card) {
			s = card.suit;
			v = card.value;
		} else if(typeof arguments[0] !== 'undefined' && typeof arguments[1] !== 'undefined') {
			s = _getValueByAlias(arguments[0]);
			v = _getValueByAlias(arguments[1]);

			s === null && (s = arguments[0]);
			v === null && (v = arguments[1]);
		}

		return !!(this.cards[s] && this.cards[s][v]);
	}
}

function _getValueByAlias(alias) {
	if(typeof alias === 'undefined') {
		return null;
	}

	alias = alias.toString().toLowerCase();
	return typeof aliases[alias] === 'undefined' ? null : aliases[alias];
}

function _createNewCard(suit, val) {
	if(typeof suit === 'undefined' || typeof val === 'undefined') {
		return null;
	}

	const exists = this.has(suit, val);
	if(!exists) {
		!this.cards[suit] && (this.cards[suit] = []);
		this.cards[suit][val] = true;
	}
	
	return Card.create(suit, val);
}

function _generateRandomCard() {
	let suit = Math.round(Math.random() * (SUIT_MAX)),
		value = Math.round(Math.random() * (VALUE_MAX));

	while(this.has(suit, value)) {
		suit = Math.round(Math.random() * (SUIT_MAX));
		value = Math.round(Math.random() * (VALUE_MAX));
	}
	
	return { suit, value };
}

module.exports = Pack;