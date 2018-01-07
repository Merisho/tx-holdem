const assert = require('assert');
const Combination = require('../combination');
const HandsCollection = require('../hands-collection');
const HandDataBuilder = require('./dataBuilder/HandDataBuilder');

describe('Hands combinations', () => {
	it('Number of combinations', () => {
		const hand = new HandDataBuilder().withCardsOfClubs('deuce', 'six').build();
		const board = new HandDataBuilder().withStraightFrom('seven').build();
		
		const collection = HandsCollection.createCombinations(hand, board);
		
		assert.equal(collection.count, 21);
	});

	it('Highest combination', () => {
		const board = new HandDataBuilder().withCardsOfClubs('deuce', 'ten', 'six', 'jack').withCardsOfSpades('king').build();
		const hand = new HandDataBuilder().withCardsOfClubs('seven').withCardsOfSpades('ace').build();
		
		const collection = HandsCollection.createCombinations(board, hand);
		
		assert.equal(collection.highestCombinationRank, Combination.FLUSH);
	});

	it('Lowest combination', () => {
		const board = new HandDataBuilder().withCardsOfClubs('six', 'seven', 'eight', 'nine').withCardsOfSpades('ace').build();
		const hand = new HandDataBuilder().withCardsOfClubs('ace').withCardsOfSpades('ten').build();
		
		const collection = HandsCollection.createCombinations(board, hand);
		
		assert.equal(collection.lowestCombinationRank, Combination.KICKER);
	});
});