const assert = require('assert');
const Card = require('../card');
const Hand = require('../hand');

describe('Hand', () => {
	it('adds sequence of cards', () => {
		const hand = new Hand();
		const added = hand.addCards(new Card(0, 6), new Card(0, 5), new Card(0, 4), new Card(0, 3), new Card(0, 2));

		assert.strictEqual(added, true);
	});

	it('does not add repeated cards', () => {
		const hand = new Hand();
		const added = hand.addCards(new Card(0, 6), new Card(0, 6), new Card(0, 4), new Card(0, 4), new Card(0, 2));

		assert.strictEqual(added, false);
	});

	it('sorts card in ascending order by default', () => {
		const hand = new Hand();
		hand.addCards(new Card(0, 6), new Card(0, 5), new Card(0, 4), new Card(0, 3), new Card(0, 2));
		
		const cards = hand.cards;
		for(let i = 6; i > 1; i--) {
			assert.equal(cards.pop().value, i);
		}
	});
});