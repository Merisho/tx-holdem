const assert = require('assert');
const Card = require('../card');

describe('Card', () => {
	it('compares cards', () => {
		const card1 = Card.create(Card.CLUBS, Card.ACE);
		const card2 = Card.create(Card.CLUBS, Card.KING);
		
		assert.equal(card1.compare(card2), 1);
		assert.equal(card2.compare(card1), -1);
		assert.equal(card1.compare(card1), 0);
	});
});