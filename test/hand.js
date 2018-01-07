const assert = require('assert');
const Card = require('../card');
const Hand = require('../hand');

describe('Hand', () => {
	it('adds sequence of cards', () => {
		const hand = new Hand();
		const cards = [
			Card.EIGHT,
			Card.SEVEN,
			Card.SIX,
			Card.FIVE,
			Card.FOUR
		].map(value => new Card(Card.CLUBS, value));

		const added = hand.addCards(...cards);

		assert.strictEqual(added, true);
	});

	it('does not add repeated cards', () => {
		const hand = new Hand();
		const cards = [
			Card.EIGHT,
			Card.EIGHT,
			Card.FIVE,
			Card.FIVE,
			Card.FOUR
		].map(value => new Card(Card.CLUBS, value));

		const added = hand.addCards(...cards);

		assert.strictEqual(added, false);
	});

	it('sorts card in ascending order by default', () => {
		const hand = new Hand();
		const cardsInDescending = [
			Card.EIGHT,
			Card.SEVEN,
			Card.SIX,
			Card.FIVE,
			Card.FOUR
		].map(value => new Card(Card.CLUBS, value));
		
		hand.addCards(...cardsInDescending);

		assert.deepEqual(hand.cards, cardsInDescending.reverse());
	});
});