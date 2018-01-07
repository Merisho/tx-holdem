const assert = require('assert');
const Card = require('../card');
const Hand = require('../hand');

describe('Draw combination', function() {
    describe('Straight draw', function() {

        describe('No chances', function() {
            it('Random cards', function() {
                testCombination([
                    new Card(0, Card.DEUCE),
                    new Card(1, Card.FIVE),
                    new Card(2, Card.SEVEN),
                    new Card(3, Card.NINE),
                    new Card(0, Card.ACE)
                ], 0);
            });

            it('Sequence of 3 cards, 2 necessary are missing', function() {
                testCombination([
                    new Card(0, Card.FOUR),
                    new Card(1, Card.FIVE),
                    new Card(2, Card.SIX),
                    new Card(3, Card.NINE),
                    new Card(0, Card.JACK)
                ], 0);
            });

            it('Seems like gutshot but it is not', function() {
                testCombination([
                    new Card(0, Card.DEUCE),
                    new Card(1, Card.THREE),
                    new Card(2, Card.SIX),
                    new Card(0, Card.ACE)
                ], 0);
            });

            it('Three cards', function() {
                testCombination([
                    new Card(0, Card.DEUCE),
                    new Card(1, Card.FOUR),
                    new Card(2, Card.FIVE)
                ], 0);
            });
        });

        describe('Two side straight draw', function() {
            it('Common two side, five or ten', function() {
                testCombination([
                    new Card(0, Card.SIX),
                    new Card(1, Card.SEVEN),
                    new Card(2, Card.EIGHT),
                    new Card(3, Card.NINE)
                ], 8);
            });

            it('Common two side, ace or nine', function() {
                testCombination([
                    new Card(0, Card.TEN),
                    new Card(1, Card.JACK),
                    new Card(2, Card.QUEEN),
                    new Card(3, Card.KING)
                ], 8);
            });

            it('Edge variant, ace or six', function() {
                testCombination([
                    new Card(0, Card.DEUCE),
                    new Card(1, Card.THREE),
                    new Card(2, Card.FOUR),
                    new Card(3, Card.FIVE)
                ], 8);
            });
        });

        describe('One side straight draw', function() {
            it('Highest straight, ten', function() {
                testCombination([
                    new Card(0, Card.DEUCE),
                    new Card(1, Card.JACK),
                    new Card(2, Card.QUEEN),
                    new Card(3, Card.KING),
                    new Card(0, Card.ACE)
                ], 4);
            });

            it('Lowest straight, five', function() {
                testCombination([
                    new Card(0, Card.DEUCE),
                    new Card(1, Card.THREE),
                    new Card(2, Card.FOUR),
                    new Card(3, Card.SIX),
                    new Card(0, Card.ACE)
                ], 4);
            });
        });

        describe('Gutshot straight draw', function() {
            it('Common gutshot, one card by left', function() {
                testCombination([
                    new Card(0, Card.TEN),
                    new Card(1, Card.KING),
                    new Card(1, Card.QUEEN),
                    new Card(2, Card.ACE)
                ], 4);
            });

            it('Common gutshot, two separate cards by left', function() {
                testCombination([
                    new Card(0, Card.SEVEN),
                    new Card(0, Card.TEN),
                    new Card(1, Card.KING),
                    new Card(1, Card.QUEEN),
                    new Card(2, Card.ACE)
                ], 4);
            });
            
            it('Common gutshot, two left two right', function() {
                testCombination([
                    new Card(0, Card.DEUCE),
                    new Card(1, Card.THREE),
                    new Card(1, Card.FIVE),
                    new Card(2, Card.SIX)
                ], 4);
            });

            it('Common gutshot, one card by right', function() {
                testCombination([
                    new Card(0, Card.SEVEN),
                    new Card(1, Card.EIGHT),
                    new Card(1, Card.NINE),
                    new Card(2, Card.JACK)
                ], 4);
            });

            it('Common gutshot, two separate cards by right', function() {
                testCombination([
                    new Card(0, Card.SEVEN),
                    new Card(1, Card.EIGHT),
                    new Card(1, Card.NINE),
                    new Card(2, Card.JACK),
                    new Card(2, Card.ACE)
                ], 4);
            });

            it('Common gutshot, one random card by right', function() {
                testCombination([
                    new Card(0, Card.SIX),
                    new Card(1, Card.EIGHT),
                    new Card(1, Card.NINE),
                    new Card(2, Card.TEN),
                    new Card(2, Card.ACE)
                ], 4);
            });

            it('Common gutshot, one random card by left', function() {
                testCombination([
                    new Card(0, Card.DEUCE),
                    new Card(1, Card.EIGHT),
                    new Card(1, Card.NINE),
                    new Card(2, Card.TEN),
                    new Card(2, Card.QUEEN)
                ], 4);
            });
        });
    });

    describe('Flush draw', function() {
        it('No chances', function() {
            testCombination([
                new Card(Card.CLUBS, Card.DEUCE),
                new Card(Card.DIAMONDS, Card.KING),
                new Card(Card.HEARTS, Card.FOUR),
                new Card(Card.SPADES, Card.TEN),
                new Card(Card.SPADES, Card.SEVEN),
            ], 0);
        });

        it('Flush draw, 5 cards', function() {
            testCombination([
                new Card(Card.CLUBS, Card.DEUCE),
                new Card(Card.CLUBS, Card.KING),
                new Card(Card.CLUBS, Card.FOUR),
                new Card(Card.CLUBS, Card.TEN),
                new Card(Card.SPADES, Card.SEVEN),
            ], 4);
        });

        it('Flush draw, 4 cards', function() {
            testCombination([
                new Card(Card.CLUBS, Card.DEUCE),
                new Card(Card.CLUBS, Card.KING),
                new Card(Card.CLUBS, Card.FOUR),
                new Card(Card.CLUBS, Card.TEN)
            ], 4);
        });
    });

    describe('Straight and flush draw', function() {
        it('Two side straight draw + flush draw', function() {
            testCombination([
                new Card(Card.CLUBS, Card.DEUCE),
                new Card(Card.SPADES, Card.THREE),
                new Card(Card.CLUBS, Card.FOUR),
                new Card(Card.CLUBS, Card.FIVE),
                new Card(Card.CLUBS, Card.SEVEN),
            ], 12);
        });

        it('One side straight draw + flush draw', function() {
            testCombination([
                new Card(Card.CLUBS, Card.DEUCE),
                new Card(Card.SPADES, Card.THREE),
                new Card(Card.CLUBS, Card.FOUR),
                new Card(Card.CLUBS, Card.SIX),
                new Card(Card.CLUBS, Card.ACE),
            ], 8);
        });

        it('Gutshot straight draw + flush draw', function() {
            testCombination([
                new Card(Card.CLUBS, Card.DEUCE),
                new Card(Card.SPADES, Card.THREE),
                new Card(Card.CLUBS, Card.FOUR),
                new Card(Card.CLUBS, Card.SIX),
                new Card(Card.CLUBS, Card.TEN),
            ], 8);
        });
    });

    describe('Full house', function() {
        it('Three of a kind in hand, hand size = 5', function() {
            testCombination([
                new Card(Card.CLUBS, Card.NINE),
                new Card(Card.SPADES, Card.NINE),
                new Card(Card.DIAMONDS, Card.NINE),
                new Card(Card.HEARTS, Card.DEUCE),
                new Card(Card.CLUBS, Card.FIVE)
            ], 6);
        });

        it('Three of a kind in hand, hand size = 4', function() {
            testCombination([
                new Card(Card.CLUBS, Card.NINE),
                new Card(Card.SPADES, Card.NINE),
                new Card(Card.DIAMONDS, Card.NINE),
                new Card(Card.HEARTS, Card.DEUCE)
            ], 3);
        });

        it('Two pairs', function() {
            testCombination([
                new Card(Card.CLUBS, Card.NINE),
                new Card(Card.SPADES, Card.NINE),
                new Card(Card.DIAMONDS, Card.DEUCE),
                new Card(Card.HEARTS, Card.DEUCE),
                new Card(Card.CLUBS, Card.FIVE)
            ], 4);
        });
    });

});

function testCombination(cards, expected) {
    var outs = (new Hand(cards)).drawCombination.outs;
    assert.equal(outs, expected);
}