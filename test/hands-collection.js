const assert = require('assert');
const Combination = require('../combination');
const HandsCollection = require('../hands-collection');
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
		
		assert.equal(collection.highestCombinationRank, Combination.FLUSH);
	});

	it('Lowest combination', () => {
		const board = boardBuilder.build();
		const hand = new HandDataBuilder().withCardsOfClubs('A').withCardsOfSpades(10).build();
		
		const collection = HandsCollection.createCombinations(board, hand);
		
		assert.equal(collection.lowestCombinationRank, Combination.KICKER);
	});
});