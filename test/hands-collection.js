const assert = require('assert');
const Card = require('../src/card');
const Combination = require('../src/combination');
const HandsCollection = require('../src/hands-collection');
const HandDataBuilder = require('./dataBuilder/HandDataBuilder');

const boardBuilder = new HandDataBuilder().withCardsOfClubs(2, 10, 6, 'J').withCardsOfSpades('K');

describe('Hands combinations', () => {
	it('Number of combinations', () => {
		const board = boardBuilder.build();
		const hand = new HandDataBuilder().withCardsOfClubs(7, 8).build();
		
		const collection = HandsCollection.createCombinations(hand, board);
		
		assert.equal(collection.count, 21);
	});

	it('Highest combination', () => {
		const board = boardBuilder.build();
		const hand = new HandDataBuilder().withCardsOfClubs(7).withCardsOfSpades('A').build();
		
		const collection = HandsCollection.createCombinations(board, hand);
		
		assert(collection.highestCombination.isFlush());
	});

	it('Highest combination with only high cards', () => {
		const board = boardBuilder.build()
		const hand = new HandDataBuilder().withCardsOfSpades(7, 8).build()

		const cards = HandsCollection.createCombinations(board, hand).highestCombination._hand.cards
		assert.notStrictEqual(cards[0], new Card(23, 5))
		assert.notStrictEqual(cards[0], new Card(23, 6))
	});

	it('Returns combination of hand given as the only hand with cards', () => {
		const hand = new HandDataBuilder().withDifferentSuits(3, 3, 3).build();
		const emptyHand = new HandDataBuilder().build();

		const collection = HandsCollection.createCombinations(hand, emptyHand);

		assert(collection.highestCombination.isThreeOfKind());
	});

	it('Returns best draw combination', () => {
		const hand = new HandDataBuilder().withCardsOfClubs(4, 5).build();
		const board = new HandDataBuilder().withCardsOfClubs(6, 7).withCardsOfSpades(10, 'J').build();

		const collection = HandsCollection.createCombinations(hand, board);
		
		assert.equal(collection.bestDraw.outs, 17);
	});
});