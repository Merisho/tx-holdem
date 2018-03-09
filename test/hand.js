const assert = require('assert');
const Card = require('../src/card');
const Hand = require('../src/hand');

describe('Hand', () => {
	it('adds sequence of cards', () => {
		const hand = new Hand();
		const cards = [
			new Card(Card.CLUBS, Card.EIGHT),
			new Card(Card.CLUBS, Card.SEVEN),
			new Card(Card.CLUBS, Card.SIX),
			new Card(Card.CLUBS, Card.FIVE),
			new Card(Card.CLUBS, Card.FOUR)
		];

		const added = hand.addCards(...cards);

		assert.strictEqual(added, true);
	});

	it('does not add repeated cards', () => {
		const hand = new Hand();
		const repeatedCards = [
			new Card(Card.CLUBS, Card.EIGHT),
			new Card(Card.CLUBS, Card.EIGHT),
			new Card(Card.CLUBS, Card.SIX),
			new Card(Card.CLUBS, Card.SIX),
			new Card(Card.CLUBS, Card.FOUR)
		];

		const added = hand.addCards(...repeatedCards);

		assert.strictEqual(added, false);
	});

	it('sorts card in ascending order by default', () => {
		const hand = new Hand();
		const cardsInDescending = [
			new Card(Card.CLUBS, Card.EIGHT),
			new Card(Card.CLUBS, Card.SEVEN),
			new Card(Card.CLUBS, Card.SIX),
			new Card(Card.CLUBS, Card.FIVE),
			new Card(Card.CLUBS, Card.FOUR)
		];
		
		hand.addCards(...cardsInDescending);

		assert.deepEqual(hand.cards, cardsInDescending.reverse());
	});

	it('Should not modify array of cards passed as constructor arguments', () => {
		const cards = [
			new Card(Card.CLUBS, Card.DEUCE),
			new Card(Card.CLUBS, Card.THREE),
			new Card(Card.CLUBS, Card.FOUR),
			new Card(Card.CLUBS, Card.FIVE),
		];
		const expectedCards = cards.slice(0, 4);

		new Hand(cards);

		assert.equal(cards.length, expectedCards.length);
		assert.deepEqual(cards, expectedCards);
	});
});