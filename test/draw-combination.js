const assert = require('assert');
const Card = require('../src/card');
const Hand = require('../src/hand');
const DrawCombination = require('../src/draw-combination');
const HandBuilder = require('./dataBuilder/HandDataBuilder');

describe('Draw combination', () => {
    describe('Straight draw', () => {
        describe('No chances', () => {
            it('Random cards', () => {
                const hand = new HandBuilder().withDifferentSuits(2, 5, 7, 9, 'A').build();
                const draw = new DrawCombination(hand);
                assert.equal(draw.outs, 0);
            });

            it('Sequence of 3 cards, 2 necessary are missing for straight', () => {
                const hand = new HandBuilder().withDifferentSuits(4, 5, 6, 9, 'J').build();
                const draw = new DrawCombination(hand);
                assert.equal(draw.outs, 0);
            });

            it('Seems like gutshot but it is not', () => {
                const hand = new HandBuilder().withDifferentSuits(2, 3, 6, 'A').build();
                const draw = new DrawCombination(hand);
                assert.equal(draw.outs, 0);
            });

            it('Three cards', () => {
                const hand = new HandBuilder().withDifferentSuits(2, 4, 5).build();
                const draw = new DrawCombination(hand);
                assert.equal(draw.outs, 0);
            });
        });

        describe('Two side straight draw', () => {
            it('Common two side, five or ten is missing', () => {
                const hand = new HandBuilder().withDifferentSuits(6, 7, 8, 9).build();
                const draw = new DrawCombination(hand);
                assert.equal(draw.outs, 8);
            });

            it('Common two side, ace or nine is missing', () => {
                const hand = new HandBuilder().withDifferentSuits(10, 'J', 'Q', 'K').build();
                const draw = new DrawCombination(hand);
                assert.equal(draw.outs, 8);
            });

            it('Edge variant, ace or six is missing', () => {
                const hand = new HandBuilder().withDifferentSuits(2, 3, 4, 5).build();
                const draw = new DrawCombination(hand);
                assert.equal(draw.outs, 8);
            });
        });

        describe('One side straight draw', () => {
            it('Highest straight, ten is missing', () => {
                const hand = new HandBuilder().withDifferentSuits(2, 'J', 'Q', 'K', 'A').build();
                const draw = new DrawCombination(hand);
                assert.equal(draw.outs, 4);
            });

            it('Lowest straight, five is missing', () => {
                const hand = new HandBuilder().withDifferentSuits(2, 3, 4, 6, 'A').build();
                const draw = new DrawCombination(hand);
                assert.equal(draw.outs, 4);
            });
        });

        describe('Gutshot straight draw', () => {
            it('Common gutshot, second card (jack) in sequence is missing', () => {
                const hand = new HandBuilder().withDifferentSuits(10, 'K', 'Q', 'A').build();
                const draw = new DrawCombination(hand);
                assert.equal(draw.outs, 4);
            });

            it('Common gutshot, second card (jack) in sequence is missing in hand with 5 cards', () => {
                const hand = new HandBuilder().withDifferentSuits(7, 10, 'K', 'Q', 'A').build();
                const draw = new DrawCombination(hand);
                assert.equal(draw.outs, 4);
            });
            
            it('Common gutshot, third card (four) is missing', () => {
                const hand = new HandBuilder().withDifferentSuits(2, 3, 5, 6).build();
                const draw = new DrawCombination(hand);
                assert.equal(draw.outs, 4);
            });

            it('Common gutshot, fourth card (ten) is missing', () => {
                const hand = new HandBuilder().withDifferentSuits(7, 8, 9, 'J').build();
                const draw = new DrawCombination(hand);
                assert.equal(draw.outs, 4);
            });

            it('Common gutshot, fourth card (ten) is missing in hand with 5 cards', () => {
                const hand = new HandBuilder().withDifferentSuits(7, 8, 9, 'J', 'A').build();
                const draw = new DrawCombination(hand);
                assert.equal(draw.outs, 4);
            });

            it('Common gutshot, one random card by right', () => {
                const hand = new HandBuilder().withDifferentSuits(6, 8, 9, 10, 'A').build();
                const draw = new DrawCombination(hand);
                assert.equal(draw.outs, 4);
            });
            
            it('Common gutshot, one random card by left', () => {
                const hand = new HandBuilder().withDifferentSuits(2, 8, 9, 10, 'Q').build();
                const draw = new DrawCombination(hand);
                assert.equal(draw.outs, 4);
            });

            it('No gutshot, too big space between subsequences of cards', () => {
                const hand = new HandBuilder().withCardsOfClubs(4, 5, 6).withCardsOfSpades(10, 'J').build();
                const draw = new DrawCombination(hand);
                assert.equal(draw.outs, 0);
            });
        });
    });

    describe('Flush draw', () => {
        it('No chances', () => {
            const hand = new HandBuilder().withDifferentSuits(2, 'K', 4, 10, 7).build();
            const draw = new DrawCombination(hand);
            assert.equal(draw.outs, 0);
        });

        it('Flush draw, 5 cards', () => {
            const hand = new HandBuilder().withCardsOfClubs(2, 'K', 4, 10).withCardsOfSpades(7).build();
            const draw = new DrawCombination(hand);
            assert.equal(draw.outs, 9);
        });

        it('Flush draw, 4 cards', () => {
            const hand = new HandBuilder().withCardsOfClubs(2, 'K', 4, 10).build();
            const draw = new DrawCombination(hand);
            assert.equal(draw.outs, 9);
        });
    });

    describe('Straight and flush draw', () => {
        it('Two side straight draw + flush draw', () => {
            const hand = new HandBuilder().withCardsOfClubs(2, 4, 5, 7).withCardsOfSpades(3).build();
            const draw = new DrawCombination(hand);
            assert.equal(draw.outs, 17);
        });

        it('One side straight draw + flush draw', () => {
            const hand = new HandBuilder().withCardsOfClubs(2, 4, 6, 'A').withCardsOfSpades(3).build();
            const draw = new DrawCombination(hand);
            assert.equal(draw.outs, 13);
        });

        it('Gutshot straight draw + flush draw', () => {
            const hand = new HandBuilder().withCardsOfClubs(2, 4, 6, 10).withCardsOfSpades(3).build();
            const draw = new DrawCombination(hand);
            assert.equal(draw.outs, 13);
        });
    });

    describe('Full house', () => {
        it('Three of a kind in hand, hand size = 5', () => {
            const hand = new HandBuilder().withDifferentSuits(9, 9, 9, 2, 5).build();
            const draw = new DrawCombination(hand);
            assert.equal(draw.outs, 6);
        });
        
        it('Three of a kind in hand, hand size = 4', () => {
            const hand = new HandBuilder().withDifferentSuits(9, 9, 9, 2).build();
            const draw = new DrawCombination(hand);
            assert.equal(draw.outs, 3);
        });
        
        it('Two pairs', () => {
            const hand = new HandBuilder().withDifferentSuits(9, 9, 2, 2, 5).build();
            const draw = new DrawCombination(hand);
            assert.equal(draw.outs, 4);
        });
    });
});