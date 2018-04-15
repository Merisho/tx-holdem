const assert = require('assert');
const Pack = require('../src/pack');

describe('Pack', function() {
	it('create random card', function() {
		const card = new Pack().createCard();

		assert.notEqual(card, undefined);
		assert.notEqual(card, null);
	});

	it('create known card', function() {
		const pack = new Pack();
		const card = pack.createCard('clubs', 'ace');

		assert.strictEqual(pack.has('clubs', 'ace'), true);
	});
	
	it('create 52 cards', function() {
		const pack = new Pack();
		const cards = pack.createCards(52);
		
		assert.equal(cards.length, 52);
	});

	it('Returns null when trying to create card with given suit and value more than once', () => {
		const pack = new Pack();
		
		pack.createCard('clubs', 'ace');
		const card = pack.createCard('clubs', 'ace');

		assert.equal(card, null);
	});
});