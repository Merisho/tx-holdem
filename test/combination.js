const assert = require('assert');
const Card = require('../card');
const Hand = require('../hand');
const Combination = require('../combination');
const HandBuilder = require('./dataBuilder/HandDataBuilder');

describe('Combination', () => {
	describe('Kicker', () => {
		const hand = new HandBuilder().withDifferentSuits(2, 3, 5, 7, 'A').build();
		const kickerCombination = new Combination(hand);

		it('detect combination', () => {
			assert.equal(kickerCombination.rank, Combination.KICKER);
		});

		it('detect combination cards', () => {
			assert.equal(kickerCombination.cards.length, 1);
			assert.equal(kickerCombination.cards[0].value, Card.ACE);
		});
	});

	describe('Pair', () => {
		const hand = new HandBuilder().withDifferentSuits(2, 2, 5, 7, 'A').build();
		const pairCombination = new Combination(hand);

		it('detect combination', () => {
			assert.equal(pairCombination.rank, Combination.PAIR);
		});

		it('detect combination cards', () => {
			assert.equal(pairCombination.cards.length, 2);
			assert.equal(pairCombination.cards[0].value, Card.DEUCE);
			assert.equal(pairCombination.cards[1].value, Card.DEUCE);
		});
	});

	describe('Two pairs', () => {
		const hand = new HandBuilder().withDifferentSuits(2, 2, 4, 7, 7).build();
		const twoPairsCombination = new Combination(hand);

		it('detect combination', () => {
			assert.equal(twoPairsCombination.rank, Combination.TWO_PAIR);
		});

		it('detect combination cards', () => {
			assert.equal(twoPairsCombination.cards.length, 4);
			assert.equal(twoPairsCombination.cards[0], Card.DEUCE);
			assert.equal(twoPairsCombination.cards[1], Card.DEUCE);
			assert.equal(twoPairsCombination.cards[2], Card.SEVEN);
			assert.equal(twoPairsCombination.cards[3], Card.SEVEN);
		});
	});

	describe('Three of a kind', () => {
		const hand = new HandBuilder().withDifferentSuits(3, 3, 5, 3, 6).build();
		const threeOfKindCombination = new Combination(hand);

		it('detect combination', () => {
			assert.equal(threeOfKindCombination.rank, Combination.THREE_OF_A_KIND);
		});

		it('detect combination cards', () => {
			assert.equal(threeOfKindCombination.cards.length, 3);
			assert.equal(threeOfKindCombination.cards[0], Card.THREE);
			assert.equal(threeOfKindCombination.cards[1], Card.THREE);
			assert.equal(threeOfKindCombination.cards[2], Card.THREE);
		});
	});

	describe('Straight', () => {
		it('detect combination, common case', () => {
			const hand = new HandBuilder().withStraightFrom(2).build();
			const straightCombination = new Combination(hand);

			assert.equal(straightCombination.rank, Combination.STRAIGHT);
		});

		it('detect combination, edge case (ace - 5)', () => {
			const hand = new HandBuilder().withDifferentSuits(2, 3, 4, 5, 'A').build();
			const straightCombination = new Combination(hand);
			
			assert.equal(straightCombination.rank, Combination.STRAIGHT);
		});

		it('detect combination cards', () => {
			const hand = new HandBuilder().withDifferentSuits(2, 3, 4, 5, 'A').build();
			const straightCombination = new Combination(hand);

			assert.equal(straightCombination.cards.length, 5);
		});
	});
	
	describe('Flush', () => {
		const hand = new HandBuilder().withCardsOfClubs(2, 4, 10, 'A', 5).build();
		const flushCombination = new Combination(hand);

		it('detect combination', () => {
			assert.equal(flushCombination.rank, Combination.FLUSH);
		});

		it('detect combination cards', () => {
			assert.equal(flushCombination.cards.length, 5);
		});
	});

	describe('Full-house', () => {
		const hand = new HandBuilder().withDifferentSuits(6, 6, 6, 9, 9).build();
		const fullhouseCombination = new Combination(hand);

		it('detect combination', () => {
			assert.equal(fullhouseCombination.rank, Combination.FULL_HOUSE);
		});

		it('detect combination cards', () => {
			assert.equal(fullhouseCombination.cards.length, 5);
		});
	});

	describe('Four of a kind', () => {
		const hand = new HandBuilder().withDifferentSuits(6, 6, 6, 6, 9).build();
		const fourOfKindCombination = new Combination(hand);

		it('detect combination', () => {
			assert.equal(fourOfKindCombination.rank, Combination.FOUR_OF_A_KIND);
		});

		it('detect combination cards', () => {
			assert.equal(fourOfKindCombination.cards.length, 4);
			assert.equal(fourOfKindCombination.cards[0], Card.SIX);
			assert.equal(fourOfKindCombination.cards[1], Card.SIX);
			assert.equal(fourOfKindCombination.cards[2], Card.SIX);
			assert.equal(fourOfKindCombination.cards[3], Card.SIX);
		});
	});

	describe('Straigt flush', () => {
		const hand = new HandBuilder().withCardsOfClubs(6, 7, 8, 9, 10).build();
		const straightFlushCombination = new Combination(hand);

		it('detect combination', () => {
			assert.equal(straightFlushCombination.rank, Combination.STRAIGHT_FLUSH);
		});

		it('detect combination cards', () => {
			assert.equal(straightFlushCombination.cards.length, 5);
		});
	});
	
	describe('Partial hands', () => {
		it('Pair', () => {
			const hand = new HandBuilder().withDifferentSuits(2, 2).build();
			const comb = new Combination(hand);

			assert.equal(comb.rank, Combination.PAIR);
		});
		
		it('Two pair', () => {
			const hand = new HandBuilder().withDifferentSuits(2, 2, 4, 4).build();
			const comb = new Combination(hand);

			assert.equal(comb.rank, Combination.TWO_PAIR);
		});

		it('Three of a kind', () => {
			const hand = new HandBuilder().withDifferentSuits(2, 2, 2).build();
			const comb = new Combination(hand);

			assert.equal(comb.rank, Combination.THREE_OF_A_KIND);
		});

		it('Four of a kind', () => {
			const hand = new HandBuilder().withDifferentSuits(2, 2, 2, 2).build();
			const comb = new Combination(hand);

			assert.equal(comb.rank, Combination.FOUR_OF_A_KIND);
		});

		it('Not flush, four cards only', () => {
			const hand = new HandBuilder().withCardsOfSpades(2, 3, 6, 'A').build();
			const comb = new Combination(hand);

			assert.notEqual(comb.rank, Combination.FLUSH);
		});

		it('Not straight, four cards only', () => {
			const hand = new HandBuilder().withDifferentSuits(2, 3, 4, 5).build();
			const comb = new Combination(hand);

			assert.notEqual(comb.rank, Combination.STRAIGHT);
		});
	});
	
	describe('Combinations comparison', () => {
		it('Pair is higher than kicker', () => {
			const kickerHand = new HandBuilder().withDifferentSuits(2, 5, 7, 9, 'A').build();
			const pairHand = new HandBuilder().withDifferentSuits(2, 2, 8, 5, 'K').build();
			const kickerComb = new Combination(kickerHand);
			const pairComb = new Combination(pairHand);

			assert.equal(kickerComb.compare(pairComb), -1);
			assert.equal(pairComb.compare(kickerComb), 1);
		});

		it('Two pairs are higher than pair', () => {
			const pairHand = new HandBuilder().withDifferentSuits(2, 2, 8, 5, 'K').build();
			const twoPairsHand = new HandBuilder().withDifferentSuits(2, 2, 3, 3, 'K').build();
			const pairComb = new Combination(pairHand);
			const twoPairsComb = new Combination(twoPairsHand);
			
			assert.equal(pairComb.compare(twoPairsComb), -1);
			assert.equal(twoPairsComb.compare(pairComb), 1);
		});

		it('Three of a kind is higher than two pairs', () => {
			const twoPairsHand = new HandBuilder().withDifferentSuits(2, 2, 3, 3, 'K').build();
			const threeOfKindHand = new HandBuilder().withDifferentSuits(2, 2, 2, 5, 'A').build();
			const twoPairsComb = new Combination(twoPairsHand);
			const threeOfKindComb = new Combination(threeOfKindHand);
			
			assert.equal(twoPairsComb.compare(threeOfKindComb), -1);
			assert.equal(threeOfKindComb.compare(twoPairsComb), 1);
		});

		it('Straight if higher than three of a kind', () => {
			const threeOfKindHand = new HandBuilder().withDifferentSuits(2, 2, 2, 5, 'A').build();
			const straightHand = new HandBuilder().withStraightFrom(2).build();
			const threeOfKindComb = new Combination(threeOfKindHand);
			const straightComb = new Combination(straightHand);
			
			assert.equal(threeOfKindComb.compare(straightComb), -1);
			assert.equal(straightComb.compare(threeOfKindComb), 1);
		});

		it('Flush is higher than straight', () => {
			const straightHand = new HandBuilder().withStraightFrom(2).build();
			const flushHand = new HandBuilder().withCardsOfClubs(2, 'K', 'A', 4, 7).build();
			const straightComb = new Combination(straightHand);
			const flushComb = new Combination(flushHand);

			assert.equal(straightComb.compare(flushComb), -1);
			assert.equal(flushComb.compare(straightComb), 1);
		});

		it('Full house is higher than flush', () => {
			const flushHand = new HandBuilder().withCardsOfClubs(2, 'K', 'A', 4, 7).build();
			const fullhouseHand = new HandBuilder().withDifferentSuits(6, 6, 6, 9, 9).build();
			const flushComb = new Combination(flushHand);
			const fullhouseComb = new Combination(fullhouseHand);

			assert.equal(flushComb.compare(fullhouseComb), -1);
			assert.equal(fullhouseComb.compare(flushComb), 1);
		});

		it('Four of a kind if higher than full house', () => {
			const fullhouseHand = new HandBuilder().withDifferentSuits(6, 6, 6, 9, 9).build();
			const fourOfKindHand = new HandBuilder().withDifferentSuits('A', 'A', 'A', 'A', 10).build();
			const fullhouseComb = new Combination(fullhouseHand);
			const fourOfKindComb = new Combination(fourOfKindHand);

			assert.equal(fullhouseComb.compare(fourOfKindComb), -1);
			assert.equal(fourOfKindComb.compare(fullhouseComb), 1);
		});

		it('Straight flush is higher than four of a kind', () => {
			const fourOfKindHand = new HandBuilder().withDifferentSuits('A', 'A', 'A', 'A', 10).build();
			const straightFlushHand = new HandBuilder().withCardsOfClubs(2, 3, 4, 5, 6).build();			
			const fourOfKindComb = new Combination(fourOfKindHand);
			const straightFlushComb = new Combination(straightFlushHand);

			assert.equal(fourOfKindComb.compare(straightFlushComb), -1);
			assert.equal(straightFlushComb.compare(fourOfKindComb), 1);
		});

		it('Royal flush is higher than straight flush', () => {
			const straightFlushHand = new HandBuilder().withCardsOfClubs(2, 3, 4, 5, 6).build();
			const royalFlushHand = new HandBuilder().withCardsOfClubs('K', 'Q', 'J', 'A', 10).build();
			const straightFlushComb = new Combination(straightFlushHand);
			const royalFlushComb = new Combination(royalFlushHand);

			assert.equal(straightFlushComb.compare(royalFlushComb), -1);
			assert.equal(royalFlushComb.compare(straightFlushComb), 1);
		});

		it('Aces pair is higher than tens pair', () => {
			const tensPairHand = new HandBuilder().withDifferentSuits(10, 10, 4, 5, 6).build();
			const acesPairHand = new HandBuilder().withDifferentSuits(2, 'Q', 'J', 'A', 'A').build();
			const tensPairComb = new Combination(tensPairHand);
			const acesPairComb = new Combination(acesPairHand);

			assert.equal(tensPairComb.compare(acesPairComb), -1);
			assert.equal(acesPairComb.compare(tensPairComb), 1);
		});
		
		it('Two pairs of deuces and aces are higher than two pairs of deuces and kings', () => {
			const deucesKingsHand = new HandBuilder().withDifferentSuits(10, 2, 2, 'K', 'K').build();
			const deucesAcesHand = new HandBuilder().withDifferentSuits(10, 2, 2, 'A', 'A').build();
			const deucesKingsComb = new Combination(deucesKingsHand);
			const deucesAcesComb = new Combination(deucesAcesHand);

			assert.equal(deucesKingsComb.compare(deucesAcesComb), -1);
			assert.equal(deucesAcesComb.compare(deucesKingsComb), 1);
		});

		it('Aces three of a kind is higher than deuces three of a kind', () => {
			const deucesHand = new HandBuilder().withDifferentSuits(2, 2, 2, 6, 4).build();
			const acesHand = new HandBuilder().withDifferentSuits('A', 'A', 'A', 5, 'K').build();			
			const deucesComb = new Combination(deucesHand);
			const acesComb = new Combination(acesHand);			

			assert.equal(deucesComb.compare(acesComb), -1);
			assert.equal(acesComb.compare(deucesComb), 1);
		});

		it('Ten to ace straight is higher than deuce to six straight', () => {
			const deuceSixHand = new HandBuilder().withStraightFrom(2).build();
			const tenAceHand = new HandBuilder().withStraightFrom(10).build();
			const deucesSixComb = new Combination(deuceSixHand);
			const tenAceComb = new Combination(tenAceHand);
			
			assert.equal(deucesSixComb.compare(tenAceComb), -1);
			assert.equal(tenAceComb.compare(deucesSixComb), 1);
		});

		it('Deuce to six straight is higher than ace to five straight', () => {
			const aceFiveHand = new HandBuilder().withDifferentSuits('A', 2, 3, 4, 5).build();
			const deuceSixHand = new HandBuilder().withDifferentSuits(2, 3, 4, 5, 6).build();
			const aceFiveComb = new Combination(aceFiveHand);
			const deucesSixComb = new Combination(deuceSixHand);
			
			assert.equal(aceFiveComb.compare(deucesSixComb), -1);
			assert.equal(deucesSixComb.compare(aceFiveComb), 1);
		});

		it('Flush with ace is higher than flush with ten', () => {
			const tenFlushHand = new HandBuilder().withCardsOfClubs(3, 6, 9, 10, 4).build();
			const aceFlushHand = new HandBuilder().withCardsOfClubs(2, 5, 'J', 'K', 'A').build();
			const tenFlushComb = new Combination(tenFlushHand);
			const aceFlushComb = new Combination(aceFlushHand);
			
			assert.equal(tenFlushComb.compare(aceFlushComb), -1);
			assert.equal(aceFlushComb.compare(tenFlushComb), 1);
		});

		it('Full-house of three Tens and two Nines is higher than full-house of three Deuces and two Jacks', () => {
			const deucesJacksHand = new HandBuilder().withDifferentSuits(2, 2, 2, 'J', 'J').build();
			const tensNinesHand = new HandBuilder().withDifferentSuits(10, 10, 10, 9, 9).build();
			const deucesJacksComb = new Combination(deucesJacksHand);
			const tensNinesComb = new Combination(tensNinesHand);
			
			assert.equal(deucesJacksComb.compare(tensNinesComb), -1);
			assert.equal(tensNinesComb.compare(deucesJacksComb), 1);
		});

		it('Kings for of a kind is higher than Queens four of a kind', () => {
			const queensHand = new HandBuilder().withDifferentSuits('Q', 'Q', 'Q', 'Q', 'J').build();
			const kingsHand = new HandBuilder().withDifferentSuits('K', 'K', 'K', 'K', 9).build();
			const queensComb = new Combination(queensHand);
			const kingsComb = new Combination(kingsHand);
			
			assert.equal(queensComb.compare(kingsComb), -1);
			assert.equal(kingsComb.compare(queensComb), 1);
		});

		it('Six to Ten straight flush is higher than Deuce to Six straight flush', () => {
			const deuceSixHand = new HandBuilder().withCardsOfClubs(2, 3, 4, 5, 6).build();
			const sixTenHand = new HandBuilder().withCardsOfClubs(6, 7, 8, 9, 10).build();
			const deuceSixComb = new Combination(deuceSixHand);
			const sixTenComb = new Combination(sixTenHand);
			
			assert.equal(deuceSixComb.compare(sixTenComb), -1);
			assert.equal(sixTenComb.compare(deuceSixComb), 1);
		});
	});
	describe('Equal combinations', () => {
		it('Kicker', () => {
			const kickerHand1 = new HandBuilder().withDifferentSuits(2, 5, 9, 10).withCardsOfClubs('A').build();
			const kickerHand2 = new HandBuilder().withDifferentSuits(2, 5, 9, 10).withCardsOfSpades('A').build();
			const kickerComb1 = new Combination(kickerHand1);
			const kickerComb2 = new Combination(kickerHand2);
			
			assert.equal(kickerComb1.compare(kickerComb2), 0);
		});

		it('Pair', () => {
			const deucesPairHand1 = new HandBuilder().withDifferentSuits(2, 2, 7, 9, 10).build();
			const deucesPairHand2 = new HandBuilder().withDifferentSuits(7, 9, 2, 2, 10).build();
			const deucesPairComb1 = new Combination(deucesPairHand1);
			const deucesPairComb2 = new Combination(deucesPairHand2);
			
			assert.equal(deucesPairComb1.compare(deucesPairComb2), 0);
		});

		it('Two pairs', () => {
			const twoPairsHand1 = new HandBuilder().withDifferentSuits('A', 'A', 'K', 'K', 10).build();
			const twoPairsHand2 = new HandBuilder().withDifferentSuits('A', 'A', 'K', 'K', 10).build();
			const twoPairsComb1 = new Combination(twoPairsHand1);
			const twoPairsComb2 = new Combination(twoPairsHand2);
			
			assert.equal(twoPairsComb1.compare(twoPairsComb2), 0);
		});
	});
	
	describe('Detect higher card which plays in combination', () => {
		it('Common case', () => {
			const hand = new HandBuilder().withDifferentSuits(2, 3, 7, 9, 'A').build();
			const comb = new Combination(hand);

			assert.equal(comb.highestCard.value, Card.ACE);
		});
	});
});