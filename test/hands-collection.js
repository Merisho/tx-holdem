const assert = require('assert');
const Card = require('../card');
const Hand = require('../hand');
const Combination = require('../combination');
const HandsCollection = require('../hands-collection');

describe('Hands combinations', () => {
	it('Number of combinations', () => {
		const hand1 = new Hand();
		const hand2 = new Hand();

		hand1.addCard(new Card(0, 1));
		hand1.addCard(new Card(0, 2));
		
		hand2.addCard(new Card(0, 3));
		hand2.addCard(new Card(0, 4));
		hand2.addCard(new Card(0, 5));
		hand2.addCard(new Card(0, 6));
		hand2.addCard(new Card(0, 7));
		
		const collection = HandsCollection.createCombinations(hand1, hand2);
		
		assert.equal(collection.count, 21);
	});
	it('Highest combination', () => {
		const board = new Hand();
		const hand = new Hand();
		
		hand.addCard(new Card(0, 12));
		hand.addCard(new Card(1, 8));
		
		board.addCard(new Card(0, 4));
		board.addCard(new Card(0, 5));
		board.addCard(new Card(0, 6));
		board.addCard(new Card(0, 7));
		board.addCard(new Card(3, 0));
		
		const collection = HandsCollection.createCombinations(board, hand);
		
		assert.equal(collection.highestHand.combination.rank, Combination.FLUSH);
	});
	it('Lowest combination', () => {
		const board = new Hand();
		const hand = new Hand();
		
		hand.addCard(new Card(0, 12));
		hand.addCard(new Card(1, 8));
		
		board.addCard(new Card(0, 4));
		board.addCard(new Card(0, 5));
		board.addCard(new Card(0, 6));
		board.addCard(new Card(0, 7));
		board.addCard(new Card(3, 0));
		
		const collection = HandsCollection.createCombinations(board, hand);
		
		assert.equal(collection.lowestHand.combination.rank, Combination.KICKER);
	});
});