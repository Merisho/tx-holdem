const assert = require('assert');
const Card = require('../card');
const Hand = require('../hand');
const Combination = require('../combination');

describe('Combination', () => {
	describe('Kicker', () => {
		it('detect combination', () => {
			testCombination([
				[0, 0],
				[1, 1],
				[0, 3],
				[3, 5],
				[2, 12]
			], Combination.KICKER);
		});
		it('detect combination cards', () => {
			testCombinationCards([
				[0, 0],
				[1, 1],
				[0, 3],
				[3, 5],
				[2, 12]
			], 12);
		});
	});
	describe('Pair', () => {
		it('detect combination', () => {
			testCombination([
				[0, 1],
				[1, 1],
				[1, 2],
				[2, 3],
				[3, 0]
			], Combination.PAIR);
		});
		it('detect combination cards', () => {
			testCombinationCards([
				[0, 1],
				[1, 3],
				[1, 1],
				[2, 2],
				[3, 4]
			], 1);
		});
	});
	describe('Two pair', () => {
		it('detect combination', () => {
			testCombination([
				[0, 1],
				[1, 1],
				[1, 2],
				[2, 0],
				[3, 0]
			], Combination.TWO_PAIR);
		});
		it('detect combination cards', () => {
			var hand = new Hand();
			hand.addCard(new Card(0, 2));
			hand.addCard(new Card(1, 1));
			hand.addCard(new Card(3, 3));
			hand.addCard(new Card(2, 1));
			hand.addCard(new Card(0, 3));
			
			var combination = hand.combination;
			var combCards = combination.cards;
			assert.equal(combCards[0].value, 1);
			assert.equal(combCards[1].value, 1);
			assert.equal(combCards[2].value, 3);
			assert.equal(combCards[3].value, 3);
		});
	});
	describe('Three of a kind', () => {
		it('detect combination', () => {
			testCombination([
				[0, 1],
				[1, 1],
				[2, 1],
				[2, 3],
				[3, 4]
			], Combination.THREE_OF_A_KIND);
		});
		it('detect combination cards', () => {
			testCombinationCards([
				[0, 1],
				[1, 3],
				[1, 1],
				[2, 2],
				[3, 1]
			], 1);
		});
	});
	describe('Straight', () => {
		it('detect combination', () => {
			// straight from 2 to 6
			testCombination([
				[0, 0],
				[1, 1],
				[2, 2],
				[3, 3],
				[0, 4]
			], Combination.STRAIGHT);
			
			// straight from Ace to 5
			testCombination([
				[0, 0],
				[1, 1],
				[2, 2],
				[3, 3],
				[0, 12]
			], Combination.STRAIGHT);
		});
		it('detect combination cards', () => {
			var hand = new Hand();
			hand.addCard(new Card(0, 4));
			hand.addCard(new Card(2, 3));
			hand.addCard(new Card(3, 2));
			hand.addCard(new Card(1, 1));
			hand.addCard(new Card(0, 0));
			
			var combination = hand.combination;
			var combCards = combination.cards;
			for(var i in combCards) {
				assert.equal(combCards[i].value, i);
			}
		});
	});
	describe('Flush', () => {
		it('detect combination', () => {
			testCombination([
				[0, 0],
				[0, 5],
				[0, 9],
				[0, 12],
				[0, 3]
			], Combination.FLUSH);
		});
		it('detect combination cards', () => {
			var hand = new Hand();
			hand.addCard(new Card(0, 12));
			hand.addCard(new Card(0, 3));
			hand.addCard(new Card(0, 5));
			hand.addCard(new Card(0, 1));
			hand.addCard(new Card(0, 0));
			
			var combination = hand.combination;
			var combCards = combination.cards;
			for(var i in combCards) {
				assert.equal(combCards[i].suit, 0);
			}
		});
	});
	describe('Full-house', () => {
		it('detect combination', () => {
			testCombination([
				[0, 1],
				[1, 1],
				[2, 1],
				[2, 0],
				[3, 0]
			], Combination.FULL_HOUSE);
		});
		it('detect combination cards', () => {
			var hand = new Hand();
			hand.addCard(new Card(0, 1));
			hand.addCard(new Card(1, 1));
			hand.addCard(new Card(3, 3));
			hand.addCard(new Card(2, 1));
			hand.addCard(new Card(0, 3));
			
			var combination = hand.combination;
			var combCards = combination.cards;
			assert.equal(combCards[0].value, 1);
			assert.equal(combCards[1].value, 1);
			assert.equal(combCards[2].value, 1);
			assert.equal(combCards[3].value, 3);
			assert.equal(combCards[4].value, 3);
		});
	});
	describe('Four of a kind', () => {
		it('detect combination', () => {
			testCombination([
				[0, 1],
				[1, 1],
				[2, 1],
				[3, 1],
				[3, 0]
			], Combination.FOUR_OF_A_KIND);
		});
		it('detect combination cards', () => {
			testCombinationCards([
				[0, 1],
				[1, 3],
				[1, 1],
				[2, 1],
				[3, 1]
			], 1);
		});
	});
	describe('Straigt flush', () => {
		it('detect combination', () => {
			testCombination([
				[0, 0],
				[0, 1],
				[0, 2],
				[0, 3],
				[0, 4]
			], Combination.STRAIGHT_FLUSH);
		});
		it('detect combination cards', () => {
			var hand = new Hand();
			hand.addCard(new Card(0, 4));
			hand.addCard(new Card(0, 3));
			hand.addCard(new Card(0, 2));
			hand.addCard(new Card(0, 1));
			hand.addCard(new Card(0, 0));
			
			var combination = hand.combination;
			var combCards = combination.cards;
			for(var i in combCards) {
				assert.equal(combCards[i].value, i);
				assert.equal(combCards[i].suit, 0);
			}
		});
	});
	
	describe('Partial hands', () => {
		it('Pair', () => {
			testCombination([
				[0, 1],
				[1, 1]
			], Combination.PAIR);
		});
		it('Two pair', () => {
			testCombination([
				[0, 1],
				[1, 1],
				[2, 2],
				[3, 2]
			], Combination.TWO_PAIR);
		});
		it('Three of a kind', () => {
			testCombination([
				[0, 1],
				[1, 1],
				[2, 1]
			], Combination.THREE_OF_A_KIND);
		});
		it('Four of a kind', () => {
			testCombination([
				[0, 1],
				[1, 1],
				[2, 1],
				[3, 1]
			], Combination.FOUR_OF_A_KIND);
		});
	});
	
	describe('Combinations comparison (lower - higher)', () => {
		it('Kicker - Pair', () => {
			testCombinationComparisonHigherOrLower([
				[0, 1],
				[2, 1],
				[1, 5],
				[3, 4],
				[3, 10]
				
			], [
				[0, 1],
				[2, 9],
				[1, 7],
				[3, 2],
				[3, 12]
			]);
		});
		it('Pair - Two Pair', () => {
			testCombinationComparisonHigherOrLower([
				[0, 1],
				[2, 1],
				[1, 2],
				[3, 2],
				[3, 10]
				
			], [
				[0, 3],
				[2, 3],
				[1, 7],
				[3, 2],
				[3, 10]
			]);
		});
		it('Two Pair - Three of a kind', () => {
			testCombinationComparisonHigherOrLower([
				[0, 0],
				[2, 0],
				[1, 0],
				[3, 9],
				[3, 10]
				
			], [
				[0, 1],
				[2, 1],
				[1, 2],
				[3, 2],
				[3, 10]
			]);
		});
		it('Three of a kind - Straight', () => {
			testCombinationComparisonHigherOrLower([
				[0, 6],
				[2, 7],
				[2, 8],
				[3, 9],
				[4, 10]
				
			], [
				[0, 0],
				[2, 0],
				[1, 0],
				[3, 9],
				[3, 10]
			]);
		});
		it('Straight - Flush', () => {
			testCombinationComparisonHigherOrLower([
				[0, 0],
				[0, 5],
				[0, 10],
				[0, 9],
				[0, 8]
				
			], [
				[0, 6],
				[2, 7],
				[2, 8],
				[3, 9],
				[3, 10]
			]);
		});
		it('Flush - Full-house', () => {
			testCombinationComparisonHigherOrLower([
				[0, 6],
				[2, 6],
				[2, 8],
				[3, 8],
				[1, 8]
				
			], [
				[0, 0],
				[0, 5],
				[0, 10],
				[0, 9],
				[0, 8]
			]);
		});
		it('Full-house - Four of a kind', () => {
			testCombinationComparisonHigherOrLower([
				[3, 0],
				[2, 0],
				[0, 0],
				[1, 0],
				[0, 7]
				
			], [
				[0, 6],
				[2, 6],
				[2, 8],
				[3, 8],
				[1, 8]
			]);
		});
		it('Four of a kind - Straight flush', () => {
			testCombinationComparisonHigherOrLower([
				[0, 6],
				[0, 7],
				[0, 8],
				[0, 9],
				[0, 10]
				
			], [
				[3, 0],
				[2, 0],
				[0, 0],
				[1, 0],
				[0, 7]
			]);
		});
		it('Straight flush - Royal flush', () => {
			testCombinationComparisonHigherOrLower([
				[1, 8],
				[1, 9],
				[1, 10],
				[1, 11],
				[1, 12]
				
			], [
				[0, 3],
				[0, 4],
				[0, 5],
				[0, 6],
				[0, 7]
			]);
		});
		it('Deuces Pair - Aces Pair', () => {
			testCombinationComparisonHigherOrLower([
				[0, 12],
				[1, 12],
				[2, 3],
				[3, 3],
				[1, 1]
			], [
				[0, 0],
				[1, 0],
				[2, 2],
				[2, 4],
				[1, 5]
			]);
		});
		it('Deuces and Fours two pair - Deuces and Aces two pair', () => {
			testCombinationComparisonHigherOrLower([
				[0, 12],
				[1, 12],
				[2, 0],
				[3, 0],
				[1, 1]
			], [
				[0, 0],
				[1, 0],
				[2, 2],
				[3, 2],
				[1, 5]
			]);
		});
		it('Deuces three of a kind - Aces three of a kind', () => {
			testCombinationComparisonHigherOrLower([
				[0, 12],
				[1, 12],
				[2, 12],
				[3, 0],
				[1, 1]
			], [
				[0, 0],
				[1, 0],
				[2, 0],
				[3, 2],
				[1, 5]
			]);
		});
		it('Deuce-Six straight - Ten-Ace straight', () => {
			testCombinationComparisonHigherOrLower([
				[0, 8],
				[1, 9],
				[2, 10],
				[3, 11],
				[1, 12]
			], [
				[0, 0],
				[1, 1],
				[2, 2],
				[3, 3],
				[1, 4]
			]);
		});
		it('Ace-Five straight - Deuce-Six straight', () => {
			testCombinationComparisonHigherOrLower([
				[0, 0],
				[1, 1],
				[2, 2],
				[3, 3],
				[1, 4]
			], [
				[0, 12],
				[1, 0],
				[2, 1],
				[3, 2],
				[1, 3]
			]);
		});
		it('Ten the highest in flush - Ace the highest in flush', () => {
			testCombinationComparisonHigherOrLower([
				[0, 0],
				[0, 1],
				[0, 2],
				[0, 3],
				[0, 12]
			], [
				[2, 8],
				[2, 0],
				[2, 1],
				[2, 2],
				[2, 3]
			]);
		});
		it('One card difference flush: Four - five', () => {
			testCombinationComparisonHigherOrLower([
				[0, 5],
				[0, 6],
				[0, 7],
				[0, 8],
				[0, 3]
			], [
				[0, 5],
				[0, 6],
				[0, 7],
				[0, 8],
				[0, 2]
			]);
		})
		it('Full-house of Threes and Jacks  - Full-house of Tens and Nines', () => {
			testCombinationComparisonHigherOrLower([
				[0, 8],
				[1, 8],
				[2, 8],
				[3, 7],
				[1, 7]
			], [
				[0, 1],
				[1, 1],
				[2, 1],
				[3, 9],
				[1, 9]
			]);
		});
		it('Queens four of a kind  - Kings for of a kind', () => {
			testCombinationComparisonHigherOrLower([
				[0, 11],
				[1, 11],
				[2, 11],
				[3, 11],
				[1, 1]
			], [
				[0, 12],
				[1, 10],
				[2, 10],
				[3, 10],
				[1, 10]
			]);
		});
		it('Deuce-Six straight flush  - Six-Ten straight flush', () => {
			testCombinationComparisonHigherOrLower([
				[0, 4],
				[0, 5],
				[0, 6],
				[0, 7],
				[0, 8]
			], [
				[1, 0],
				[1, 1],
				[1, 2],
				[1, 3],
				[1, 4]
			]);
		});
	});
	describe('Combination comparison (both equal)', () => {
		it('Kicker', () => {
			testCombinationComparisonEqual([
				[0, 12],
				[1, 5],
				[2, 7],
				[3, 4],
				[0, 8]
			], [
				[2, 12],
				[3, 1],
				[1, 0],
				[0, 9],
				[0, 8]
			]);
		});
		it('Pair', () => {
			testCombinationComparisonEqual([
				[0, 0],
				[1, 0],
				[2, 5],
				[3, 2],
				[0, 8]
			], [
				[2, 0],
				[3, 0],
				[1, 5],
				[0, 2],
				[0, 8]
			]);
		});
		it('Two pair', () => {
			testCombinationComparisonEqual([
				[0, 12],
				[1, 12],
				[2, 11],
				[3, 11],
				[0, 8]
			], [
				[2, 12],
				[3, 12],
				[1, 11],
				[0, 11],
				[0, 8]
			]);
		});
	});
	
	describe('Detect higher card which plays in combination', () => {
		it('Kicker', () => {
			var comb = createHand([
				[0, 0],
				[0, 1],
				[1, 8],
				[3, 5],
				[2, 4]
			]).combination;
			assert.equal(comb.highestCard.value, 8);
		});
		it('Pair', () => {
			var comb = createHand([
				[0, 0],
				[0, 1],
				[1, 11],
				[3, 5],
				[2, 11]
			]).combination;
			assert.equal(comb.highestCard.value, 11);
		});
		it('Two pair', () => {
			var comb = createHand([
				[0, 0],
				[0, 1],
				[1, 11],
				[3, 1],
				[2, 11]
			]).combination;
			assert.equal(comb.highestCard.value, 11);
		});
		it('Three of a kind', () => {
			var comb = createHand([
				[0, 0],
				[0, 1],
				[1, 11],
				[3, 11],
				[2, 11]
			]).combination;
			assert.equal(comb.highestCard.value, 11);
		});
		it('Straight', () => {
			var comb = createHand([
				[0, 0],
				[0, 1],
				[1, 2],
				[3, 3],
				[2, 4]
			]).combination;
			assert.equal(comb.highestCard.value, 4);
		});
		it('Full-house', () => {
			var comb = createHand([
				[0, 0],
				[1, 0],
				[1, 11],
				[3, 0],
				[2, 11]
			]).combination;
			assert.equal(comb.highestCard.value, 0);
		});
	});
});

function testCombination(cardsForHand, expected) {
	var hand = createHand(cardsForHand),
		combination = hand.combination;
	assert.equal(combination.rank, expected);
}

function testCombinationCards(cardsForHand, expected) {
	var hand = createHand(cardsForHand),
		combination = hand.combination,
		combCards = combination.cards;
	
	assert.notEqual(combCards.length, 0);
	for(var i in combCards) {
		assert.equal(combCards[i].value, expected);
	}
}

function testCombinationComparisonHigherOrLower(cardsForHigherHand, cardsForLowerHand) {
	var hand1 = createHand(cardsForHigherHand);
	var higherComb = hand1.combination;
	
	var hand2 = createHand(cardsForLowerHand);
	var lowerComb = hand2.combination;
	
	assert.equal(higherComb.compare(lowerComb), 1);
	assert.equal(lowerComb.compare(higherComb), -1);
}

function testCombinationComparisonEqual(cardsForHigherHand, cardsForLowerHand) {
	var hand1 = createHand(cardsForHigherHand);
	var higherComb = hand1.combination;
	
	var hand2 = createHand(cardsForLowerHand);
	var lowerComb = hand2.combination;
	
	assert.equal(higherComb.compare(lowerComb), 0);
	assert.equal(lowerComb.compare(higherComb), 0);
}

function createHand(cards) {
	var hand = new Hand();
	for(var i in cards) {
		var suitVal = cards[i];
		hand.addCard(new Card(suitVal[0], suitVal[1]));
	}
	
	return hand;
}